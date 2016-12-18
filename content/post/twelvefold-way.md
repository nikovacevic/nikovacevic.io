+++
date = "2016-12-17T09:35:06-07:00"
title = "Twelvefold Way"
tags = ["combinatorics", "mathematics", ]
+++

We've all been there:  you have a pile of balls and a stack of labels and you think, "How could I possibly label all of these balls?"

![How could I label all of these balls?][2016-11-27-tw-01]

Right. Of course you haven't. But perhaps you are a computer scientist who needs a firm grasp of combinatorics in order to analyze time and space complexity of algorithms. Or perhaps you're just curious.

Anyways, we'll resist esoteric mathematical definitions until the end.  For now, we have balls and labels to deal with.

## Labels and Balls

Let's call the set of all balls **B** and the set of all labels **L**. We're concerned with determining how to apply labels, elements in the set **L**, to balls, elements in the set **B**, given some imposed rules.  For example, what if all balls must have at least one label?  Can a ball be be labeled more than once?  Does the order in which we label a ball matter to us?

![Balls and labels and sets][2016-11-27-tw-02]

So far we're just counting, which sounds simple enough.  However, when rules are applied, counting can become complex. Thanks to [Richard Stanley and his predecessors](https://en.wikipedia.org/wiki/Richard_P._Stanley), we have the [twelvefold way](https://en.wikipedia.org/wiki/Twelvefold_way) to guide us.

Before we explore that complexity, allow me one formality that will be key to our understanding: the conceptualization of applying labels to balls as a [Mathematical function](https://en.wikipedia.org/wiki/Function_(mathematics)).  Specifically, think of the application of a label to a ball as a function that maps a set of balls (**B**) to a set of labels (**L**), written as **f: B &rarr; L**. The inverse of **f**, denoted **f<sup>-1</sup>**, reverses the mapping, such that **f<sup>-1</sup>: L &rarr; B**.

- If **f(1) = 2**, then **f** maps **ball 1** to **label 2**.

- If **f(2) = {&empty;}** , then **f** does not map **ball 2** to any labels.

- If **f<sup>-1</sup>(2) = 3** , then **f** maps **ball 3** to **label 2**.

For our purposes, a function takes a single value and returns a single value.  This is imperative.  As a result, in terms of balls and labels, a ball can only be labeled once, but a label can be applied to an indefinite number of balls.

*You might have just made a realization regarding invertibility:  if a function maps two or more balls to the same label, then the function is not invertible because one parameter (the label) of the inverted function maps to multiple values (the balls).*

![Function of Balls to Labels][2016-12-17-tw-03]

From here, we can consider the set, **F**, of *all functions* mapping **B** to **L**, which represents all possible mappings, or ways to label the balls. Instead of considering all functions, we can also restrict **F** with rules.

- If we restrict **F** to only functions that map all balls to at least one label, that eliminates all functions that leave out one or more of the balls in the set **B**.

Formally defining sets gives us the ability to make substantiated claims about abstractions, which claims will inform our ability to count!

Exciting stuff, right? Now, regarding the Twelvefold Way.

## Why twelve?

Good question.  The twelvefold way describes the twelve combinations of rules we can apply to ball labelling, composed of **four ways to describe equivalence** and **three rules for labelling**. There are twelve ways to choose one from each of these two sets of rules, so *voila*!

## Equivalence:  Order matters

How can equivalence vary?  Consider sets of integers, **A** and **B**, such that **A = {1, 2, 3}** and **B = {1, 3, 2}**.  Are they the same set?  It depends on what you mean by "the same", which is the loose definition of an [equivalence relation](https://en.wikipedia.org/wiki/Equivalence_relation).

Recall the idea of labelling balls as a function, **f: B &rarr; L**.  Specifically, let's use the sets **B = {1, 2}** and **L = {A, B, C}**. Consider the following set of six functions:

**f<sub>1</sub>: (1, 2) &rarr; (A, A)**

**f<sub>2</sub>: (1, 2) &rarr; (B, B)**

**f<sub>3</sub>: (1, 2) &rarr; (A, B)**

**f<sub>4</sub>: (1, 2) &rarr; (B, A)**

**f<sub>5</sub>: (1, 2) &rarr; (B, C)**

**f<sub>6</sub>: (1, 2) &rarr; (C, B)**

By our most common definition, each function represents a distinct outcome. That is, the [**codomains**]({{< relref "#codomain" >}}) of these functions are [**distinguishable**]({{< relref "#distinguishable" >}}).  There are, however, four different ways to approach the concept of distinguishability:

1. Count the lists as **distinct** possibilities. This, again, is likely the most intuitive option. In the given example, out enumeration results in six distinct functions. We'll symbolically refer to this as **f**.

2. Count the lists as **distinct up to a permutation of balls**. If the only thing distinguishing multiple outcomes is the order of the inputs (and thus the outputs), then only count those outcomes once.  In this paradigm we can convince ourselves that (A, B) and (B, A) are only different because of the order in which the inputs arrive (a permutation of balls).  Pragmatically, this means that we will **sort the output, then ignore duplicate results while counting**.  In the given example, f<sub>3</sub> = f<sub>4</sub> and f<sub>5</sub> = f<sub>6</sub>, leaving only four distinct functions.  Representing this pre-processing step, we will refer to this as **f&#8728;S<sub>B</sub>**.

3. Count the lists as **distinct up to a permutation of labels**. Pretend that you don't already have an order of labels in mind before they come out of the function; rather, count them as they appear:
  -  **(A, B)** is **(1, 2)** because you saw **A** first, then **B** second;  
  -  **(B, A)** is **(1, 2)** because you saw **B** first, then **A** second;  
  -  **(A, A)** is **(1, 1)** because you saw **A** first;  
  -  **(B, B)** is **(1, 1)** because you saw **B** first;  
Whereas (2) counts equivalence with a pre-ordering, this concept counts equivalence with a post-ordering. In the given example, f<sub>1</sub> = f<sub>2</sub> and f<sub>3</sub> = f<sub>4</sub> = f<sub>5</sub> = f<sub>6</sub>, leaving only two distinct functions.  To represent the post-processing, we can call this option **S<sub>L</sub>&#8728;f**.

4. Count the lists as **distinct up to a permutation of balls and labels**. This essentially amounts to pre- and post-ordering, then counting the results. For instance, (A, B) and (B, A) would both get pre-ordered into (A, B), which would be post-ordered into (1, 2). In the given example, f<sub>1</sub> = f<sub>2</sub> and f<sub>3</sub> = f<sub>4</sub> = f<sub>5</sub> = f<sub>6</sub>, leaving two distinct functions. Intuitively, we refer to this symbolically as **S<sub>L</sub>&#8728;f&#8728;S<sub>B</sub>**.

Depending on the equivalence rules we choose, the results of our counting can change drastically.

## Labeling: Injective, Surjective, or Neither

Richard Stanley comes home to his kids, One, Two, and Three, with four balls. Like any good father, he has three labels---one for each of his children. He considers three different rules by which he could label them:

1. No rules! Don't label any of the balls. Label each ball with each label. It doesn't matter!

2. One-to-one (**injective**), in which each label is used at most once.  It is as if he only has one of each label.  Nobody gets more than one ball, but there is no guarantee of getting a ball.  

3. Onto (**surjective**), in which each label gets used on at least one ball, but some might be used on more than one ball.  He's got stacks of labels, which is fortunate because each child demands a ball. They might even get more than one, each!

There is also a name for both **injective** and **surjective**: **bijective**, in which each ball gets at exactly one label.  (We don't count it as a unique option in the twelvefold ways because, being a combination of two options, it does not add any further "ways".)  Everyone is guaranteed to get a ball that they don't have to share!

![Injective, Surjective, Bijective][2016-12-17-tw-03]

You might notice that, if **|L| > |B|**, then bijectivity is impossible, courtesy of the [Pidgeonhole Principle](https://en.wikipedia.org/wiki/Pigeonhole_principle).  That is, when each ball has exactly one label (**injective**), there exists at least one label without a ball (not **surjective**). However, labeling a ball with one of the remaining labels will violate injectivity.

## Great! Can we finally see the twelve options?

Yes!

Distinguishable?                             |**Any**                   |**Injective**             |**Surjective**
---------------------------------------------|--------------------------|--------------------------|--------------------------
**f**                                        |[01]({{< relref "#01" >}})|[02]({{< relref "#02" >}})|[03]({{< relref "#03" >}})
**f&#8728;S<sub>B</sub>**                    |[04]({{< relref "#04" >}})|[05]({{< relref "#05" >}})|[06]({{< relref "#06" >}})
**S<sub>L</sub>&#8728;f**                    |[07]({{< relref "#07" >}})|[08]({{< relref "#08" >}})|[09]({{< relref "#09" >}})
**S<sub>L</sub>&#8728;f&#8728;S<sub>B</sub>**|[10]({{< relref "#10" >}})|[11]({{< relref "#11" >}})|[12]({{< relref "#12" >}})

Our analysis of each case will cover a few things:  intuition about the requirements, cardinality of **B** and **L** (e.g. can we have any number of balls and labels, or do we require more of one than the other?), a formula for counting, and an example.

<a name="01">
# 01 Any f
</a>

Each label can be placed on any ball with no rules. Because order matters, outputs {a, b, c} and {c, b, a} are distinguishable, so they count separately.  Consider labeling each ball, of which there are **B**, with any of the labels, of which there are **L**. You never run out of any one kind of label, and you don't have to use each label if you don't want to.

## Formula
**L<sup>B</sup> = L * L * ... * L**, where there are **B** terms

## Cardinality
Sets of any size will do!

## Example
Given **B = {1, 2, 3}** and **L = {a, b}**, all possibilities of **f: B &rarr; L** are:  

**{a, a, a}, {a, a, b}, {a, b, a}, {a, b, b},  
{b, a, a}, {b, a, b}, {b, b, a}, {b, b, b}**

For each label, of which there are **L = 3**, there are **B = 2** balls:  
**2<sup>3</sup> = 8**

<a name="02">
# 02 Injective f
</a>

Order matters, so {a, b, c} and {c, b, a} are distinguishable and count separately. Once a label has been used, we cannot use it again. Consider labeling each ball, of which there are **B**, with any of the labels, of which we start with **L**. For the first label, we have **L** labels to choose from, but for the second we only have **L-1** options. With each label placed, the options reduce by one until all balls have been labeled, all labels have been used, or we simply decide to stop.

## Formula
**B<sup><u>L</u></sup> = B * (B-1) * ... * (B-(L-1))**, which is commonly called a [falling factorial]({{< relref "#falling-factorial" >}}).

## Cardinality
Sets of any size will do!

## Example
Given **L = {i, j}** and **B = {a, b, c, d}**, all possibilities of **f: L &rarr; B** are:  

**{a, b}, {a, c}, {a, d}, {b, a}, {b, c}, {b, d},  
{c, a}, {c, b}, {c, d}, {d, a}, {d, b}, {d, c}**

**4<sup><u>2</u></sup> = 4 * 3 = 12**

<a name="03">
# 03 Surjective f
</a>

<a name="04">
# 04 Any f&#8728;S<sub>B</sub>
</a>

<a name="05">
# 05 Injective f&#8728;S<sub>B</sub>
</a>

<a name="06">
# 06 Surjective f&#8728;S<sub>B</sub>
</a>

<a name="07">
# 07 Any S<sub>L</sub>&#8728;f
</a>

<a name="08">
# 08 Injective S<sub>L</sub>&#8728;f
</a>

<a name="09">
# 09 Surjective S<sub>L</sub>&#8728;f
</a>

<a name="10">
# 10 Any S<sub>L</sub>&#8728;f&#8728;S<sub>B</sub>
</a>

<a name="11">
# 11 Injective S<sub>L</sub>&#8728;f&#8728;S<sub>B</sub>
</a>

<a name="12">
# 12 Surjective S<sub>L</sub>&#8728;f&#8728;S<sub>B</sub>
</a>

# Summary

Given **f: B &rarr; L**, how many possible outcomes exist?

*Does order matter?*    |**No rules!**    |**Injective**           |**Surjective**
------------------------|-----------------|------------------------|--------------
**Yes**                 |**L<sup>B</sup>**|**L<sup><u>B</u></sup>**|--
**Labels only**         |--               |--                      |--
**Balls only**          |--               |--                      |--            
**No**                  |--               |--                      |--

# Definitions

<a name="function">
### function
</a>
A function maps elements from one set to another set. A function, **f**, described by **f : A&rarr;B** is usually said to map the set **A** to the set **B**.

<a name="domain">
### domain
</a>
A function's domain is the set from which it maps. Given **f : A&rarr;B**, the domain is the set **A**.

<a name="distinguishable">
### codomain
</a>
similar to **range**  
A function's codomain is the set to which it maps. Given **f : A&rarr;B**, the codomain is the set **B**.

<a name="cardinality">
### cardinality
</a>
Cardinality is the number of elements in the set, often denoted **|S|** for set **S**.  **|X| = m** and **|Y| = n**.  Consider assigning one [cardinal number](https://en.wikipedia.org/wiki/Cardinal_number) to each element.  


Consider sets **X = {x<sub>1</sub>, ..., x<sub>m</sub>}** and **Y = {y<sub>1</sub>, ..., y<sub>n</sub>}**. Now, consider a set of functions, **F**, where each **f** in **F** maps **X** to **Y** (**&forall; f &isin; F, f : X &rarr; Y**). Without any given restrictions (injective, surjective, distinguishable, indistinguishable), we can assume these functions can send any **x<sub>i</sub>** to any **y<sub>j</sub>** in any way. What types of restrictions can we apply?

<a name="injective">
### injective
</a>
or **one-to-one**  
An injective function maps each element of its domain uniquely to at most one element of its codomain. Some elements may not map to the codomain. No element in the codomain maps back to two elements in the domain.

<a name="surjective">
### surjective
</a>
or **onto**  
A surjective function maps to all elements in its codomain. Unlike injective functions, surjective functions can map elements in the domain to multiple elements in the codomain.

<a name="bijective">
### bijective
</a>
A bijective function is both injective and surjective. Each element in the function's domain maps to exactly one element in the codomain.


Consider sets **A = {1, 2, 3}**, **B = {3, 1, 2}**, and **C = {3, 1, 2}**. **A**, **B**, and **C** contain the same three elements. Additionally, **B** and **C** order those elements the same.  We can define equivalence relations on **A** and **B** that determine whether or not they are equal.

<a name="distinguishable">
### distinguishable
</a>
or **equal**, **strictly equal**  
Strict equality requires two sets to have the same elements in the same order. As such, **A** &ne; **B** = **C**. This relation is referred to as distinguishable because **A** is distinguishable from **B** and **C**.
We can define distinguishability per direction, as well.  That is, mapping **X** to **Y**, we can require equality up to a permutation of Y only.  In that paradigm, **f : A &rarr; B** is equal, but **f<sup>-1</sup> : B &rarr; A** is not.

<a name="indistinguishable">
### indistinguishable
</a>
or **equal up to a permutation**  
An equivalence relation can be called indistinguishable if order does not matter for either set. As such, **A** = **B** = **C**. This relation is referred to as indistinguishable because **A**, **B**, and **C** are indistinguishable from each other.

<a name="permutation">
### permutation
</a>

<a name="combination">
### combination
</a>

<a name="partition">
### partition
</a>

<a name="factorial">
### factorial
</a>

<a name="falling-factorial">
### falling factorial
</a>

# Credit, Reference, and Related Reading

https://en.wikipedia.org/wiki/Richard_P._Stanley

https://en.wikipedia.org/wiki/Cardinality

https://en.wikipedia.org/wiki/Cardinal_number

https://en.wikipedia.org/wiki/Injective_function

https://en.wikipedia.org/wiki/Surjective_function

https://en.wikipedia.org/wiki/Domain_of_a_function

https://en.wikipedia.org/wiki/Codomain

https://en.wikipedia.org/wiki/Equivalence_relation

http://www.math.cmu.edu/~mlavrov/arml/14-15/combinatorics-09-28-14.pdf

http://www-math.mit.edu/~rstan/ec/

https://en.wikipedia.org/wiki/Falling_and_rising_factorials

https://en.wikipedia.org/wiki/Pigeonhole_principle


[2016-11-27-tw-01]: /images/2016-11-27-tw-01.jpg
[2016-11-27-tw-02]: /images/2016-11-27-tw-02.jpg
[2016-12-17-tw-03]: /images/2016-12-17-tw-03.jpg
[2016-12-17-tw-03]: /images/2016-12-17-tw-03.jpg
