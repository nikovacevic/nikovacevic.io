+++
date = "2017-04-20T12:03:35-06:00"
title = "Bayes Theorem"
tags = ["statistics","mathematics"]
+++

A classic Bayesain example:  Carl visits a doctor. She tests Carl for a rare disease, which plagues 1 in 10,000 (0.01%) of the population. The test she administers will produce 99% true results such that 99% of positive results are true and 99% of negative results are true. Carl tests positive. What is the probability that Carl has the rare disease?

Would it surprise you to know that there is less than 1% probability that Carl has the disease?

## Intuition

Not so fast, Johnny Formulas. You can find Bayes Theorem just about anywhere, including tattooed on your friend's 

If you simply must know how the result was yielded, skip to

## Formula

Bayes theorem states a simple relationship governing the conditional probability of a hypothesis, given some evidence:

![Bayes theorem][01]

Take Carl's example above. We can associate terms thusly:

- H = event Carl has the disease
- E = event of a positive test result
- P(H) = prior probability Carl has the disease
- P(E) = prior probability of a positive test result
- P(H|E) = probability Carl has the disease, given his positive test result
- P(E|H) = probability of a positive test result, given Carl has the disease

And their values follow:

- P(H) = 0.0001
- P(E) = ((0.99)(0.0001))+((0.01)(0.9999)) &asymp; 0.01
- P(E|H) = 0.99
- P(H|E) will be revealed by Bayes Theorem

If the determination of P(E) has you lost, recall a basic rule of [conditional probability](https://en.wikipedia.org/wiki/Conditional_probability)<sup> 2</sup>:

![Conditional probability][02]

To yield the result, put your faith in the theorem---we'll discuss why it makes sense soon:

![Bayes example 1][04]

Of course, examples like this verge on misleading. After all, if Carl had symptoms, then the [prior]({{< relref "#prior" >}}) we set up might not be accurate. However, it's a nearly startling result, given the apparent accuracy of the test.

## In Summary

1. Don't forget your priors. That is, don't give specific information disproportional weight relative to general information.

1. 

## Definitions

<a class="definition" name="prior">
### prior
</a>c

## Credit, Reference, Related

1. [Wikipedia: Bayes theorem](https://en.wikipedia.org/wiki/Bayes%27_theorem)

1. [Wikipedia: Conditional probability](https://en.wikipedia.org/wiki/Conditional_probability)

1. [Wikipedia: Base rate fallacy](https://en.wikipedia.org/wiki/Base_rate_fallacy)

1. [Wikipedia: Extension neglect](https://en.wikipedia.org/wiki/Extension_neglect)

1. [Wikipedia: Precision and recall](https://en.wikipedia.org/wiki/Precision_and_recall)

1. [Art of the Problem](https://www.youtube.com/watch?v=Zxm4Xxvzohk)
<div class="iframe-container ic169">
  <iframe src="https://www.youtube.com/embed/Zxm4Xxvzohk" frameborder="0"></iframe>
</div>

1. [Wireless Philosophy](https://www.youtube.com/watch?v=OqmJhPQYRc8)
<div class="iframe-container ic169">
  <iframe src="https://www.youtube.com/embed/OqmJhPQYRc8" frameborder="0"></iframe>
</div>

1. [Crucial Considerations](http://crucialconsiderations.org/rationality/bayes-theorem/)

1. https://xkcd.com/1132/

[01]: /images/bayes/01.svg
[02]: /images/bayes/02.svg
[03]: /images/bayes/03.svg
[04]: /images/bayes/04.svg
