+++
date = "2016-09-16T18:18:32-06:00"
title = "Domain Name System"
tags = ["DNS", "networking", "domains"]
+++

If you're going to publish a website about learning, you're going to need to learn how to publish a website, right?  There is no better place to start than DNS.

## Prelude

Before we get started, why would we want to learn about DNS in the first place?  Let's say you have a project; or rather, let's say I have a project called **TIL**.  Here is what I have right now:

- an idea
- a domain (nikovacevic.io), purchased from [hover](https://www.hover.com)
- the skeleton of what I'd like to publish, built locally on my computer
- a [Digital Ocean](https://www.digitalocean.com) droplet with an [I.P. address](https://en.wikipedia.org/wiki/IP_address)

When I talk about "publishing" my content, I mean I want to make it available for the public to access.  My I.P. address currently allows me to privately access the droplet, e.g. via SSH; however, when you visit [nikovacevic.io](https://nikovacevic.io), you will still see hover's stock webpage.  "nikovacevic.io is a totally awesome idea still being worked on."  Indeed.

![hover thinks my idea is totally awesome][2016-09-16-dns-1]

So, how do we make the domain name, "nikovacevic.io", provide public access to a heretofore private, I.P.-accessible-only droplet?

## DNS basics

The **Domain Name System** we're discussing is a directory.  Remember when we memorized phone numbers in order to call people?  (Maybe not.)  Today, our phones' contact lists (and print phone directories before that) associate names with phone numbers, so we don't have to remember all those numbers.  DNS is the system that does that, but for web servers and their I.P. addresses.  Officially, we can refer to this process as a mapping between two namespaces:  the domain name hierarchy and the Internet Protocol address spaces<sup>[2]</sup>.

That's great!  But how?

### Responses

Servers, aptly called **name servers**, do most of the work getting us from a name to a server.  Name servers may respond to queries by delegating to other name servers, or by returning answers.  Answers lie in **zone files**, which encode the actual mapping between name and number in individual records, as well as redirect information in the case that the given server and zone files do not have the answer to a query<sup>[1]</sup>.  At the top of this big hierarchy of name servers are **root servers**, which manage information about servers that manage [top-level domains](https://en.wikipedia.org/wiki/Top-level_domain) and can redirect queries to appropriate servers.

So far we have a very basic understanding of DNS responses, but what about requests?  Who makes a DNS request, and how does that work?

### Requests

We'll call the requester the **client**, which can be an application accessing an API (e.g. GET api.example.com/users?id=123) or simply a person browsing the Internet (e.g. www.google.com).  Most clients cache the responses to their requests, so the first place a client will look for their DNS answer is local.  If the answer is not cached, then a request is sent to a **resolver**. Most resolvers simply communicate the query to a **recursive DNS server**, which queries other DNS servers until it gets a response or an error.

At first glance, this seems really complex for a simple directory, right?  But this is the Internet.  The *entire Internet*.  Counter-intuitively, this redundancy and perceived complexity is where DNS derives its resiliency; that is, at each point in the web of queries being passed around, there is a good chance that the answer is cached.  For example, your local machine can probably resolve the majority of your queries instantly.  Even if you're accessing a domain for the first time, one of the servers along the way probably is not.  Therein lies the power:  rather than creating a bottleneck at a single omniscient location, DNS distributes its knowledge over a global surface congruent with the global network it describes.

## Configuring DNS for a domain

Now that we can appreciate the scope and magnificence of DNS, it's time to learn the nuts and bolts of actually configuring a domain name and a server (or droplet, in my case).  I'm sure there are a million ways to configure such things, but I only learned this today, so I'll show you just one.

### WHOIS?

Who is?  Who am I?  One of many existential questions you may ask your terminal.  This is one it can actually answer.

```
$ whois nikovacevic.io

Domain : nikovacevic.io
Status : Live
Expiry : 2017-02-23

NS 1   : ns1.hover.com
NS 2   : ns2.hover.com
```

NS1 and NS2 refer to the aforementioned name servers.  So, all we need to do is change those name servers!  In my case, I need to log in to hover (my **domain registrar**) and change my name servers to point at Digital Ocean (my hosting provider).

![name servers before][2016-09-16-dns-2]
![name servers after][2016-09-16-dns-3]

### Record an "A record"

Now that the name servers are pointing at Digital Ocean, we need Digital Ocean to be able to handle those requests.  We're just using IPv4, so we'll need to create an **A record**. I've also created one for the subdomain [til.nikovacevic.io](https://til.nikovacevic.io), because that's where I want TIL to live.  The @ record refers to the entire domain, [nikovacevic.io](https://nikovacevic.io), rather than the subdomain "til".

![A record][2016-09-16-dns-4]

### Ping that domain!

Return to your trusty terminal to see if it works:

```
$ ping nikovacevic.io

PING nikovacevic.io (104.131.36.182): 56 data bytes
64 bytes from 104.131.36.182: icmp_seq=0 ttl=55 time=77.730 ms
64 bytes from 104.131.36.182: icmp_seq=1 ttl=55 time=64.150 ms
64 bytes from 104.131.36.182: icmp_seq=2 ttl=55 time=70.060 ms
64 bytes from 104.131.36.182: icmp_seq=3 ttl=55 time=67.979 ms
64 bytes from 104.131.36.182: icmp_seq=4 ttl=55 time=65.746 ms
```

As you can see, DNS has worked its magic and created an association in it's world-wide, distributed directory between nikovacevic.io and my droplet I.P. address (104.131.36.182).  The Internet is amazing, isn't it?

## You might be wondering

### Is there only one DNS?
In the sense that there is only one Internet, as we commonly refer to it (dark webs, private networks, etc. notwithstanding), there is only one DNS.  DNS does not necessarily have any bearing on non-Internet networks, though.

### Who invented DNS, and who maintains it?
Early predecessor directory systems have been around since the time of [ARPANET](https://en.wikipedia.org/wiki/ARPANET).  Basically, an entity called ICANN governs it, delegating authority to the maintainers of the DNS root servers.  From Wikipedia, regarding ICANN's responsibilities:

> The right to use a domain name is delegated by domain name registrars which are accredited by the Internet Corporation for Assigned Names and Numbers (ICANN) or other organizations such as OpenNIC, that are charged with overseeing the name and number systems of the Internet. In addition to ICANN, each top-level domain (TLD) is maintained and serviced technically by an administrative organization, operating a registry.<sup>[3]</sup>

## Credit, Reference, and Related Reading

1. [Digital Ocean: An Introduction to Managing DNS](https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts) is a great, deep-diving technical guide. I learned most from this series.

2. [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System) from Wikipedia

3. [ICANN](https://en.wikipedia.org/wiki/ICANN) and [IANA](https://en.wikipedia.org/wiki/Internet_Assigned_Numbers_Authority) are very interesting global organizations responsible for developing and maintaining DNS.

## P.S.
As if by divine intervention, while writing this, HUGO experienced a DNS issue!  Maybe we can help with that.

![HUGO DNS fail][2016-09-16-dns-5]

[2016-09-16-dns-1]: /images/2016-09-16-dns-1.png
[2016-09-16-dns-2]: /images/2016-09-16-dns-2.png
[2016-09-16-dns-3]: /images/2016-09-16-dns-3.png
[2016-09-16-dns-4]: /images/2016-09-16-dns-4.png
[2016-09-16-dns-5]: /images/2016-09-16-dns-5.png
