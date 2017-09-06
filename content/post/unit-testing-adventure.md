+++
date = "2017-09-01T15:02:30-06:00"
title = "Unit Testing Adventure"
tags = ["development", "testing", "php", "mysql"]
+++

Unit testing is often presented as the idea of testing isolated modules of code with the intent to verify the accuracy of their behavior. Generally, the goal is to cover an entire code base so that developers can have some guarantee that their code works, even when parts of the code--especially those that have wide-ranging effects--have to be changed.

When we discuss unit testing, we'll often give an example that simplifies the concept. For instance, let's say we're running a library and we want to unit test the book management system. The unit test for `CheckOut(u User, b Book)` should cover the success case (e.g. the `b.Status` becomes `unavailable`, `b.UserID` is set to `u.ID`, and `u.CheckoutCount` is incremented) as well as failure cases and corner cases (e.g. the book is already checked out, so the status doesn't change and the user ID and checkout count should also remain unchanged).

Great, so you can implement unit tests to cover an entire project now, right? Maybe you can, but in a recent project that has been kicking around without unit tests for far too long, I found it was a little trickier than many unit testing strategies suggest. The following is an account of the process we developed to solve our particular problems.

# Where did we start?

The client for this project is an auction house, but we'll leave it at that. The stack, as of the time I was invited to join the project, was nginx, MySQL, and PHP. The application at this point had about 100,000 users, 1,000,000 auctions, and tens of millions of bids. There are a few problems:

1. There are no tests!
1. The database has grown to several GB. Whereas we used to be able to download a production backup for local development use, that has become untenable.
1. We have zero tests.
1. We are on version 2.X of the platform. Version 1 was a nightmare, which made refactoring everything in version 2 a nightmare because, repeat after me,
1. There. Are. Zero. Tests.

Given our problems, we started the only way we knew how.

# First attempt

[PHPUnit](https://phpunit.de/) is a perfectly capable unit testing framework, ideal for our situation. I started with "Getting started" documentation and had the framework bootstrapped in no time at all. Thinking the rest of the process would be long, but simple, I began to write tests. However, each new function felt like a tug on a fishing line, quickly realizing I might be trying to reel in a whale instead of a trout.

It would be simple to test our more recent, [functionally-minded](https://en.wikipedia.org/wiki/Functional_programming) functions because their signatures were intelligible, their inputs were well-defined, and the outputs were all explicit. However, a lot of code--a lot of *important* code--would not be so easy. For instance, it's a tricky problem when you can't count on your objects to have had their fields properly set (see rant below).

<div style="background: rgba(0,0,0,0.05); border-radius: 2px; padding: 20px 26px; color: #555555; font-weight: 300; margin-bottom: 1em;">
Please pardon a (not-so-)quick design rant:  we sometimes pass entire objects of specific classes, rather than their unique IDs, to services on the basis that it gives us some sort of type safety; better to have an <code>Auction</code> than a mere <code>unsigned integer</code>. Unfortunately, we cannot guarantee that all such objects will have had all their fields set because sometimes, for the sake of performance, we only retrieve certain fields and not others. This process produces objects that lie when they don't have the answer, giving a default value instead of the intended value. (e.g. if <code>$auction->title</code> is not set for some performance reason, it will tell you its title is <code>""</code>.) Are we then left to check if each field we need has been set or not? And if the value is <i>actually</i> <code>null</code> or the default, how could we know the difference?  Furthermore, where did that object come from? Certainly, it must have come from a retrieve-by-ID operation at some point, so <b>what are we even solving here</b>? End rant.
</div>

Can unit testing protect us against unset fields? Not if we're mocking all of the data on-the-spot. Here's a simplified example:

```
public function testPlaceBid() {
    $auction = new Auction();
    $auction->setStartingBid(10.0);
    
    $user = new User();
    
    $bid = new Bid();
    $bid->setAuctionId($auction->getId());
    $bid->setUserId($user->getId());
    $bid->setAmount(12.0);
    
    $response = $bid_service->placeBid($bid);
    
    $this->assertEquals($response->message, "success");
}
```

At a glance, this should work. But what if the problem (and these problems had occurred for us) is that, for instance, starting bid was not being set on the auction? (That is, the field is properly set in the database, but the service that retrieved the `$auction` object did not care to hydrate that field, thinking it a waste of resources.) Besides that issue, `$bid_service` doesn't report back success or failure until the database has responded to the `Bid` record being saved. Furthermore, the `$user` and `$auction` don't even have IDs because those get assigned when they're saved to the database, so the `INSERT` is going to fail on foreign key constraints!

With that, my hopes of "some quick unit tests without a database" were shattered. But good riddance to such a pathetic idea, anyways!

# Database Blues

Ok, then we'll use a testing database. I always knew it'd come to this, anyways, so let's get right into it, I thought. From the start, I knew we couldn't use a production backup for testing for several reasons:  first, it just takes too long to refresh, even if you have a backup handy; second, and more importantly, we can't assert against changing data. We needed data that was as sure as our in-function mock, but in a test-dedicated database.

I'm embarrassed to share this next part because of how insane it now sounds. I started writing raw SQL, thinking, "I'll just spin up some tables and records". At a glance, that sounded equivalent to our mocking in PHP, but how wrong I was. After all, one of our problems that led us here was foreign key constraints. Well, if you want to mock an Auction, you're gonna need a Product. And if you wanna mock a Product, you're gonna need a Consignor. And if you wanna mock a Consignor, you're gonna throw yourself off the nearest bridge because you haven't even written a single test yet. I deleted the SQL file. Luckily, the next idea stuck.

# Are you mocking me?

If only there was some service that could do all of this work for me, I thought. So I wrote a service, called `MockService`, to do just that.

The idea was this: we have approximately 50 tables in our database. Between 10 and 20 of them, I copied straight over into the test database. These were small tables with relatively stable data, like statuses and categories. The other 30 or 40 tables will require mocking. However, many of these tables are graphically related, as in you wouldn't make an instance of one without a relationship with an instance of another. That means that a great many `INSERT` statements can be rolled into far fewer functions on this service.

The epiphany was so simple it's stupid: this is all our app is doing. But rather than repurpose app code, it was faster to create functions that mock app code. For instance, two simplified functions would look like:

```
public function newAuction(Auction $a = null)
{
    // If no auction is given, create one from defaults
    if (is_null($a)) {
        $a = new Auction();
    }
    
    // Set values on null fields
    if (is_null($a->getStartPrice())) {
        $a->setStartPrice(10.0);
    }
    // ... for all values
    
    // Set foreign key fields
    if (is_null($a->getProductId())) {
        $p = $this->newProduct();
        $a->setProductId($p->getId());
    }
    // ... for all relationships
    
    // Save the record and return it
    $a = $auction_service->save($a);
    return $a;
}

public function newUser(User $u = null, array $role_codes)
{
    // If no user is given, create one from defaults
    if (is_null($u)) {
        $u = new User();
    }
    
    // Set values on null fields
    if (is_null($a->getName())) {
        $a->setName("John Doe");
    }
    // ... for all values
    
    // Create roles
    foreach ($role_codes as $rc) {
        $role = new Role($rc);
        $user_role = $user_service->addRole($role);
    }
    
    // Save the record and return it
    $u = $user_service->save($u);
    return $u;
}
```

The power of being able to call `newProduct()`, for instance, should be evident. Auctions aren't the only records that require Products, so we encapsulate that ability in a function. We also save time with shortcuts like the `$role_codes`, where we can give a shorthand for a greater structure that the function automates.

So, I am wondering at this point, can we finally write 

# Anatomy of a test

At the time of this writing, a simplified example of our test might look like this:

```
public function testPlaceBid() {
    $auction = $new Auction();
    $auction->setStartingBid(10.0);
    $auction = $mock_service->newAuction($auction);
    $auction = $auction_service->getById($auction->getId());
    
    $user = $mock_service->newUser(null, ['user', 'bidder']);
    $user = $user_service->getById($user->getId());
    
    $bid = new Bid();
    $bid->setAuctionId($auction->getId());
    $bid->setUserId($user->getId());
    $bid->setAmount(12.0);
    
    $response = $bid_service->placeBid($bid);
    
    $this->assertEquals($response->message, "success");
}
```

It's barely more code to write than we had long ago, when I was young and naive. However, this code is solving a couple of problems: the `$auction` and `$user` have been inserted into the database and have IDs; we're taking it a step further, calling the service functions that retrieve them in the app code, in order to test that those services are setting all necessary fields; the language we're expressing our tests in is just as obvious as non-DB mocking would be, so we aren't sacrificing simplicity. As a bonus, we can call these mock functions ad nausuem (and with a randomized pattern) to create arbitrarily dense or sparse test databases with any quantifiable distribution of data; for example, twice as many active auctions as finished auctions, or vice-a-versa.

# Where are we now? (Or where were we then?)

The clock hasn't stopped since I posted this, so I'm sure we're running into a slew of new issues. (Maybe you, dear reader, have even predicted them at this point!) But here's where we ended up:

1. There are tests!
2. We can mock a data layer for testing, which reduces our time and increases our customizability and, ultimately, testability.
3. We have many tests that tell us if we've made a mistake.
4. Version 2.X has a more-or-less well-defined standard for behavior, which will allow the future developers of versions 3+ to sleep at night because, say it with me,
5. We. Have. Tests.

Once again, I don't believe we've solved all of our issues. Rather, we've solved a small set of issues and have finally implemented a test suite, both for our own sanity, and for posterity's sake.
