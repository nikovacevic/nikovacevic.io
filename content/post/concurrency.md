---
title: "Concurrency"
date: 2019-04-24T10:38:00-06:00
tags: ["concurrency","Go","Scala"]
draft: true
---

Most lemon meringue pie recipes can be decomposed into five tasks:
1. make the crust
2. make the filling
3. make the meringue
4. spread the filling in the crust and the meringue over the filling
5. bake the pie

Obviously, there comes a point in the process (step 4) where each of the three previous tasks must be complete in order to move on. Prior to that step, though, it doesn't matter so much. Of course, for the
best results a recipe will have an opinion on the timing, but the point is that you _could_ do steps 1 through 3 in any order without creating a contradiction the way that inverting steps 4 and 5 would. If you had two friends helping, steps 1 through 3 could even happen simultaneously. (Imagine trying that with steps 4 and 5.) Such a topology is said to be concurrent because tasks can be done at the same time.

## Concurrency patterns

Programs, processes, threads (stack, heap)

Examples:
1. Prime sieve
2. Blur filter

### Go

Go routines, channels

1. Prime sieve
2. Blur filter

### Scala

Execution context, threads

1. Prime sieve
2. Blur filter

## Analyzing concurrent programs

1. Prime sieve
2. Blur filter
