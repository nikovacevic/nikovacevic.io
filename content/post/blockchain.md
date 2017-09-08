+++
date = "2017-09-08T09:13:32-06:00"
title = "Blockchain Basics"
tags = ["blockchain","cryptocurrency","cryptography","mathematics"]
+++

At the time of this writing, one {{< footref 1 "Bitcoin" >}} is worth 4269.99 USD. That price is up 1968.67 USD since last *month*. Four years ago today, Bitcoin was worth 100.52 USD, meaning the value has risen over 4000% in four years. In the same time period, the S&P 500 has risen from 1670.09 to 2434.19 USD, or 146%.

But what *is* a Bitcoin? Or maybe it's better to ask, how does Bitcoin work? To answer that question properly, we need to ask a more fundamental one:

![Blockchain][cover]

## What is a blockchain?

{{< footref 2 "Blockchain" >}} refers to a distributed data structure, composed of blocks that are chained together. Each block contains a list of records, a timestamp, and a reference to the single previous block in the chain. The content of each block is cryptographically hashed--that is, sent through a {{< footref 3 "hash function" >}} to yield a deterministic value that is appended to the block. These hash values serve as the chaining reference mechanism; that is, each block stores the hash value of the previous block, which is included in the data that gets hashed and stored on each block. As data is generated, blocks are created and hashed--often through a process called "mining"--then appended to the end of the chain.

Got all that? Good, there's a little more.

Every computer--or node--in the ecosystem keeps track of the entire blockchain history, back to the very first block. When a block is forged, everyone in the ecosystem is notified of this new block and is asked to add it to their chain. Hence, the blockchain is distributed--no single node defines the true state of affairs. Consensus is reached by the collective, not by a centralized authority. You should question the security properties of such a system, which we will briefly discuss soon.

<div style="background: rgba(0,0,0,0.05); border-radius: 2px; padding: 20px 26px; color: #555555; font-weight: 300; margin-bottom: 1em; max-width: 100%; overflow-x: scroll;">
  <h4>Hash functions</h4>
  <p>The elegance of the blockchain is difficult to capture in a physical analogy because of the wizard-like properties of cryptographic hash functions. If you're totally unfamiliar, I encourage you to read this (and perhaps much more) before moving on.</p>
  <p>In short, a hash function generates a deterministic, collision-resistant value, given some data. Changing even a single bit of the input data will radically change the output hash value. For example, here are the hash values for the inputs "blip" and "clip", using the popular SHA256 hash function:</p>
  <p><code>SHA256("blip") = 4EF2018109FF8A6508F97C0A7B000FDDDA264207C9B03A4666741803981EAB8A</code></p>
  <p><code>SHA256("clip") = 67905AD3CC2DD52B1F5F6A6D2814DE0396618B29B4238B9AF5207AEB69936E6D</code></p>
  <p>The randomness and collision-resistance of these functions make two procedures practically impossible: discovering some pattern of predictability the output hash value, and inventing two different sets of input data that generate the same output hash value. These properties are the basis for blockchain security.</p>
</div>

Let's bolster this fuzzy technical description with some intuition.

## Intuition



## Properties of a blockchain

## How can blockchains be used?

## Credit and Reference

1. {{< footnote 1 "Bitcoin - Wikipedia" "https://en.wikipedia.org/wiki/Bitcoin" >}}

1. {{< footnote 2 "Blockchain - Wikipedia" "https://en.wikipedia.org/wiki/Blockchain" >}}

1. {{< footnote 3 "Cryptographic hash function - Wikipedia" "https://en.wikipedia.org/wiki/Cryptographic_hash_function" >}}

1. {{< footnote _ "3Blue1Brown: Ever wonder how Cryptocurrencies work?" "https://www.youtube.com/watch?v=bBC-nXj3Ng4" >}}
<div class="iframe-container ic169">
  <iframe src="https://www.youtube.com/embed/bBC-nXj3Ng4" frameborder="0"></iframe>
</div>

[cover]: /images/blockchain/cover.jpg
[01]: /images/blockchain/01.jpg
