+++
date = "2016-11-27T09:35:06-07:00"
title = "Twelvefold Way"
tags = ["combinatorics", "mathematics", ]
+++

We've all been there:  you have a pile of balls and a stack of labels and you think, "How could I possibly label all of these balls?"

![How could I label all of these balls?][2016-11-27-tw-01]

Right. Of course you haven't. But perhaps you are a computer scientist who needs a firm grasp of combinatorics in order to analyze time and space complexity of algorithms. Or perhaps you're just curious.

Anyways, we'll resist esoteric mathematical definitions until the end.  For now, we have balls and labels to deal with.

## Labels and Balls

Let's call the set of all balls **B** and the set of all labels **L**. We're concerned with determining how to apply the labels, element in the set **L**, to the balls, the elements of the set **B**, given some imposed rules.  For example, what if all balls must have at least one label?  Can a ball be be labeled more than once?  Does the order in which we label a ball matter to us?

![Balls and labels and sets][2016-11-27-tw-02]

You've noticed that we're only counting, which sounds simple enough.  However, when rules are applied, counting can become complex. Thanks to [Richard Stanley and his predecessors](https://en.wikipedia.org/wiki/Richard_P._Stanley), who must have had an extensive ball and label collection, we have the [twelvefold way](https://en.wikipedia.org/wiki/Twelvefold_way) to guide us.

Before we explore the complexity that arises, you'll have to forgive me for one formal transgression: the formulation of this task as a function.  Think of the application of a label to a ball as a [function](https://en.wikipedia.org/wiki/Function_(mathematics)), which maps a set of labels (**L**) to a set of balls (**B**).

This function might be written **f: L &rarr; B**. The inverse of **f**, **f<sup>-1</sup>**, reverses the mapping, such that **f<sup>-1</sup>: B &rarr; L**.

For example:

- If **f(1) = {1, 2}**, then **f** maps label 1 to balls 1 and 2.  

- If **f(1, 2) = {1}**, then **f** maps labels 1 and 2 to ball 1.  

- If **f(1) = {&empty;}** , then **f** does not map label 1 to any balls.  

- If **f<sup>-1</sup>(2) = {&empty;}** , then **f** does not map any labels to ball 2.  

Now, regarding the Twelvefold Way.

## Why twelve?

Good question.  The twelvefold way describes the twelve combinations of rules we can apply to ball labelling, composed of **four ways to describe equivalence** and **three rules for labelling**. There are twelve ways to choose one from each of these two sets of rules, so *voila*!

How can equivalence vary?  Consider sets **A** and **B** such that **A = {1, 2, 3}** and **B = {1, 3, 2}**.  Are they the same?  It depends on what you mean by "the same", which is the loose definition of an [equivalence relation](https://en.wikipedia.org/wiki/Equivalence_relation).

## Order matters

Recall the idea of labelling balls as a function, **f: L &rarr; B**.  Consider, then, the following functions:

- **f<sub>1</sub>: L1 &rarr; B1; L2 &rarr; B1; L1 &rarr; B2**

- **f<sub>2</sub>: L2 &rarr; B1; L1 &rarr; B1; L1 &rarr; B2**

- **f<sub>3</sub>: L1 &rarr; B2; L1 &rarr; B1; L2 &rarr; B1**

![Order matters!][2016-11-27-tw-05]

Think about these three functions as employees at Richard's Ball Store.  Each employee either ordered the balls differently on the shelf or ordered the labels differently on one of the balls.  Does that matter?

To find out, consider the four options regarding order:

1. Ignore both the order of the labels and the order of the balls.  
**f<sub>1</sub> = f<sub>2</sub> = f<sub>3</sub>**  
*Richard doesn't care. The shelves have the same balls, which have the same labels, respectively.*

2. The order of the balls matters, but ignore the order of the labels.  
**f<sub>1</sub> = f<sub>2</sub> &ne; f<sub>3</sub>**  
*Richard is mad at employee 3. True, the shelves still have the same balls, which have the same labels, respectively. Unfortunately, the first ball on the shelf was a store giveaway and B2 is twice as expensive as B1. Ouch!*

3. The order of the labels matters, but ignore the order of the balls.  
**f<sub>1</sub> &ne; f<sub>2</sub> = f<sub>3</sub>**  
*Richard is mad at employee 1. True, the shelves still have the same balls, which have the same labels, respectively. Unfortunately, label 1 was "50% off" and label 2 was "$10 off". Because employee 1 got the order wrong, Richard lost $5.*

4. The order of both the labels and the balls matters.  
**f<sub>1</sub> &ne; f<sub>2</sub> &ne; f<sub>3</sub>**  
*Richard is mad at everyone because he gave away the expensive ball for free and lost $5 on the cheaper one. Bad day for Richard.*

Now, what about the three rules for labeling?

## Injective and/or Surjective

Richard goes home to his kids, One, Two, and Three. He has three labels (one for each of his children) with which to label the three balls. He considers three different ways he could label them:

1. One-to-one (**injective**), in which each ball is labelled at most once.  Nobody who gets a ball has to share, but there is no guarantee of getting a ball.

2. Onto (**surjective**), in which each ball gets at least one label, but some might get more than one.  Still no guarantee you will get a ball, but all balls go to someone, and you might have to share.

3. Both (**bijective**), in which each ball gets at exactly one label.  You are guaranteed to get a your very own ball.  
*Note: this requires the size ([cardinality](https://en.wikipedia.org/wiki/Cardinality)) of the sets to be equal!*

![Injective, Surjective, Bijective][2016-11-27-tw-03]

## Great! Can we finally see the twelve folds?

Yes.

*Does order matter?*   |**No**  |**Labels**|**Balls**|**Both**
-----------------------|--------|----------|---------|------
**Injective**          |01      |02        |03       |04
**Surjective**         |05      |06        |07       |08
**Bijective**          |09      |10        |11       |12

The duration of this post will explore how to count within each set of rules.  If you thirst for rigorous definitions, please skip to the section **DEFINITIONS** toward the end.

# Definitions

### function
A function maps elements from one set to another set. A function, **f**, described by **f : A&rarr;B** is usually said to map the set **A** to the set **B**.

### domain
A function's domain is the set from which it maps. Given **f : A&rarr;B**, the domain is the set **A**.

### codomain
or **range**  
A function's codomain is the set to which it maps. Given **f : A&rarr;B**, the codomain is the set **B**.

### cardinality
Cardinality is the number of elements in the set, often denoted **|S|** for set **S**.  **|X| = m** and **|Y| = n**.  Consider assigning one [cardinal number](https://en.wikipedia.org/wiki/Cardinal_number) to each element.  


Consider sets **X = {x<sub>1</sub>, ..., x<sub>m</sub>}** and **Y = {y<sub>1</sub>, ..., y<sub>n</sub>}**. Now, consider a set of functions, **F**, where each **f** in **F** maps **X** to **Y** (**&forall; f &isin; F, f : X &rarr; Y**). Without any given restrictions (injective, surjective, distinguishable, indistinguishable), we can assume these functions can send any **x<sub>i</sub>** to any **y<sub>j</sub>** in any way. What types of restrictions can we apply?

### injective
or **one-to-one**  
An injective function maps each element of its domain uniquely to at most one element of its codomain. Some elements may not map to the codomain. No element in the codomain maps back to two elements in the domain.

### surjective
or **onto**  
A surjective function maps to all elements in its codomain. Unlike injective functions, surjective functions can map elements in the domain to multiple elements in the codomain.

### bijective
A bijective function is both injective and surjective. Each element in the function's domain maps to exactly one element in the codomain.


Consider sets **A = {1, 2, 3}**, **B = {3, 1, 2}**, and **C = {3, 1, 2}**. **A**, **B**, and **C** contain the same three elements. Additionally, **B** and **C** order those elements the same.  We can define equivalence relations on **A** and **B** that determine whether or not they are equal.

### distinguishable
or **equal**, **strictly equal**  
Strict equality requires two sets to have the same elements in the same order. As such, **A** &ne; **B** = **C**. This relation is referred to as distinguishable because **A** is distinguishable from **B** and **C**.
We can define distinguishability per direction, as well.  That is, mapping **X** to **Y**, we can require equality up to a permutation of Y only.  In that paradigm, **f : A &rarr; B** is equal, but **f<sup>-1</sup> : B &rarr; A** is not.

### indistinguishable
or **equal up to a permutation**  
An equivalence relation can be called indistinguishable if order does not matter for either set. As such, **A** = **B** = **C**. This relation is referred to as indistinguishable because **A**, **B**, and **C** are indistinguishable from each other.

**permutation**

**combination**

**partition**


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


[2016-11-27-tw-01]: /images/2016-11-27-tw-01.jpg
[2016-11-27-tw-02]: /images/2016-11-27-tw-02.jpg
[2016-11-27-tw-03]: /images/2016-11-27-tw-03.jpg
[2016-11-27-tw-04]: /images/2016-11-27-tw-04.jpg
[2016-11-27-tw-05]: /images/2016-11-27-tw-05.jpg
