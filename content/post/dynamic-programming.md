---
date: "2016-11-04T15:54:37-06:00"
title: "Dynamic Programming"
tags: ["algorithms","analysis","Go"]
draft: false
---

One of the first lessons taught about algorithms is to beware the brute force approach. There should be no need to search for a solution among all possibilities because a single, subtle path must exist.  This advice is useful, but some tasks defy the most complicated strategies yet yield to a simple, exhaustive exploration known as **[dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming)** <sup>1</sup>.

Of course, dynamic programming demands some cleverness. It might be more fitting to describe it as exploring every possibility, but only those that are necessary, while remembering everything, but only those things that are necessary. The goal, ultimately, is to bound the exploration of exponential possible answers with some polynomial expression.

> *One perspective is that dynamic programming is approximately careful brute-force. <sup>2</sup>*
<sub>Erik Demaine<sub>

"Careful" could mean just about anything, so let's get specific. When can we use dynamic programming? Why is it so effective? How can we formulate DP approaches, given specific problem types?

## Introduction

Let's first explore a simple example.

### Fibonacci

Before delving into the full power of the approach, I present the pedestrian, canonical example:  [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number) <sup>5</sup>.  The nth Fibonacci number can be generated with a simple, recursive function. Here is a naïve version:

```
func Fibonacci (n int) int {
  if n == 0 || n == 1 { return 1 }
  return Fibonacci(n-1) + Fibonacci(n-2)
}
```

Drawing a recursion tree illustrates the inefficiency. Taking `Fibonacci(6)` as a simple and small example, how many different trees end up splitting on `F(3)`? Three. `F(2)`? Five. Instances of `F(1)` and `F(0)` are innocuous because they return in constant time, but instances of `F(x) | x > 1` spawn two branches, adding to the enormity of our recursion tree.

![Naïve Fibonacci is exponantial][2016-11-04-dp-01]

Rather than calculating the solution to all instances of each `F(x) | x > 1` subproblem, we can calculate the solution to the first instance, remember that solution, and return it in constant time for all subsequent instances. Updating our code and our tree takes little effort, but yields enormous gains in terms of asymptotic efficiency.

```
F[0] = 1
F[1] = 1

func Fibonacci (n int, F []int) int {
  if f, ok := F[n]; ok { return f }
  F[n] = Fibonacci(n-1, F) + Fibonacci(n-2, F)
  return F[n]
}
```

![DP Fibonacci is polynomial][2016-11-04-dp-02]

Identifying repetitive subproblems and memoizing the solutions to their subproblems, is the simple magic of dynamic programming. As the updated tree diagram exemplifies, we have `n` layers, but with only 2 constant time operations each, resulting in `Θ(n)` runtime.

An equivalent way to express this algorithm, which reduces the overhead of function calls and the depth of the [call stack](), begins with the base case(s). **Bottom-up solutions** read more like inductive proofs: define a base case; define a relationship between subproblems and their super-problem that maintains correctness; iterate until reaching the given value of `n`.

```
func Fibonacci (n int) int {
  F := make(map[int]int)
  F[0] = 1
  F[1] = 1
  for i:=2; i < n; i++ {
    F[n] = F[n-1] + F[n-2]
  }
  return F[n]
}
```

```
F(0) = 1
F(1) = 1
F(2) = F(1) + F(0) = 1 + 1 = 2
F(3) = F(2) + F(1) = 2 + 1 = 3
F(4) = F(3) + F(2) = 3 + 2 = 5
F(5) = F(4) + F(3) = 3 + 5 = 8
F(6) = F(5) + F(4) = 5 + 8 = 13
```

The Fibonacci example is utterly digestible, but offers little excitement. However, it will help us to discuss the structure of problems similarly well-suited to dynamic programming solutions.

## Identification

We observed that the naïve, recursive Fibonacci algorithm repeats an exponential amount work because it re-calculates solutions to repetitive subproblems at different recursive levels. The dynamic programming solution bounds the exponential recursion tree with a linear one by remembering solutions to previous subproblems.

In the abstract, we will identify questions well-suited to dynamic programming by the following circumstances:

- **Subproblems exist** such that solutions to a problem can be expressed in terms of solutions to its subproblems.
- **Enough base subproblems exist** for which the solution is defined.
- **Subproblems overlap**; i.e. certain subproblems repeat within the set of all subproblems generated between the base subproblem and the ultimate problem.

Whereas Fibonacci offers a rudimentary version of subproblems, in most cases, identifying subproblems does not come directly from the problem's definition.  Our next example requires more cleverness.

### Coins: Minimum

> Given a monetary amount and a set of coins, each with unlimited quantity, find the combination of coins that gives exact change for amount with the minimum number of coins.

For example, given amount of `3` and coin denominations `[1, 2]`, the minimum number of coins is `2` (one of each).

Alright, so where are the subproblems?  How could knowing the answer when the amount is `6` help us find the answer for an amount of `300`?  How can we convince ourselves that subproblems are helpful in the first place?

Observe that clumsy brute force would be a bad idea.  For `C` coins and `N` amount, that method would entail trying all `C` options for the first coin, the second coin, and all subsequent coins until the last one. We can bound that runtime by **O(C<sup>N</sup>)**, which is a disaster.

Next, observe that we can construct something reminiscent of the Fibonacci algorithm by looking for base-cases and between-cases, even if we aren't clear about sub-structure just yet:

```
Minimum[0] = ?
Minimum[1] = ?
...
Minimum[N] = ?
```

The minimum number of coins required to make change for an amount of `0` is, itself, `0` by definition.

```
Minimum[0] = 0
```

Now, we need a recipe to get from `0` to `N`. In the spirit of our first definition of dynamic programming, "careful brute-force", can we try all coins at each value between `0` and `N` in such a way that we can guarantee correctness without exceeding polynomial time?

Well, let's try something. For each amount `a` between `0` and `N`, try getting to `a` from each coin `C`.  That is, for `a=6` and coins `[1, 2, 4]`, try getting to `6` from `5+(c=1)`, `4+(c=2)`, and `2+(c=4)`. Which is the least *expensive* way to get there, in terms of number of coins? In each case, we're only adding one coin, so the solution is trivial if we've remembered the number of coins required to make `5`, `4`, and `2`: just add one to each and choose the smallest number!

Walking through the code makes the idea obvious:

```
memo := make(map[int]int)
m[0] = 0
for n := 1; n <= amount; n++ {
    min := ∞
    for c := range coins {
        if c <= n && (m[n-c] + 1) < min {
            min = 1 + m[n-c]
        }
    }
    memo[n] = min
}
```
*<sup>Full code available at [github.com/nikovacevic](https://github.com/nikovacevic/algorithms1/blob/master/coins/coins.go)</sup>*

Given `N=7` and `C=[1, 2, 3]` here is the series of events, generally:

```
Minimum[0] = 0

n = 1
  c = 1
  Minimum[1] = Minimum[0] + 1 = **1**
  c = 2
  (Stop: c > n)
  c = 3
  (Stop: c > n)

n = 2
  c = 1
  Minimum[2] = Minimum[1] + 1 = 2
  c = 2
  Minimum[2] = Minimum[0] + 1 = 1
  c = 3
  (Stop: c > n)

n = 3
  c = 1
  Minimum[3] = Minimum[2] + 1 = 2
  c = 2
  Minimum[3] = Minimum[1] + 1 = 2
  c = 3
  Minimum[3] = Minimum[0] + 1 = 1

n = 4
  ...
n = 5
  ...
n = 6
  ...

n = 7
  c = 1
  Minimum[7] = Minimum[6] + 1 = 3
  c = 2
  Minimum[7] = Minimum[5] + 1 = 3
  c = 3
  Minimum[7] = Minimum[4] + 1 = 3

return Minimum[7] = 3
```

As you can see, we have `N` steps, each with `C` operations, yielding polynomial time. The magic lies in transforming multiplication of `C` by itself `N` times (**C<sup>N</sup>**) into multiplying `C` by `N` (**CN**), flattening the exponential tree into a polynomial expression.

## Correctness

It's clear, hopefully, that this approach is correct.  Seems logical enough, right?  But we don't care about coins---we care about dynamic programming.  Unfortunately, for other problems, correctness will not be so trivial to see.  So how can we prove correctness in general cases where dynamic programming seems like it applies?

We want our algorithm to work like an [inductive proof](https://en.wikipedia.org/wiki/Mathematical_induction) <sup>9</sup>.  Each step should imply the correctness of the next.  To do that, let's revisit the last step of `Minimum[7]`.  It is clearly a sum of two subproblems: `Minimum[4]`, which is `2`; `Minimum[c=3]`, which is always `1` because that is the exact value of the given coin.  These are our two subproblems of `Minimum[7]`.

Now consider some general optimal solution to `Minimum[N]`.  Breaking it into two subproblems along any boundary yields two subproblems with inherited solutions: `Minimum[N-C] | Minimum[C]`.  Now, assume one of those solutions is not optimal, such that `Minimum[N-C] + Minimum[C] < Minimum[N]`.  That statement contradicts our original claim that `Minimum[N]` is optimal.  By contradiction, we can now claim that if `Minimum[N]` is optimal, then `Minimum[N-C]` and `Minimum[C]` are optimal for all `C`.

Furthermore, because we are checking this property for all possible subproblem boundaries (e.g. for all coin denominations for each amount, in the coin example) we can guarantee that our solution for `Minimum[N]` is optimal, because it is the most optimal combination in the set of all possible pairs of optimal subproblems.

Good work! So, what should we name this general correctness property?

### Optimal substructure

Sorry, it already has a name:  we've just discovered **[optimal substructure](https://en.wikipedia.org/wiki/Optimal_substructure)**. A problem fulfilling optimal substructure has an "optimal solution [that] can be constructed efficiently from optimal solutions of its subproblems" <sup>6</sup>.  That is, optimal substructure holds if a given optimal solution implies that the given subproblem solutions are also optimal.  Reference *[Dynamic Programming Solution to the Coin Changing Problem](http://www.ccs.neu.edu/home/jaa/CS7800.12F/Information/Handouts/dyn_prog.pdf)* <sup>7</sup> for a great example of a mathematical claim and proof of optimal substructure.

Note that we proved optimal substructure for the coin problem. **It does not come for free because it does not hold for all problems.** Please reference Wikipedia for [problems with optimal substructure](https://en.wikipedia.org/wiki/Optimal_substructure#Problems_with_optimal_substructure) <sup>10</sup> and [problems without optimal substructure](https://en.wikipedia.org/wiki/Optimal_substructure#Problems_without_optimal_substructure) <sup>11</sup> for examples.

## Recap!

It certainly seems like we've covered a lot of ground since we introduced Fibonacci.  The core concepts, though, are rather spare.

**Dynamic programming can solve problems that can be expressed in terms of one or more subproblems and exhibit optimal substructure.**

Dynamic programming techniques work because, without DP, the number of subproblems would run in exponential time, but DP techniques can re-use sub-solutions to provide a polynomial upper-bound.  In his lectures, Erik Demaine discusses the upper-bounding mechanics in terms of *prefixes*, *suffixes*, and *substrings* or *subarrays*.  Whereas an array of length `N` has `N!` combinations of elements, it only has `N` prefixes, `N` suffixes, and `N`**<sup>2</sup>** subarrays <sup>4</sup>. (If you're curious, try writing out all the combinations, prefixes, suffixes, and subarrays of a small array!)

Although there is no formula, per se, we can organize that knowledge into a general method.

### General Method

1. **Define the problem in terms of subproblems.** Enumerate these subproblems.

2. **Devise a strategy for composing subproblem solutions to yield super-problem solutions.** In doing so, verify that the problem exhibits **optimal substructure**.

3. **Define the solution at a base case.** Make sure enough base cases are defined to begin iterating through bigger problems.

4. **Solve subproblems, memoize their solutions, and iterate to the next super-problem.** Continue this process until reaching the solution to the original problem.

Although his numbered steps look quite a bit different, I highly recommend watching Erik Demaine's lectures for his interpretation of a general method.

## Final exercise

This one is for you! If you get it, you can also earn [Hacker Rank](https://www.hackerrank.com/challenges/ctci-coin-change) credits for it.

### Coin Combinations

> Given an amount, `N`, and a set of coins, `C = {c1, ..., cD}`, each with a distinct values, find and print the number of different ways you can make change for `N` if each coin is available in an infinite quantity.

Good luck! If you need guidance (don't cheat), my solution is available on [Github](https://github.com/nikovacevic/algorithms1/blob/master/coins/coins.go).

## You might be wondering

### Where does the name "dynamic programming" come from?
According to Erik Demaine, the name given by the inventor of dynamic programming, First Last, was meant to lend heft to his studies.  Apparently, it doesn't *mean* anything, but it *sounds* important, leaving him to safely pursue his research without having to justify its importance.  Anecdotal or otherwise, it makes for a good story.

## Credit, Reference, and Related Reading

1. [Wikipedia: Dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming)

2. [Erik Demaine, *MIT Introduction to Algorithms*, Lecture 19: dynamic programming I: fibonacci, shortest paths ](http://video.mit.edu/watch/introduction-to-algorithms-lecture-19-dynamic-programming-i-fibonacci-shortest-paths-14225/)

3. [Erik Demaine, *MIT Introduction to Algorithms*, Lecture 20: dynamic programming II: text justification, blackjack ](http://video.mit.edu/watch/introduction-to-algorithms-lecture-19-dynamic-programming-i-fibonacci-shortest-paths-14225/)

4. [Erik Demaine, *MIT Introduction to Algorithms*, Lecture 21: dynamic programming III: parenthesization, edit distance, knapsack ](http://video.mit.edu/watch/introduction-to-algorithms-lecture-21-dynamic-programming-iii-parenthesization-edit-distance-k-14227/)

5. [Wikipedia: Fibonacci number](https://en.wikipedia.org/wiki/Dynamic_programming)

6. [Wikipedia: Optimal substructure](https://en.wikipedia.org/wiki/Optimal_substructure)

7. Northeastern University, [Dynamic Programming Solution to the Coin Changing Problem](http://www.ccs.neu.edu/home/jaa/CS7800.12F/Information/Handouts/dyn_prog.pdf)

8. [Coins](https://github.com/nikovacevic/algorithms1/blob/master/coins/coins.go) is my Go package with full implementation.

9. [Wikipedia: Mathematical induction](https://en.wikipedia.org/wiki/Mathematical_induction)

10. [Wikipedia: Optimal substructure ## problems with optimal substructure](https://en.wikipedia.org/wiki/Optimal_substructure#Problems_with_optimal_substructure)

11. [Wikipedia: Optimal substructure ## problems without optimal substructure](https://en.wikipedia.org/wiki/Optimal_substructure#Problems_without_optimal_substructure)

[2016-11-04-dp-01]: /images/2016-11-04-dp-01.jpg
[2016-11-04-dp-02]: /images/2016-11-04-dp-02.jpg
