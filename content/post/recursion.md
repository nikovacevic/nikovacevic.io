---
title: "Recursion"
date: 2018-11-13T11:57:00-06:00
tags: ["functional programming","Javascript","Scala"]
draft: false
---
A recursive process is one that refers to itself in its own definition{{< footref 1 "" >}}. If you're looking for some intuition, [search for recursion on Google](https://www.google.com/search?q=recursion) and try the _Did you mean [recursion](https://www.google.com/search?q=recursion)_ link. Clearer yet, consider this function:

```scala
def endless: Nothing = endless
```

You don't need to understand lambda calculus{{< footref 2 "" >}} or evaluation-by-substitution to understand that a call to `endless` will never terminate. The first call makes a second call, which makes a third call, ad infinitum. But of course all other recursive functions are more complex than this one, so we must ask the question:  how _does_ a recursive function evaluate?

### Substitution

Without discussing details like compiler optimizations, we can think of code evaluation in a functional paradigm as the substitution of a statement with its definition. Substitution only works for so-called "purely functional" code, where any two identical expressions always evaluate to the same result. Many examples of non-functional code would fail such an equivalence test. For example, consider constructions involving the current date time, or _any_ two invocations of the same constructor, which look identical but create distinct, distinguishable instances of the same class.

As an example to demonstrate substitution-based evaluation, we will consider two canonical algorithms: factorial and greatest common divisor. Here are naïve definitions:

```scala
// factorial computes n! = n * (n-1) * (n-2) * ... * 1
def factorial(n: Int): Long =
  if (n == 1) 1
  else n * factorial(n - 1)
```

```scala
// gcd computes the greatest integer that divides both a and b, using the
// Euclidean Algorithm, which works on the basis that:
// a == c (mod b) => gcd(a, b) == gcd(b, c)
def gcd(a: Int, b: Int): Int =
  if (b == 0) a
  else gcd(b, a % b)
```

These definitions are considered to be functional, in that they do not involve state mutations (i.e. no variables, no constructors for complex objects that track state). As such, we can apply a substitution model of expression evaluation, replacing each function call to `factorial` or `gcd` with the given definitions.

The idea seems obvious, but it is powerful because it complies with mathematical intuition. After all, there is no "external" or "mutable" state lurking in a mathematical proof, capable of derailing the process; there is only a sequence of claims, one following the next by virtue of a legal substitution. In the context of functional programming, a legal substitution will generally mean substituting a function call with its definition, replacing parameter names with the corresponding values provided in the call.

As an example, let's first use substitution to evaluate a simple instance of `factorial`:

```scala
factorial(3)
```
```scala
if (3 == 1) 1 else 3 * factorial(3 - 1)
```
```scala
3 * factorial(3 - 1)
```
```scala
3 * factorial(2)
```
```scala
3 * (if (2 == 1) 1 else 2 * factorial(2 - 1))
```
```scala
3 * (2 * factorial(2 - 1))
```
```scala
3 * (2 * factorial(1))
```
```scala
3 * (2 * (if (1 == 1) 1 else 1 * factorial(1 - 1)))
```
```scala
3 * (2 * (1))
```
```scala
3 * (2)
```
```scala
6
```

Take note of the shape of this substitutive process, how the expression grows and shrinks with respect to the parameter, `n`. Contrast it with the example of a simple `gcd` call:

```scala
gcd(9, 6)
```
```scala
if (6 == 0) 9 else gcd(6, 9 % 6)
```
```scala
gcd(6, 9 % 6)
```
```scala
gcd(6, 3)
```
```scala
if (3 == 0) 6 else gcd(3, 6 % 3)
```
```scala
gcd(3, 6 % 3)
```
```scala
gcd(3, 0)
```
```scala
if (0 == 0) 3 else gcd(0, 3 % 0)
```
```scala
3
```

You will notice that the `factorial` expressions grows with `n`; that is, a new operation is appended with each recursive call, which does not collapse until the recursion completes and the multiplicative chain is rolled up, whereas the `gcd` expressions do not grow with respect to `a` and `b` because each recursive call simply replaces the previous call with different values. Thus, we can call `gcd` **tail-recursive**. And the fact that `factorial` is not tail recursive will quickly become a serious problem.

### Stack overflow

If you search for "tail recursion" on Google, you will likely see a post entitled _[algorithm - What is tail recursion?](https://stackoverflow.com/questions/33923/what-is-tail-recursion)_ on [StackOverflow](https://stackoverflow.com/). Fittingly, if you do not understand tail recursion, you are likely to cause an error called **stack overflow**.

First, we must first understand the basic idea of the call stack, which is the mechanism a process uses to manage constituent sub-processes. Think of the process as your program and each function call as a sub-process, no matter how shallowly- or deeply-nested. Consider this example:

```scala
def process = {
  println("process starts")
  sub1
  println("process ends")
}

def sub1 = {
  println("sub1 starts")
  sub2
  println("sub1 ends")
}

def sub2 = {
  println("sub2 starts")
  println("sub2 ends")
}
```
```scala
> process starts
> sub1 starts
> sub2 starts
> sub2 ends
> sub1 ends
> process ends
```

Think of the call stack as, literally, a stack, which is last-in-first-out (LIFO) data structure. As each process is pushed onto the stack, the stack grows. Only when a process returns a value does it get popped off the stack. The call stack has a static allocation of memory, so when it runs out the program will report a stack overflow error and crash.

Now, recall the evaluation of factorial. How many calls can get pushed onto the stack before it runs out of memory? That depends on the environment in which the code is running, but in general, the stack will overflow relatively quickly. Factorial is not a good example because its value grows with `n` at such a pace the stack _might_ survive long enough to first exhaust the maximum `Int` or `Long` value, but we can consider an example demonstrating how pernicious stack overflows can be.

```scala
// altSum computes the sum of -1 + 2 - 3 + 4 ... for n steps, starting at step 1
// e.g. altSum(4) = -1 + 2 - 3 + 4 = 2
def altSum(n: Long): Long = {
  if (n == 0) 0
  else {
    val sign = (if (n % 2 == 0) 1 else -1).toLong
    (n * sign) + altSum(n - 1)
  }
}
```

_Thanks to [Brilliant.org](https://brilliant.org/) for the {{< footref 4 "inspiration" >}} for this example!_

Of course, there are proofs that can describe the behavior of this function as `n` goes to infinity, but what if we want to poke around computationally, possibly taking some action at each iterative step? Let's give it a shot:

```scala
altSum(10)
> 5

altSum(11)
> -6

altSum(100)
> 50

altSum(101)
> -51

altSum(1000)
> 500

altSum(1001)
> -501

altSum(10000)
> java.lang.StackOverflowError
    at recursion.A$A11$A$A11.f1(sum.sc:54)
    at recursion.A$A11$A$A11.f1(sum.sc:54)
    at recursion.A$A11$A$A11.f1(sum.sc:54)
    at recursion.A$A11$A$A11.f1(sum.sc:54)
    ...
```

Pretty quickly, at that last example, we get a `java.lang.StackOverflowError` error, even though we suspect that the answer is `5000`, which doesn't even come close to the maximum `Int` value of `2147483647`, not to mention the maximum `Long` value of `9223372036854775807`.

Can we fix `altSum` to avoid stack overflows, pushing the results closer to the boundaries of these maximum values?

### Tail recursion

If the problem is a growing call stack, how can we restructure our code to exist in a bounded stack space? Ideally, the return value of the function should be a single recursive function call; in other words, the function needs to encapsulate and evaluate the dangling operations that would otherwise accrue. As we've already mentioned, this pattern is called **tail recursion**.

```scala
def altSum(n: Long): Long = {
  def asAcc(n: Long, acc: Long): Long = {
    if (n == 0) acc
    else {
      val sign = (if (n % 2 == 0) 1 else -1).toLong
      asAcc(n - 1, acc + (n * sign))
    }
  }
  asAcc(n, 0)
}
```

```scala
altSum(10000)
> 5000

altSum(10001)
> -5001

altSum(10000000)
> 5000000

altSum(10000001)
> -5000001

altSum(1000000000)
> 500000000

altSum(1000000001)
> -500000001
```

That's better! To see this in action, and to make _extremely_ clear why it works, let's step through a smaller call, as we did for `factorial` and `gcd`:

```scala
altSum(3)
```
```scala
asAcc(3, 0)
```
```scala
if (3 == 0) 0
else {
  val sign = (if (3 % 2 == 0) 1 else -1).toLong
  asAcc(3 - 1, 0 + (3 * sign))
}
```
```scala
val sign = (if (3 % 2 == 0) 1 else -1).toLong
asAcc(3 - 1, 0 + (3 * sign))
```
```scala
val sign = -1
asAcc(3 - 1, 0 + (3 * sign))
```
```scala
asAcc(3 - 1, 0 + (3 * -1))
```
```scala
asAcc(2, -3)
```

At this point, we've only made it through one complete cycle, but that's all we need to see that **the compounding operation must be evaluated for it to be passed as a parameter, known as the accumulator, into the recursive call**. That way, the stack flushes after a relatively small number of operations. It's subtle, but we can be convinced that this new version of the function will operate in bounded stack space.

#### Access to acc

Notice that there's a side-effect, which is really the primary effect:  **we have access to the accumulator** within the function. What else can we do with it? In this case, we can see that the function oscillates and diverges, but we can also [show via algebraic manipulation](#alternating-sum) that the infinite sum evaluates to -1/4. Does having access to `acc` give us the ability to glean any insights about how the -1/4 could make intuitive sense?

For instance, we can compute a running average of the accumulating `sum` by turning `acc` into a tuple that records both at each iteration.

```scala
def altSum(n: Long): (Long, Double) = {
  def asAcc(i: Long, n: Long, acc: (Long, Double)): (Long, Double) = {
    if (i > n) acc
    else {
      val sign = (if (i % 2 == 0) 1 else -1).toLong
      val sum = acc._1 + (i * sign)
      val avg = ((acc._2 * (i-1)) + sum) / i
      asAcc(i + 1, n, (sum, avg))
    }
  }
  asAcc(1, n, (0, 0))
}
```

```scala
altSum(1)
> (-1,-1.0)

altSum(2)
> (1,0.0)

altSum(3)
> (-2,-0.6666666666666666)

altSum(4)
> (2,0.0)

altSum(100)
> (50,-2.842170943040401E-16)

altSum(101)
> (-51,-0.5049504950495052)

altSum(1000)
> (500,5.684341886080802E-17)

altSum(1001)
> (-501,-0.5004995004995004)

altSum(1000000)
> (500000,-1.0419171303510665E-14)

altSum(1000001)
> (-500001,-0.5000004999995105)
```

Thanks to our accumulator's running average, we are able to gain an important insight. The running average oscillates between 0 and -1/2, lending some supporting intuition to the algebraic outcome of -1/4.

### To forget loops...

We've now seen a few recursive examples that could have been represented with loops. Can we convert _any_ loop into a recursive call? There are certainly academic arguments, like the {{< footref 6 "Church-Turing thesis" >}}, but let's instead attempt to build a simple implementation. For instance, what is a functional way of looking at a simple `for` loop in Javascript that increments and logs a counter?

```js
for (x = 1; x <= 3; x++) {
  console.log(x)
  console.log("hello")
  console.log('hello')
}
```
```js
> 1
> 2
> 3
```

Functional design preaches to **parameterize everything**---after all, if we can't mutate state, then the only way to generate new values is to feed what we have into a function as parameters, then return the new value(s). Here, the parameter `x` is obvious. But what else can we pull out? How about `console.log(x)`? Most functional languages will support functions as first-class citizens, meaning a function is a value that can be passed along, so we can abstract everything that happens in the for loop closure as a parameter called `action`.

If we're going to parameterize functions, we must also capture the for loop's condition and final expression. Otherwise, without a breaking condition and a way to get there, our recursive function will run forever. We can call those `condition` and `next`, respectively.

Putting the parts together, we can mimic {{< footref 7 "Javascript, in which a for loop" >}} is evaulated thusly:

1. initialization (`params`)
2. condition (`condition`)
3. statement (`action`)
4. final expression (`next`)

```js
const loop = (params, condition, action, next) => {
  if (condition(params)) {
    action(params);
    return loop(next(params), condition, action, next);
  }
};

const params = { x: 1 };
const condition = (params) => params.x <= 3;
const action = (params) => console.log(params.x);
const next = (params) => ({ x: params.x + 1 });

loop(params, condition, action, next);
```
```js
> 1
> 2
> 3
```

### ...or not to forget loops

Just because we _can_ replace loops with recursion whenever we like, doesn't mean we should. In fact, there's a sense in which all of our anti-loop efforts are just a delusion, given that as our code gets compiled and run it may be rewritten into equivalent but non-recursive forms. For an example of when loops may be more beneficial to use, consider Scala's own implementation of [`foldLeft`](https://github.com/scala/scala/blob/d96b8eb48e83d400c03663a05b66ec218ead9c14/src/library/scala/collection/LinearSeqOptimized.scala#L118) and [`foldRight`](https://github.com/scala/scala/blob/d96b8eb48e83d400c03663a05b66ec218ead9c14/src/library/scala/collection/LinearSeqOptimized.scala#L129).

_This example was brought to my attention by Matt Malone on his blog,_ {{< footref 8 "Old Fashioned Software" >}}_._

```Scala
def foldLeft[B](z: B)(@deprecatedName('f) op: (B, A) => B): B = {
  var acc = z
  var these = this
  while (!these.isEmpty) {
    acc = op(acc, these.head)
    these = these.tail
  }
  acc
}
```

```Scala
def foldRight[B](z: B)(@deprecatedName('f) op: (A, B) => B): B =
  if (this.isEmpty) z
  else op(head, tail.foldRight(z)(op))
```

At first glance, the functional programmer gasps! (Oh, the horror of `var`.) But the pragmatic programmer thinks, tests, and determines (like Matt Malone) that for very long lists, `foldLeft` is likely to succeed while `foldRight` is likely to cause a stack overflow. In fact, the best way to `foldRight` safely is to `reverse.foldLeft`!

The bottom line is that as often as recursion compact, elegant, and exciting, it is difficult, inefficient, and impractical. Knowing why (or, better, knowing how and when to use it) is an essential tool for any functional programmer.

### Proofs

#### Euclid's algorithm for greatest common divisor

See [WolframMathWorld: Euclidean Algorithm](http://mathworld.wolfram.com/EuclideanAlgorithm.html) for more{{< footref 9 "" >}}.

```
a == c (mod b)
(a - c) == 0 (mod b)
b | (a - c)
exists y : by == a - c
c == a - by
if d|c, then d|a and d|b
d == gcd(a, b) == gcd(b, c)
```
```
gcd(10, 4)
10 = 2 (mod 4)
(10 - 2) = 0 (mod 4)
4y = (10 - 2)
2 = (10 - 4y)
=> gcd(10, 4) = gcd(4, 2)
```
```
gcd(4, 10 % 4 = 2)
gcd(2, 4 % 2 = 0)
> 2
```

#### Alternating sum

See the [original Brilliant.org problem](https://brilliant.org/practice/sequences-and-series-level-1-challenges/?problem=one-for-you-two-for-me-three-for-you) for several explanations{{< footref 4 "" >}}.

```
S = - 1 + 2 - 3 + 4 ...

define T as:
T = + 1 - 1 + 1 - 1 ...

T - 1     = - 1 + 1 - 1 + 1 ...

T + T - 1 = + 1 - 1 + 1 - 1 ...
            - 1 + 1 - 1 + 1 ...
          = 0

T + T - 1 = 0
2T        = 1
T         = 1/2

S + T = - 1 + 2 - 3 + 4 ...
        + 1 - 1 + 1 - 1 ...
      =   0 + 1 - 2 + 3 ...
      = - S

2S    = -T
      = -1/2

S = -1/4
```

### Credit, Reference, and Related Reading

1. {{< footnote 1 "Recursion (computer science) - Wikipedia" "https://en.wikipedia.org/wiki/Recursion_(computer_science)" >}}

1. {{< footnote 2 "Lambda calculus - Wikipedia" "https://en.wikipedia.org/wiki/Lambda_calculus" >}}

1. {{< footnote 3 "Arithmetic Series -- from Wolfram MathWorld" "http://mathworld.wolfram.com/ArithmeticSeries.html" >}}

1. {{< footnote 4 "Sequences and Series: Level 1 Challenges | Brilliant" "https://brilliant.org/practice/sequences-and-series-level-1-challenges/?problem=one-for-you-two-for-me-three-for-you" >}}

1. {{< footnote 5 "Can every recursion be turned into iteration - Stack Overflow" "https://stackoverflow.com/questions/931762/can-every-recursion-be-converted-into-iteration/933979#933979" >}}

1. {{< footnote 6 "Church-Turing thesis - Wikipedia" "https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis" >}}

1. {{< footnote 7 "for - Javascript | MDN" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for#Syntax" >}}

1. {{< footnote 8 "Scala Code Review: foldLeft and foldRight « Matt Malone's Old-Fashioned Software Development Blog" "https://oldfashionedsoftware.com/2009/07/10/scala-code-review-foldleft-and-foldright/" >}}

1. {{< footnote 9 "Euclidean Algorithm --- from WolframMathWorld" "http://mathworld.wolfram.com/EuclideanAlgorithm.html" >}}
