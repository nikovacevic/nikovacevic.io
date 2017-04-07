+++
date = "2016-12-21T09:35:06-07:00"
title = "Twelvefold Way"
tags = ["combinatorics", "mathematics", ]
+++

<div style="font-family: 'Cousine', monospace; position:fixed; right:6px; bottom:6px; padding: 4px 6px; background: #FFF; font-size: 80%; border-bottom: 1px solid #CCC; border-right: 1px solid #CCC; border-radius: 2px;">
<i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;A &nbsp;I &nbsp;S</i><br/>
<i>&nbsp;&nbsp;f&nbsp;&nbsp;</i> <a href="#01">01</a> <a href="#02">02</a> <a href="#03">03</a><br/>
<i>&nbsp;&nbsp;fS<sub>B</sub></i> <a href="#04">04</a> <a href="#05">05</a> <a href="#06">06</a><br/>
<i>S<sub>L</sub>f&nbsp;&nbsp;</i> <a href="#07">07</a> <a href="#08">08</a> <a href="#09">09</a><br/>
<i>S<sub>L</sub>fS<sub>B</sub></i> <a href="#10">10</a> <a href="#11">11</a> <a href="#12">12</a>
</div>

We've all been there:  you have a pile of balls and a stack of labels and you think, "How could I possibly label all of these balls?"

![How could I label all of these balls?][2016-12-17-tw-01]

Right, of course you haven't. But perhaps you are an aspiring combinatorialist! Or perhaps you're just curious.

Anyways, we'll try to resist esoteric mathematical [definitions]({{< relref "#definitions" >}}) until the end.  For now, we have balls and labels to enumerate.

## Labels and Balls

Let's call the set of all balls **B** and the set of all labels **L**. We're concerned with determining how to apply labels, elements in the set **L**, to balls, elements in the set **B**, given some imposed rules.  Must each ball have at least one label?  Must all labels be used at least once?  Exactly once?  Does the order of the labels produced matter?

![Balls and labels and sets][2016-12-17-tw-02]

So far we're just counting, which sounds simple enough.  However, when rules are applied, counting can become complex. Thanks to Richard Stanley and his predecessors<sup>[1]({{< relref "#f1" >}})</sup>, we have the twelvefold way<sup>[2]({{< relref "#f2" >}})</sup> to guide us.

Before we explore that complexity, allow me one formality that will be key to our understanding: the conceptualization of applying labels to balls as a Mathematical function<sup>[3]({{< relref "#f3" >}})</sup>.  Specifically, think of the application of a label to a ball as a function that maps a set of balls (**B**) to a set of labels (**L**), written as **f: B &rarr; L**. The inverse of **f**, denoted **f<sup>-1</sup>**, reverses the mapping, such that **f<sup>-1</sup>: L &rarr; B**.

- If **f(1) = 2**, then **f** maps **ball 1** to **label 2**.

- If **f(2) = {&empty;}** , then **f** does not map **ball 2** to any labels.

- If **f<sup>-1</sup>(2) = 3** , then **f** maps **ball 3** to **label 2**.

For our purposes, a function takes a single value and returns a single value.  This is imperative.  As a result, in terms of balls and labels, a ball can only be labeled once, but a label can be applied to an indefinite number of balls.

*You might have just made a realization regarding invertibility:  if a function maps two or more balls to the same label, then the function is not invertible because one parameter (the label) of the inverted function maps to multiple values (the balls).*

![Function of Balls to Labels][2016-12-17-tw-04]

From here, we can consider the set, **F**, of *all functions* mapping **B** to **L**, which represents all possible mappings, or ways to label the balls. Instead of considering all functions, we can also restrict **F** with rules.

- If we restrict **F** to only functions that map all balls to at least one label, that eliminates all functions that leave out one or more of the balls in the set **B**.

Formally defining sets gives us the ability to make substantiated claims about abstractions, which claims will inform our ability to count!

Exciting stuff, right? Now, regarding the Twelvefold Way.

## Why twelve?

Good question.  The twelvefold way describes the twelve combinations of rules we can apply to ball labelling, composed of **four ways to describe equivalence** and **three rules for labelling**. There are twelve ways to choose one from each of these two sets of rules, so *voila*!

## Equivalence:  Order matters

How can equivalence vary?  Consider sets of integers, **A** and **B**, such that **A = {1, 2, 3}** and **B = {1, 3, 2}**.  Are they the same set?  It depends on what you mean by "the same", which is the loose definition of an [equivalence relation]({{< relref "#equivalence-relation" >}})<sup>[4]({{< relref "#f4" >}})</sup>.

Recall the idea of labelling balls as a function, **f: B &rarr; L**.  Specifically, let's use the sets **B = {1, 2}** and **L = {A, B, C}**. Consider the following set of six functions:

**f<sub>1</sub>: (1, 2) &rarr; (A, A)**

**f<sub>2</sub>: (1, 2) &rarr; (B, B)**

**f<sub>3</sub>: (1, 2) &rarr; (A, B)**

**f<sub>4</sub>: (1, 2) &rarr; (B, A)**

**f<sub>5</sub>: (1, 2) &rarr; (B, C)**

**f<sub>6</sub>: (1, 2) &rarr; (C, B)**

By our most common definition, each function represents a distinct outcome. That is, the [codomains]({{< relref "#codomain" >}}) of these functions are [distinguishable]({{< relref "#distinguishable" >}}).  There are, however, four different ways to approach the concept of distinguishability:

1. Count the lists as **distinct** possibilities. This, again, is likely the most intuitive option. In the given example, out enumeration results in six distinct functions. We'll symbolically refer to this as **f**.

2. Count the lists as **distinct up to a permutation of balls**. If the only thing distinguishing multiple outcomes is the order of the inputs (and thus the outputs), then only count those outcomes once.  In this paradigm we can convince ourselves that **(A, B)** and **(B, A)** are only different because of the order in which the inputs arrive (a permutation of balls).  Pragmatically, this means that we will **sort the output, then ignore duplicate results while counting**.  In the given example, **f<sub>3</sub> = f<sub>4</sub>** and **f<sub>5</sub> = f<sub>6</sub>**, leaving only four distinct functions.  Representing this pre-processing step, we will refer to this as **f&#8728;S<sub>B</sub>**.

3. Count the lists as **distinct up to a permutation of labels**. Pretend that you don't already have an order of labels in mind before they come out of the function; rather, count them as they appear:  
**(A, B)** is **(1, 2)** because you saw **A** first, then **B** second;  
**(B, A)** is **(1, 2)** because you saw **B** first, then **A** second;  
**(A, A)** is **(1, 1)** because you saw **A** first;  
**(B, B)** is **(1, 1)** because you saw **B** first;  
Whereas equivalence relation 2 (above) counts equivalence with a pre-ordering, this concept counts equivalence with a post-ordering. In the given example, **f<sub>1</sub> = f<sub>2</sub>** and **f<sub>3</sub> = f<sub>4</sub> = f<sub>5</sub> = f<sub>6</sub>**, leaving only two distinct functions.  To represent the post-processing, we can call this option **S<sub>L</sub>&#8728;f**.

4. Count the lists as **distinct up to a permutation of balls and labels**. This essentially amounts to pre- and post-ordering, then counting the results. For instance, **(A, B)** and **(B, A)** would both get pre-ordered into **(A, B)**, which would be post-ordered into **(1, 2)**. In the given example, **f<sub>1</sub> = f<sub>2</sub>** and **f<sub>3</sub> = f<sub>4</sub> = f<sub>5</sub> = f<sub>6</sub>**, leaving two distinct functions. Intuitively, we refer to this symbolically as **S<sub>L</sub>&#8728;f&#8728;S<sub>B</sub>**.

Depending on the equivalence rules we choose, the results of our counting can change drastically.

## Labeling: Injective, Surjective, or Neither

Richard Stanley comes home to his kids, One, Two, and Three, with four balls. Like any good father, he has three labels---one for each of his children. He considers three different rules by which he could label them:

1. No rules! Don't label any of the balls. Label each ball with each label. It doesn't matter!

2. One-to-one (**injective**), in which each label is used at most once.  It is as if he only has one of each label.  Nobody gets more than one ball, but there is no guarantee of getting a ball.  

3. Onto (**surjective**), in which each label gets used on at least one ball, but some might be used on more than one ball.  He's got stacks of labels, which is fortunate because each child demands a ball. They might even get more than one, each!

There is also a name for both **injective** and **surjective**: **bijective**, in which each ball gets at exactly one label.  (We don't count it as a unique option in the twelvefold ways because, being a combination of two options, it does not add any further "ways".)  Everyone is guaranteed to get a ball that they don't have to share!

![Injective, Surjective, Bijective][2016-12-17-tw-03]

You might notice that, if **|L| > |B|**, then bijectivity is impossible, courtesy of the Pidgeonhole Principle<sup>[5]({{< relref "#f5" >}})</sup>.  That is, when each ball has exactly one label (**injective**), there exists at least one label without a ball (not **surjective**). However, labeling a ball with one of the remaining labels will violate injectivity.

## Great! Can we finally see the twelve options?

Yes!

*f-class*                                     |**Any**                   |**Injective**             |**Surjective**
----------------------------------------------|--------------------------|--------------------------|--------------------------
**f**                                         |[01]({{< relref "#01" >}})|[02]({{< relref "#02" >}})|[03]({{< relref "#03" >}})
**f&#8728;S<sub>B</sub>**                     |[04]({{< relref "#04" >}})|[05]({{< relref "#05" >}})|[06]({{< relref "#06" >}})
**S<sub>L</sub>&#8728;f**                     |[07]({{< relref "#07" >}})|[08]({{< relref "#08" >}})|[09]({{< relref "#09" >}})
**S<sub>L</sub>&#8728;f&#8728;S<sub>B</sub>** |[10]({{< relref "#10" >}})|[11]({{< relref "#11" >}})|[12]({{< relref "#12" >}})

Our analysis of each case will cover a few things:  intuition about the requirements, cardinality of **B** and **L** (e.g. can we have any number of balls and labels, or do we require more of one than the other?), a formula for counting, and an example.

<a name="01">
# 01 Any f
</a>

Each label can be placed on any ball with no rules. Because order matters, outputs **{a, b, c}** and **{c, b, a}** are distinguishable, so they count separately.  Consider labeling each ball, of which there are **B**, with any of the labels, of which there are **L**. You never run out of any one kind of label, and you don't have to use each label if you don't want to.

## Formula
![01full][01full]

## Cardinality
Sets of any size will do!

## Example
Given **B = {1, 2, 3}** and **L = {a, b}**, all possibilities of **f: B &rarr; L** are:  

**{a, a, a}, {a, a, b}, {a, b, a}, {a, b, b},  
{b, a, a}, {b, a, b}, {b, b, a}, {b, b, b}**

For each ball, of which there are **B = 3**, there are **L = 2** labels:  
![01 example][01ex]

<a name="02">
# 02 Injective f
</a>

Order matters, so **{a, b, c}** and **{c, b, a}** are distinguishable and count separately. Once a label has been used, we cannot use it again. Consider labeling each ball, of which there are **B**, with any of the labels, of which we start with **L**. For the first label, we have **L** labels to choose from, but for the second we only have **L-1** options. With each label placed, the options reduce by one until all balls have been labeled, all labels have been used, or we simply decide to stop.

## Formula
![02full][02full],
which is commonly called a [falling factorial]({{< relref "#falling-factorial" >}}).

## Cardinality
Sets of any size will do!

## Example
Given **L = {i, j}** and **B = {a, b, c, d}**, all possibilities of **f: L &rarr; B** are:  

**{a, b}, {a, c}, {a, d},  
{b, a}, {b, c}, {b, d},  
{c, a}, {c, b}, {c, d},  
{d, a}, {d, b}, {d, c}**

![02 example][02ex]

<a name="03">
# 03 Surjective f
</a>
This is best understood within the context of [09 Surjective S<sub>L</sub>&#8728;f]({{< relref "#09" >}}), which we will see later is equivalent to counting partitions of **B** into **X** sets, resulting in:

![S(B,N)][09]

Starting from that point, we're left to account for the extra permutations of labels, un-doing the post-ordering step of [09]({{< relref "#09" >}}).  The number of permutations of **L** is **L!**, so we multiply by that term to yield out formula.

## Formula
![03][03]

## Cardinality
Due to surjectivity, this requires **|B|&geq;|L|**.

## Example
Given **B = {1, 2, 3, 4}** and **L = {A, B}**, all possibilities of **f: L &rarr; B** are:  

**{A, A, B, B}, {A, B, B, A}, {A, B, A, B}, {A, B, B, B}, {B, A, B, B}, {B, B, A, B}, {B, B, B, A},  
{B, B, A, A}, {B, A, A, B}, {B, A, B, A}, {B, A, A, A}, {A, B, A, A}, {A, A, B, A}, {A, A, A, B},**

*Notice that the first row of answers is identical to the entire answer set of [09]({{< relref "#09" >}}). The second row simply swaps A with B, represented by the leading 2! coefficient:*

![03ex][03ex]

<a name="04">
# 04 Any f&#8728;S<sub>B</sub>
</a>

We aren't restricted by labeling rules, but we do recognize equivalence up to a permutation of balls (e.g. **{A, A, B} = {A, B, A} != {B, B, A}**). Counter-intuitively, case 01 will not help us much. However, understanding combinations<sup>[6]({{< relref "#f6" >}})</sup> with repetition---particularly how it differs from combinations without repetition (see [case 05]({{< relref "#05" >}}))--certainly will.

*(Proof of the relationship between multicombinations and the binomial coefficient below is forthcoming. In the meantime, read Wikipedia's content specifically regarding [combinations with repetition](https://en.wikipedia.org/wiki/Combination#Number_of_combinations_with_repetition))*

## Formula
![04][04]

## Cardinality
**(L+B-1) &geq; B** in order to get a valid result. Otherwise, the answer is 0.

## Example
Given **B = {1, 2}** and **L = {A, B, C, D}**, all possibilities of **f: L &rarr; B** are:  

**{A, A}, {A, B}, {A, C}, {A, D},  
{B, B}, {B, C}, {B, D},  
{C, C}, {C, D},  
{D, D}**

Applying the formula yields the same result:

![04 example][04ex]

*Notice the similarities (and key difference!) between this case and case 05, in both the structure of the example outcomes and the formula.*

<a name="05">
# 05 Injective f&#8728;S<sub>B</sub>
</a>

Injectivity restricts us to use each label at most once. f&#8728;S<sub>B</sub> means that we pre-order the balls, which will differentiate this case from [case 02]({{< relref "#02" >}}). In our example, the pre-ordering will group **{a, c}** and **{c, a}** into one equivalence class.

By this description, you might recognize this case:  enumerating the subsets of **L** with **B** elements. In common parlance, "**B** choose **L**", is represented by the [binomial coefficient]({{< relref "#binomial-coefficient" >}}).

## Formula
![05full][05full]

## Cardinality
**L &geq; B** in order to get a valid result. Otherwise, the answer is 0.

## Example
Given **B = {1, 2}** and **L = {A, B, C, D}**, all possibilities of **f: L &rarr; B** are:  

**{A, B}, {A, C}, {A, D},  
{B, C}, {B, D},  
{C, D}**

![05 example][05ex]

<a name="06">
# 06 Surjective f&#8728;S<sub>B</sub>
</a>

All labels must be used at least once (surjective) and functions are equivalent up to permutations of balls (e.g. **{A, B, B, B} = {B, B, A, B} &ne; {A, A, B, A}**). It's plain to see that we must have more balls than labels for this to make sense.  Let's look at an example before diving into the intuition:

## Example
Given **B = {1, 2, 3, 4}** and **L = {A, B}**, all possibilities of **f: L &rarr; B** are:  

**{A, A, A, B}, {A, A, B, B}, {A, B, B, B}**

We can show that this case is equivalent to counting [compositions]({{< relref "#composition" >}}) of **B** with **L** terms. To see the equivalence, grouping the like-terms into integers:  think of **{A, A, B, B}** as **{2, 2}**, **{A, A, A, B}** as **{3, 1}**, and **{A, B, B, B}** as **{1, 3}**.  These are precisely the three ways of describing **4** as a sum of **2** non-zero integers, which is the definition of a composition. We align with the rules of case 06 because **{A, A, A, B}** and **{A, B, B, B}** are distinguishable (unlike in S<sub>L</sub>&#8728;f) but **{A, A, A, B}** is indistinguishable from **{A, B, A, A}** (both count as **{3, 1}**).

Phew! We won't go all the way to proving why compositions of **B** with **L** terms adhere to the given formula, but you can find a succinct, non-rigorous proof in the [Number of compositions section of Composition](https://en.wikipedia.org/wiki/Composition_(combinatorics)#Number_of_compositions)<sup>[7]({{< relref "#f7" >}})</sup> on Wikipedia. It's worth proving it, yourself, too!

## Cardinality
**|B|&geq;|L|**

## Formula
![06][06]

Applying the formula above to our example above, then reducing the binomial coefficient, we get the answer we expected:

![06ex][06ex]

<a name="07">
# 07 Any S<sub>L</sub>&#8728;f
</a>

Any labeling will do, but functions are equivalent up to a permutation of labels, meaning we post-order function output (e.g. **{A, B, A} = {B, A, B} = {1, 2, 1}**, which is not equivalent to **{A, A, B} = {1, 1, 2}**).

For the sake of brevity, we can leverage the results from [case 09]({{< relref "#09" >}}), which counts the number of partitions of **B** into **L** subsets. The major difference is that case 07 is not surjective, so we don't need to enforce the non-emptiness of the sets. It's fine if some sets are empty, because that's the same as not using some labels, which is okay here.

As a result, we can simply ignore those "empty sets", and reduce this to the sum of the number of partitions of **B** into **x** subsets for **x from 0 to L**:

## Formula
![07][07]

*Note: when L=B, this formula gives the expression for the [Bell number]({{< relref "#bell-number" >}}), B<sub>B</sub>*

## Cardinality
Sets of any size will do. However, if **L &gt; B**, then when *k* grows to be greater than **B**, those terms of the sum will produce **0**.

## Example
Given **B = {1, 2, 3, 4}** and **L = {A, B}**, the options (lines corresponding, respectively, to terms in the formula's sum) are:

*none*,   
**{A, A, A, A},  
{A, A, B, B}, {A, B, B, A}, {A, B, A, B}, {A, B, B, B}, {B, A, B, B}, {B, B, A, B}, {B, B, B, A}**

Using the formula, we yield:

![07 example][07ex]

<a name="08">
# 08 Injective S<sub>L</sub>&#8728;f
</a>

An injective requirement means each label can correspond to at most one ball. The equivalence class, S<sub>L</sub>&#8728;f, will post-order the mapping (e.g. **{A, B, C} = {B, A, C}** under the post-ordering **{1, 2, 3)**).  Quite simply, this means that we'll try to map each ball to exactly one label, where the specific label is obscured by post-ordering.  If we are able to find a unique label per ball, then there is one possible mapping; otherwise, there are zero.

![08 illustration][08ill]
  
## Formula
![08][08], which is known as an [Iverson bracket]({{< relref "#iverson-bracket" >}})

## Cardinality
In order to have one option, **L &geq; B**.

## Example 1
Given **B = {1, 2, 3, 4}** and **L = {A, B}**, we yield:

![08 example 1][08ex1]

## Example 2
Given **B = {1, 2}** and **L = {A, B, C, D}**, we yield:

![08 example 2][08ex2]

<a name="09">
# 09 Surjective S<sub>L</sub>&#8728;f
</a>

It'll help us to think of this as organizing balls into non-empty sets. *Surjective* means we have to use all the labels (no empty sets) and *S<sub>L</sub>&#8728;f* means that outcome are indistinguishable up to a post-ordering (e.g. **(A, A, B)** = **(B, B, A)** because both equal **(1, 1, 2)** after post-ordering).

Those familiar with [partitions of sets]({{< relref "#partition" >}})<sup>[8]({{< relref "#f8" >}})</sup> will recognize this case as the number of partitions of **B** into **L** subsets, or the [Stirling number of the second kind]({{< relref "#stirling2" >}})<sup>[9]({{< relref "#f9" >}})</sup>.

## Formula
![09][09]

## Cardinality
Due to surjectivity, this requires **|B|&geq;|L|**.

## Example
Given **B = {1, 2, 3, 4}** and **L = {A, B}**, all possibilities of **f: L &rarr; B** are:  

**{A, A, B, B}, {A, B, B, A}, {A, B, A, B}, {A, B, B, B}, {B, A, B, B}, {B, B, A, B}, {B, B, B, A}** as illustrated:

![09 illustration][09ill]

This yields the final answer:

![09ex][09ex]

<a name="10">
# 10 Any S<sub>L</sub>&#8728;f&#8728;S<sub>B</sub>
</a>

*We'll rely on our solution to [case 12]({{< relref "#12" >}}), so go read that if you haven't already!*

Here, unlike in case 12, we're not restricted to injective or surjective functions, but we do recognize equivalence up to permutations of both labels and balls.  By removing the surjective restraint, relative to case 12, we're allowing all possible functions that do not cover the entire codomain (i.e. do not apply all labels to at least one ball).

Given the knowledge covered in case 12, we know that **surjective** functions under equivalence **S<sub>L</sub>&#8728;f&#8728;S<sub>B</sub>** are enumerated equivalently to the number of partitions of **B** into **L** subsets.  Simply enough (and much like [case 07]({{< relref "#07" >}}) relative to [case 09]({{< relref "#09" >}})) we can just sum the enumerations for **k from 0 to L**, adding in all the cases excluded in case 12.

## Formula
![10][10]

## Cardinality
Sets of any size will do. However, if **L &gt; B**, then when *k* grows to be greater than **B**, those terms of the sum will produce **0**.

## Example
Given **B = {1, 2, 3, 4}** and **L = {A, B}**, all possibilities of **f: L &rarr; B** are:  

**{A, A, A, A}, {A, A, B, B}, {A, B, B, B}**

as illustrated by:

![10ill][10ill]

Our example above checks out with the formula:

![10ex][10ex]

<a name="11">
# 11 Injective S<sub>L</sub>&#8728;f&#8728;S<sub>B</sub>
</a>

If you understand [08]({{< relref "#08" >}}), then you already understand this case! The pre-ordering step that differentiates this case cannot add any possible outcomes, so it trivially reduces to the result of Injective S<sub>L</sub>&#8728;f.

To see this reduction, consider the examples from 08:

## Example 1
Given **B = {1, 2, 3, 4}** and **L = {A, B}**, we still cannot find a single mapping. We yield:

![11 example 1][11ex1]

## Example 2
Given **B = {1, 2}** and **L = {A, B, C, D}**, the extra pre-order equivalence class means that mapping balls **(1, 2)** is equivalent to mapping **(2, 1)**. However, the post-ordering step makes both of those cases equivalent already.  Nothing changes, yielding:

![11 example 2][11ex2]

<a name="12">
# 12 Surjective S<sub>L</sub>&#8728;f&#8728;S<sub>B</sub>
</a>

*It's useful to understand [09 Surjective S<sub>L</sub>&#8728;f]({{< relref "#09" >}}).*

As in [03]({{< relref "#03" >}}), [06]({{< relref "#06" >}}), and [09]({{< relref "#09" >}}), we need to organize balls into non-empty sets (surjective), but by pre-ordering and post-ordering, we're left with the most general equivalence relation, which only really distinguishes the sizes of the sub-classes. This is easily expressed in 

![12 illustration][12ill]

By enforcing both pre- and post-order, the seven cases in the example from [09]({{< relref "#09" >}}) collapse into only to groups that are fundamentally distinguishable by the size of the subsets, which is made more clear by their shapes.

## Formula
![12][12], which is the number of [partitions]({{< relref "#partition" >}}) of **B** into **L** subsets.

We're left with the final enumeration:

![12ex][12ex]

## Cardinality
Due to surjectivity, this requires **|B|&geq;|L|**.

# Summary

Given **f: B &rarr; L**, how many possible outcomes exist?

*f-class*                                     |**Any**  |**Injective** |**Surjective**
----------------------------------------------|---------|--------------|---------------
**f**                                         |![01][01]|![02][02]     |![03][03]
**f&#8728;S<sub>B</sub>**                     |![04][04]|![05][05]     |![06][06]
**S<sub>L</sub>&#8728;f**                     |![07][07]|![08][08]     |![09][09]
**S<sub>L</sub>&#8728;f&#8728;S<sub>B</sub>** |![10][10]|![11][11]     |![12][12]

A slightly different organization of this same information can be found from--among other places--UC Denver's Math 450<sup>[10]({{< relref "#f10" >}})</sup>.

<a name="definitions">
# Definitions
</a>

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
Any re-ordering of elements in a set is called a permutation; e.g. the permutations of the set **{A, B, C}** are **{A, B, C}, {A, C, B}, {B, A, C}, {B, C, A}, {C, A, B}, {C, B, A}**.  For a set, **X**, of **x** elements, the first position has **x** options, the second has **x-1** and so on, leading to **x!** total permutations of **X**.

<a name="combination">
### combination
</a>
A combination is a possible selection of unordered elements from a set.  The fact that a combination is not ordered (e.g. **{A, B, C} = {C, A, B}**) differentiates it from a permutation.  If a set, **N**, has **n** elements, then the number of combinations of **k** elements (called "n choose k") can be calculated with the [binomial coefficient]({{< relref "#binomial-coefficient" >}}):

![Binomial coefficient][binomial-coefficient]

<a name="partition">
### partition
</a>
A partition of an integer **n** is a way of writing n as a sum of positive integers. For example, the partitions of **3** are **3, 2+1, 1+1+1**, resulting in the number of partitions: **p(3) = 3**. In a partition, **3+1** counts the same as **1+3**, meaning a partition is an un-ordered version of a [composition]({{< relref "#composition" >}}).

<a name="composition">
### composition
</a>
A composition of an integer **n** is a way of writing **n** as an ordered sequence of integers. For example, the compositions of **3** are **3, 2+1, 2+1, 1+1+1**. A composition is an ordered version of a [partition]({{< relref "#partition" >}}).

The number of compositions of **n** is given by:  
![Composition of n][composition-of-n]

The number of compositions of **n** into **k** parts is given by:  
![Composition of n into k][composition-of-n-into-k]
which is supported by the trivial fact that 

<a name="factorial">
### factorial
</a>
![Factorial][factorial-formula]

<a name="falling-factorial">
### falling factorial
</a>
![Falling factorial][falling-factorial-formula]

<a name="binomial-coefficient">
### binomial coefficient
</a>
Within the context of this article, a binomial coefficient enumerates the number of possible combinations of **k** elements chosen from a set of **n** elements:

![Binomial coefficient][binomial-coefficient-formula]

In a greater context, a binomial coefficient (n choose k) is "the coefficient of the x<sup>k</sup> term in the polynomial expansion of the binomial power (1 + x)<sup>n</sup>," according to Wikipedia<sup>[23]({{< relref "#f23" >}})</sup>. [Pascal's triangle](https://en.wikipedia.org/wiki/Pascal%27s_triangle) is entirely composed of binomial coefficients.

<a name="stirling2">
### Stirling number of second order
</a>
A Stirling number of the second order, denoted **S(n, k)**, counts the ways of partitioning **n** elements into **k** non-empty subsets.  Other common notations include  
![Stirling number of second order][stirling2nd]  

They follow the following recurrence relation, courtesy of [UC Denver](http://www.math.ucdenver.edu/~hartkes/teaching/2007fallmath450/twelvefoldway.pdf) <sup>[10]({{< relref "#f10" >}})</sup>:  

**S(0, 0) = 1**  
**S(n, 0) = 0, for n &geq; 1**  
**S(n, k) = 0, for n &leq; k**  
**S(n, k) = (k)S(n−1, k) + S(n−1, k−1), for n &geq; k &geq; 1**  

<a name="iverson-bracket">
### Iverson bracket
</a>
For denoting truth or falseness, the Iverson bracket applies a 1 to a true statement and 0 to a false statement. Symbolically, that can be written:  
![Iverson bracket][iverson]

<a name="bell-number">
### Bell number
</a>
The Bell numbers, indexed by **B<sub>n</sub>**, enumerate the partitions of a set, specifically of size **n**.  Bell numbers can be described by the following recurrence relation:  
![Bell number recurrence relation][bell-recurrence]

or by the following summation of [Stirling numbers of the second kind]({{< relref "#stirling2" >}})
![Bell number sum][bell-sum]  

<a name="equivalence-relation">
### Equivalence relation
</a>
It sounds circular, but an equivalence relation partitions a set into equivalence classes. In more lay-terms, it determines what is and is not equivalent. For instance, if order does not matter, then **(A, B)** is equivalent to **(B, A)**; however, if order does matter, then **(A, B)** is not equivalent to **(B, A)**.

Many branches of mathematics depend on a more broad and robust definition of an equivalence relation, which I encourage you to explore! Wikipedia<sup>[4]({{< relref "#f4" >}})</sup> is a good place to start.

# Credit, Reference, and Related Reading

*I must note here that I owe a lot of references to Wikipedia and its many authors for things that are laborious to reference at each mention, such as formulas and specific rigorous wording. I hope to always give all the credit due to that community.*

1. <a name="f1" href="https://en.wikipedia.org/wiki/Richard_P._Stanley">Richard P. Stanley, *Wikipedia*</a> 

2. <a name="f2" href="https://en.wikipedia.org/wiki/Twelvefold_way">Twelvefold way, *Wikipedia*</a> 

3. <a name="f3" href="https://en.wikipedia.org/wiki/Function_(mathematics)">Fuction (mathematics), *Wikipedia*</a>

4. <a name="f4" href="https://en.wikipedia.org/wiki/Equivalence_relation">Equivalence relation, *Wikipedia*</a>

5. <a name="f5" href="https://en.wikipedia.org/wiki/Pigeonhole_principle">Pidgeonhole principle, *Wikipedia*</a>

6. <a name="f6" href="https://en.wikipedia.org/wiki/Combination">Combination, *Wikipedia*</a>

7. <a name="f7" href="https://en.wikipedia.org/wiki/Composition_(combinatorics)">Composition (combinatorics), *Wikipedia*</a>

8. <a name="f8" href="https://en.wikipedia.org/wiki/Partition_of_a_set">Partition of a set, *Wikipedia*</a>

9. <a name="f9" href="http://mathworld.wolfram.com/StirlingNumberoftheSecondKind.html">Stirling number of the second kind, *Wolfram Mathematica*</a>

10. <a name="f10" href="http://www.math.ucdenver.edu/~hartkes/teaching/2007fallmath450/twelvefoldway.pdf">Twelvefold way, *UC Denver Math 450*</a>

11. <a name="f11" href="https://en.wikipedia.org/wiki/Function_(mathematics)">Function (mathematics), *Wikipedia*</a>

12. <a name="f12" href="https://en.wikipedia.org/wiki/Cardinality">Cardinality, *Wikipedia*</a>

13. <a name="f13" href="https://en.wikipedia.org/wiki/Injective_function">Injective function, *Wikipedia*</a>

14. <a name="f14" href="https://en.wikipedia.org/wiki/Surjective_function">Surjective function, *Wikipedia*</a>

15. <a name="f15" href="https://en.wikipedia.org/wiki/Domain_of_a_function">Domain of a function, *Wikipedia*</a>

16. <a name="f16" href="https://en.wikipedia.org/wiki/Codomain">Codomain, *Wikipedia*</a>

17. <a name="f17" href="https://en.wikipedia.org/wiki/Equivalence_relation">Equivalence relation, *Wikipedia*</a>

18. <a name="f18" href="http://www-math.mit.edu/~rstan/ec/">Information on Enumerative Combinatorics, Richard Stanley, *MIT*</a>

19. <a name="f19" href="https://en.wikipedia.org/wiki/Falling_and_rising_factorials">Falling and rising factorials, *Wikipedia*</a>

20. <a name="f20" href="https://en.wikipedia.org/wiki/Partition_(number_theory)">Partition (number theory), *Wikipedia*</a>

21. <a name="f21" href="https://en.wikipedia.org/wiki/Iverson_bracket">Iverson bracket, *Wikipedia*</a>

22. <a name="f22" href="https://en.wikipedia.org/wiki/Bell_number">Bell number, *Wikipedia*</a>

23. <a name="f23" href="https://en.wikipedia.org/wiki/Binomial_coefficient">Binomial coefficient, *Wikipedia*</a>


[2016-12-17-tw-01]: /images/2016-12-17-tw-01.jpg
[2016-12-17-tw-02]: /images/2016-12-17-tw-02.jpg
[2016-12-17-tw-03]: /images/2016-12-17-tw-03.jpg
[2016-12-17-tw-04]: /images/2016-12-17-tw-04.jpg
[binomial-coefficient]: /images/tfw/binomial-coefficient.svg
[binomial-coefficient-formula]: /images/tfw/binomial-coefficient-formula.svg
[composition-of-n]: /images/tfw/composition-of-n.svg
[composition-of-n-into-k]: /images/tfw/composition-of-n-into-k.svg
[factorial-formula]: /images/tfw/factorial-formula.svg
[falling-factorial-formula]: /images/tfw/falling-factorial-formula.svg
[bell-recurrence]: /images/tfw/bell-recurrence.svg
[bell-sum]: /images/tfw/bell-sum.svg
[stirling2nd]: /images/tfw/stirling2nd.svg
[iverson]: /images/tfw/iverson.svg
[01]: /images/tfw/01.svg
[02]: /images/tfw/02.svg
[03]: /images/tfw/03.svg
[04]: /images/tfw/04.svg
[05]: /images/tfw/05.svg
[06]: /images/tfw/06.svg
[07]: /images/tfw/07.svg
[08]: /images/tfw/08.svg
[09]: /images/tfw/09.svg
[10]: /images/tfw/10.svg
[11]: /images/tfw/11.svg
[12]: /images/tfw/12.svg
[01ex]: /images/tfw/01ex.svg
[02ex]: /images/tfw/02ex.svg
[03ex]: /images/tfw/03ex.svg
[04ex]: /images/tfw/04ex.svg
[05ex]: /images/tfw/05ex.svg
[06ex]: /images/tfw/06ex.svg
[07ex]: /images/tfw/07ex.svg
[08ex1]: /images/tfw/08ex1.svg
[08ex2]: /images/tfw/08ex2.svg
[09ex]: /images/tfw/09ex.svg
[10ex]: /images/tfw/10ex.svg
[11ex1]: /images/tfw/11ex1.svg
[11ex2]: /images/tfw/11ex2.svg
[12ex]: /images/tfw/12ex.svg
[01full]: /images/tfw/01full.svg
[02full]: /images/tfw/02full.svg
[05full]: /images/tfw/05full.svg
[03ill]: /images/tfw/03ill.jpg
[08ill]: /images/tfw/08ill.jpg
[09ill]: /images/tfw/09ill.jpg
[10ill]: /images/tfw/10ill.jpg
[12ill]: /images/tfw/12ill.jpg
