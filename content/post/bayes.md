---
date: "2017-04-29T19:30:00-06:00"
title: "Bayes Theorem"
tags: ["mathematics","rationality","statistics"]
draft: false
---

A classic Bayesain example:  Carl visits a doctor. She tests Carl for a rare disease, which plagues 1 in 10,000 (0.01%) of the population. The test she administers will produce results such that 100% of positive results are true and 99% of negative results are true (i.e. there is a 1% rate of false positives among those without the disease). Carl tests positive. What is the probability that Carl has the rare disease?

![Mind your priors][01]

Would it surprise you to know that there is less than 1% probability that Carl has the disease?

## Intuition

Perhaps the given example verges on misleading, but we can use it to bring to light a common flaw in human reasoning. Recall the given information about the disease and the test. If you're like me (prior to learning about Bayes) then you likely remember that **Carl tested positive** and **99% of test results are true**. At first, you might feel that the bit about 0.01% of the population having the disease is a mere triviality, but it deserves more attention than that.

We call this independent probability of disease the {{< defref "prior" "prior" >}}; that is, prior to receiving further information (i.e. the test results), Carl has a 0.01% chance of having the disease. (If 10,000 people are sampled at random from a representative distribution of people, then we can expect only 1 of them to have the disease.)

The prior precisely weights the probabilities of the two possible outcomes of Carl's positive test results:  **false positive** and **true positive**. Without applying prior weights, there is an implicit assumption that the prior chance a person has the disease is 50% (equal to the chance they do not).

If 1 in 2 had the disease, rather than 1 in 10,000, what could we say about Carl's chances?

*In the following illustrations, the sizes of the two containers represent the probability of the two priors: P(sick) and P(not sick). The shaded areas within each represent the event of a positive test result, given the respective prior.*

![Prior: 1 in 2][02]

We know that Carl tested positive, so determining his chances of being healthy (i.e. the test was a false positive) requires us to compare the ratio of shaded area in the left container (1) to the total shaded area (1 + 100), yielding 1/101 &approx; 1%. Intuitively, the 99% accurate test tells us Carl has a 99% chance of being sick.

From this base, we can build intuition for Bayesian results by incrementally shifting the prior probabilities, resizing the two containers relative to each other. For instance, what if 1 in 11 people had the disease?

![Prior: 1 in 11][03]

Notice that the conditional probabilities, **P(false positive|not sick)** and **P(true positive|sick)**, are fixed because they are determined by the fact that test results are 99% and 100% true, respectively. However, we get a drastically different result because the resized containers weight those events differently.

With a 100/110 &approx; 91% prior chance of being healthy, the chance Carl is healthy given the positive test result rises to 1/11 &approx; 9%.

What if 1 in 101 people had the disease?

![Prior: 1 in 101][04]

This is an inflection point. The priors are weighted so disproportionally that the chance Carl is healthy, even given his positive test result, rises to 50%. It's easy to see why: there is exactly one shaded square on each side, meaning an equal chance of false positive and true positive.

Given that slimmer chances of prior sickness result in slimmer chances of sickness, even give the positive test result, how low will we expect the chances the Carl is sick to drop once the prior probability of sickness is 1 in 10,000?

## Formula

By understanding the intuition, we've practically derived the formula. Instead of drawing pictures every time, we can convert from our geometric process to an algebraic formula.

![Geometric formula][05]

Geometrically, we found the probability of the hypothesis (Carl is sick) given an event (positive test result) by comparing the probability of that event assuming the hypothesis is true (filled-in area in the left container) to the total probability of the event happening (total filled-in area).

Apply the labels given in the illustration above to yield Bayes theorem:

![Bayes theorem][f01]

Although the results are sometimes counter-intuitive, the derivation is fully intuitive.

Using the formula, we can arrive at the final result of Carl's situation rather efficiently. Here are the terms, again:

- **P(H)** = prior probability Carl has the disease
- **P(!H)** = prior probability Carl does not have disease
- **P(E)** = prior probability of a positive test result
- **P(E|H)** = probability of a true positive test result, given Carl has the disease
- **P(E|!H)** = probability of a false positive test result, given Carl does not have the disease
- **P(H|E)** = probability Carl has the disease, given his positive test result

And their values follow from the description of the situation:

- **P(H)** = 0.0001
- **P(!H)** = 1.0 - 0.0001 = 0.9999
- **P(E|H)** = 1.00
- **P(E|!H)** = 0.99
- **P(E)** = P(E|H)P(H) + P(E|!H)P(!H) = (0.99)(0.0001) + (0.01)(0.9999) &asymp; 0.01

For determining P(E), recall the following rule of {{< footref 2 "conditional probability" >}}:

![Conditional probability][f02]

Finally, we get to the intuitive-yet-counter-intuitive solution:

![Bayes example 1][f04]

Carl has approximately a **0.98%** (98 in 1000) chance of having the dreaded disease.

## Updating Priors

One of the most powerful applications of Bayes is continued updating of probabilities, given new evidence. Chaining calculations, plugging the output of one formula into the input of the next, allows ongoing, ever-more-accurate predictions to be made.

For instance, at this point Carl has **0.98%** chance of disease. What if he returned for a second test?  In both cases, we will start with a prior P(H) of 0.0098 (up drastically from 0.0001).

*Before reading on, try these two yourself!*

### Second Test is Positive

```
P(H) = 0.0098
P(E|H) = 1.00
P(E|!H) = 0.01
P(E) = P(E|H)P(H) + P(E|!H)P(!H) = (1)(0.0098) + (0.01)(0.9902) = 0.0197

P(H|E) = (1)(0.0098) / (0.0197) = 0.497
```

Only two test results in and we're up to about 50%. A third positive test (I'll leave that to you as an exercise) and we'd rise to the all-but-certain figure of 99% probability that Carl is ill.

### Second Test is Negative

*Note: we're using P(!E) because this test is not positive.*

```
P(H) = 0.0098
P(!E|H) = 0.0
P(!E|!H) = 0.99
P(!E) = P(!E|H)P(H) + P(!E|!H)P(!H) = (0)(.0098) + (0.99)(0.9902) = 0.98

P(H|E) = (0.99)(0.9902) / (0.98) = 1.0
```

But did we really need to do this? No! We already knew that the test catches 100% of sick people, so a single negative result clears us of any doubt. Carl is healthy.

## The Flaw: Base rate fallacy

Earlier, I mentioned a "flaw in human reasoning" that has us down this rabbit-hole. Formally, it is called {{< footref 3 "base rate fallacy" >}}. According to Wikipedia, base rate fallacy occurs when people are "presented with related base rate information (i.e. generic, general information) and specific information (information only pertaining to a certain case)," but "the mind tends to ignore the former and focus on the latter"

In effect, base rate fallacy makes people bad at estimating likelihood in a subset of cases that can be formulated as a {{< defref "prior" "prior" >}} and a {{< defref "posterior" "posterior" >}}, which it turns out is a lot of cases. To get a sense for them, beyond poor Carl, we can consider a few examples.

## Bayes in the Wild

Any situation involving a steeply skewed prior probability clashing with a steeply skewed event probability makes for a good example. Many such examples shed light on common societal irrationalities and misconceptions. Here are a few:

### Terrorist identification

*Sourced (slightly altered) from {{< footref 3 "Wikipedia: Base rate fallacy" >}}*

An airport attempts to bolster security by installing an A.I. system trained to identify terrorists. The system has a 99.9% accuracy rate; i.e. the rate of false positives and false negatives are both 1 in 1000. At this airport during this time period, we can reasonably expect 1 terrorist per 1,000,000 travelers.

Someone triggers the alarm. What is the probability they are a terrorist?

```
P(H) = 0.000001
P(E|H) = 0.9999
P(E|!H) = 0.0001
P(E) = (0.9999)(0.000001) + (0.0001)(0.999999) = 0.0001

P(H|E) = (0.9999)(0.000001) / (0.0001) = 0.01
```

Even with an accuracy rate of 99.9%, there is only a 1% chance that the system correctly identified this individual as a terrorist.

*It's easy to generalize this example to just about any personal bias regarding stereotyping minorities! Try it!*


### Evaluating Habits

You're trying out a new habit. For example, getting a full eight hours of sleep, going to bed and waking up at the same time every day. You'd like to know how it's working out over time, so you dedicate ten days to the experiment and record how you're feeling.

H = sleeping eight hours is a beneficial habit
E = event that you feel well-rested

You get to pick these, which may feel arbitrary--in fact, it sort of is! But, the power of the iterative method is that it will converge to the appropriate answer, regardless. (Closer initial estimates will speed up the process, of course). It seems like a reasonable and conservative starting point might be:

- **P(H)** = 0.75
- **P(E|H)** = 0.80
- **P(E|!H)** = 0.40
- **P(E)** = (0.80)(0.75) + (0.4)(0.25) = 0.70

Before moving on, double-check--is feeling well-rested 7 out of 10 days a reasonable starting point? If not, which parameters might bring you closer to a more reasonable starting point?

Your journal might look something like this:

Day | Well-rested? | P(H)
----|--------------|---------
1   | Yes          | `0.8571`
2   | Yes          | `0.9230`
3   | Yes          | `0.9600`
4   | No           | `0.8888`
5   | Yes          | `0.9411`
6   | Yes          | `0.9696`
7   | Yes          | `0.9846`
8   | Yes          | `0.9922`
9   | No           | `0.9770`
1   | Yes          | `0.9884`

Sure, you had one or two nights of poor sleep, but Bayes is tracking the full context of the experiment from step-to-step, encoding all of that experience in the single number that rolls from day to day. Maybe 10 days isn't so impressive to you, but what if you recorded your sleep for a whole year in this manner? The quality of each night of sleep might escape your memory, such that recent nights might carry disproportional weight. Bu

Your friend decided to give the same experiment a chance, starting even with the same initial probabilities. She had different results:

Day | Well-rested? | P(H)
----|--------------|---------
1   | Yes          | `0.8571`
2   | No           | `0.6666`
3   | No           | `0.4000`
4   | No           | `0.1818`
5   | Yes          | `0.3076`
6   | Yes          | `0.4705`
7   | Yes          | `0.6400`
8   | Yes          | `0.7804`
9   | No           | `0.5423`
1   | Yes          | `0.7032`

You friend only still slept well 6 of the 10 days, so confidence in this sleep plan dropped from 75% to 70%. Seems reasonable, no? More interesting than the final outcome, though, are the swings in probability, especially after runs of three or four of the same consecutive event.

Of course, doing this by hand would be tedious, so you chose to generate these running probabilities with a short little Go program.

```go
package main

import "fmt"

func bayesStep(pEgivenH, pH, pE float64) float64 {
	return (pEgivenH * pH) / pE
}

func main() {
	pH := 0.75
	pEgivenH := 0.8
	pEgivenNH := 0.4
	pE := pEgivenH*pH + pEgivenNH*(1.0-pH)

	events := []int{1, 1, 1, 0, 1, 1, 1, 1, 0, 1}
  
	for i, e := range events {
		if e == 1 {
			pH = bayesStep(pEgivenH, pH, pE)
			pE = pEgivenH*pH + pEgivenNH*(1.0-pH)
		} else {
			pH = bayesStep((1.0 - pEgivenH), pH, (1.0 - pE))
			pE = pEgivenH*pH + pEgivenNH*(1.0-pH)
		}
		fmt.Printf("%v\tE=%v\tP(H)=%v\n", i, e, pH)
	}
}
```

## In Summary

Don't forget your {{< defref "prior" "priors" >}} and trust the numbers, not your gut!

## Definitions

<a name="conditional-probability">
##### conditional probability
</a>
{{< footref 2 "Conditional probability" >}} governs the probability that an event **A** will occur, given that an event **B** has already occurred, which is denoted **P(A|B)**. Given the conditional probability, **P(A|B)**, and the probability of **B**, **P(B)**, we can say **P(A) = P(A|B)P(B)**.

<a name="posterior">
##### posterior
</a>
The posterior is the probability, or "degree of belief", in an event A, given an event B. Denoted P(A|B) in {{< defref "conditional-probability" "conditional probability" >}}.  
*Counterpart to {{< defref "prior" "prior" >}}*

<a name="prior">
##### prior
</a>
The prior is the probability, or "degree of belief", in an event A, before accounting for any additional knowledge. Denoted P(A).  
*Counterpart to {{< defref "posterior" "posterior" >}}*

## Credit, Reference, Related

1. {{< footnote 1 "Wikipedia: Bayes theorem" "https://en.wikipedia.org/wiki/Bayes%27_theorem" >}}

1. {{< footnote 2 "Wikipedia: Conditional probability" "https://en.wikipedia.org/wiki/Conditional_probability" >}}

1. {{< footnote 3 "Wikipedia: Base rate fallacy" "https://en.wikipedia.org/wiki/Base_rate_fallacy" >}}

1. {{< footnote 4 "Wikipedia: Extension neglect" "https://en.wikipedia.org/wiki/Extension_neglect" >}}

1. {{< footnote 5 "Art of the Problem" "https://www.youtube.com/watch?v=Zxm4Xxvzohk" >}}
<div class="iframe-container ic169">
  <iframe src="https://www.youtube.com/embed/Zxm4Xxvzohk" frameborder="0"></iframe>
</div>

1. {{< footnote 6 "Wireless Philosophy" "https://www.youtube.com/watch?v=OqmJhPQYRc8" >}}
<div class="iframe-container ic169">
  <iframe src="https://www.youtube.com/embed/OqmJhPQYRc8" frameborder="0"></iframe>
</div>

1. {{< footnote 7 "Crucial Considerations" "http://crucialconsiderations.org/rationality/bayes-theorem/" >}}

1. {{< footnote 8 "XKCD: Frequentists vs. Bayesians" "https://xkcd.com/1132/" >}}

[f01]: /images/bayes/f01.svg
[f02]: /images/bayes/f02.svg
[f03]: /images/bayes/f03.svg
[f04]: /images/bayes/f04.svg
[01]: /images/bayes/01.jpg
[02]: /images/bayes/02.jpg
[03]: /images/bayes/03.jpg
[04]: /images/bayes/04.jpg
[05]: /images/bayes/05.jpg
