+++
date = "2016-11-05T14:48:40-06:00"
title = "Combinatorics"
tags = ["combinatorics", "statistics", "analysis"]
+++

One of the most important skills a software engineer develops is accurately analyzing and minimizing the time and space complexity of the code they write, lest they contribute to the growing heap of [technical debt](https://en.wikipedia.org/wiki/Technical_debt) <sup>1</sup>.  That sounds complex, but amounts to counting---counting the complex, manifold outcomes of random and deterministic systems, alike---but counting, nevertheless.  Luckily, there is a fancy name for counting and related fields of study: **combinatorics**.

# Applications

## Bit and byte manipulation

**What is the maximum value of a 4-byte unsigned integer? signed?**

One bit represents a value in {0, 1}. Per bit, there are two options, so n bits can represent 2<sup>n</sup> possible values.  One byte is defined as a block of 8 bits (with 2<sup>8</sup> = 256 possible values).  We can therefore substitute 8n for n to yield the number of possible values per n bytes: 2<sup>8n</sup>.

(2<sup>8n</sup>)(n=4) = 2<sup>8*4</sup> = 2<sup>32</sup> = 4294967296 possible values

For an unsigned integer, we can therefore have values in [0, 4294967295]

For a signed integer, it's slightly more complicated because of [two's complement](), where the left-most bit value represents -(2<sup>n</sup>), rather than +(2<sup>n</sup>).  We can therefore have values in [-(2<sup>n</sup>), +(2<sup>n</sup>)-1], represented by [1000...0, 0111...1], which we can think of as [-(2<sup>n</sup>) + 0 + 0 + ... + 0, 0 + 2<sup>n-1</sup> + 2<sup>n-2</sup> + ... + 2<sup>0</sup>].



# Credit, Reference, and Related Reading

1. [Wikipedia: Technical debt](https://en.wikipedia.org/wiki/Technical_debt)
