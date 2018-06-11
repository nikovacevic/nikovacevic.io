---
date: "2017-09-08T09:13:32-06:00"
title: "Blockchain Basics"
tags: ["blockchain","cryptography","mathematics"]
draft: false
---

At the time of this writing, one {{< footref 1 "Bitcoin" >}} is worth 4269.99 USD. That price is up 1968.67 USD since last *month*. Four years ago today, Bitcoin was worth 100.52 USD, meaning the value has risen over 4000% in four years. In the same time period, the S&P 500 has risen from 1670.09 to 2434.19 USD, or 146%.

But what *is* a Bitcoin? Or maybe it's better to ask, how does Bitcoin work? To answer that question properly, we need to ask a more fundamental one:

![Blockchain][cover]

## What are blockchains?

{{< footref 2 "Blockchains" >}} are secure, decentralized data structures, composed of blocks that are chained together. Each block contains a list of records, a timestamp, and a reference to the single previous block in the chain. The content of each block is cryptographically hashed&mdash;that is, sent through a {{< footref 3 "hash function" >}} to yield a deterministic value that is appended to the block. These hash values serve as the chaining reference mechanism; that is, each block stores the hash value of the previous block, which is included in the data that gets hashed and stored on each block. As data is generated, blocks are created and hashed&mdash;often through a process called "mining"&mdash;then appended to the end of the chain.

Got all that? Good, there's a little more.

Every computer&mdash;or node&mdash;in the ecosystem keeps track of the entire blockchain history, back to the very first block. When a block is forged, everyone in the ecosystem is notified of this new block and is asked to add it to their chain. Hence, the blockchain is distributed&mdash;no single node defines the true state of affairs. Consensus is reached by the collective, not by a centralized authority. You should question the security properties of such a system, which we will briefly discuss soon.

<div style="background: rgba(0,0,0,0.05); border-radius: 2px; padding: 20px 26px; color: #555555; font-weight: 300; margin-bottom: 1em; max-width: 100%; overflow-x: scroll;">
  <h4><a href="#hash-functions" name="hash-functions">Cryptographic hash functions</a></h4>
  <p>The elegance of the blockchain is difficult to capture in a physical analogy because of the mathemagical properties of cryptographic hash functions. If you're totally unfamiliar, I encourage you to read this (and perhaps much more) before moving on.</p>
  <p>In short, a hash function generates a deterministic, collision-resistant value, given some data. Changing even a single bit of the input data will radically change the output hash value. For example, here are the hash values for the inputs "blip" and "clip", using the popular SHA256 hash function:</p>
  <p><code>SHA256("blip") = 4EF2018109FF8A6508F97C0A7B000FDDDA264207C9B03A4666741803981EAB8A</code></p>
  <p><code>SHA256("clip") = 67905AD3CC2DD52B1F5F6A6D2814DE0396618B29B4238B9AF5207AEB69936E6D</code></p>
  <p>Often, hash functions are called one-way functions because they are relatively quick to compute, given an input, but nearly impossible to reverse-engineer. That is, given a hash output value, the only way to find the input that generated it would be to guess by brute-force. For SHA256, specifically, there are <code>2<sup>256</sup></code> possible output values and inputs are padded to <code>64-bit</code> numbers. That means there are <code>2<sup>64</sup>-1</code> possible inputs to check. Even if you expect to find the number you're looking for halfway through the process (on average) that would require hashing <code>2<sup>63</sup></code> values, a task which would take an infeasible amount of time even for an incredibly powerful modern computer. That means that fraudulently crafting two inputs that generate the same output and fraudulently crafting an input to match a given output are practically impossible operations.</p>
  <p>These properties of cryptographic hash functions&mdash;unpredictability and collision-resistance&mdash;form the basis for <a href="#security">blockchain security</a>.</p>
</div>

Let's bolster this quick, technical description with some intuition.

## Anatomy of a block

Despite the non-physical, cryptographic qualities of blockchain, we can think of each block as both a key and lock. Adding a new block to the chain would equate to attaching the lock-side of the new block to the key-side of the last block in the chain.

![Anatomy of a block][02]

The lock side of the block (the four stacked rows on the right) is composed of at least a few pieces of data: the previous block's hash value, the data (often a list of records) that the blockchain is meant to store and protect, and the timestamp of the block's creation. In the case of Bitcoin and many other cryptocurrencies, it will also contain a {{< footref 4 "proof of work" >}}, which is a {{< footref 5 "nonce" >}}, or simply an integer that has been incremented a particular number of times in order to prove the computational work involved in mining the block. (We'll discuss what, exactly, that means in the <a href="#security">security</a> section below.)

The key side (in solid black) is the value generated by hashing the entire lock side.

While this analogy provides intuition about the structure of a blockchain, it fails to fully capture the most important property: data security and fraud-resistance. This property follows directly from the properties of {{< defref "hash-functions" "cryptographic hash functions" >}}, covered briefly above.

## Properties of a blockchain

Recalling our first definition, blockchains have two essential properties:

1. Decentralized
1. Secure

### Decentralization

Decentralization is a straight-forward idea: no single, authoritative entity decides the state of a blockchain. Rather, every participant owns and maintains their own copy, so the "true state" of the blockchain is decided by consensus. Consensus is decided by the length of the chain, giving preference to longer chains&mdash;equivalently, chains that represent more computational work. (We'll return to this idea in the <a href="#security">security</a> section.)

But why is the blockchain decentralized? Put simply, the entire point is to build a trustworthy structure without relying on a centralized, trusted third-party. For example, in the case of Bitcoin and other cryptocurrencies, blockchain gives individuals the ability to trust a transactional financial system without needing to trust a government or a bank. Therefore, all participants must own the state of the blockchain.

Decentralized ownership, however, does not imply integrity. *Trustworthy* consensus is afforded by the structural security properties.

<a name="security">
### Security
</a>

If everyone owns the blockchain, what's stopping someone from simply changing the data? In the case of Bitcoin, where the data is a ledger of transactions, couldn't someone change a few numbers and steal from a stranger? Well, let's try.

For any given block, I *could* change a number in the data. But changing even a single byte of the data will completely change the hash value of that block. Furthermore, changing the hash value of the current block will change the hash value embedded in the next block, causing a chain reaction through all subsequent blocks until the most recent one. Fraudulently changing data in a single block requires never-ending fraudulent re-hashing of every block that follows, which is obviously infeasible because is would require one to beat the entire decentralized community of owners and miners in a race to create blocks. This is where proof of work becomes important.

The rules of a proof of work-based blockchain dictate that the binary value of a block's hash must start with a given number of consecutive `0`s before the first `1` appears. Thanks to the properties of cryptographic hash functions, brute force is the only way to discover one of these special hash values; that is, if the value doesn't start with `N` consecutive `0`s, increment the nonce and try again, repeating the process until finding a valid hash value.

Just how tough would it be to find a hash value that started with, for example, twenty `0`s? The probability that any bit individual bit will be a `0` is `1` in `2`. Therefore, the probability that the first twenty consecutive bits of a random hash will be `0` is `1` in <code>2<sup>20</sup></code>, or `0.000000953674316`. On average, then, one could expect to have to compute `1048576` hashes in order to find such a number. The difficulty of this task rises exponentially with a linear increase in the number of consecutive `0`s required, so there is a simple way to make this task arbitrarily hard. Remember, also, that this task is required for each block! If someone were trying to defraud the system, they'd have to compute these millions of hashes for *every subsequent block*. That task is simply infeasible, unless the fraudulent party owns 50% or more of the total computing power working against them--the power of the distributed community.

As Grant from [3Blue1Brown](https://www.3blue1brown.com/) explains in {{< footref 6 "Ever wonder how Bitcoin (and other cryptocurrencies) actually work?" >}},

> If you use computational work as a basis for what to trust, you can make it so that fraudulent transactions and conflicting ledgers would require an infeasible amount of computation to bring about.

Without getting too deep down the mathematical rabbit-hole, that definition of security will suffice: the system is secure if creating and perpetuating fraudulent data is infeasible. Hopefully you're convinced of the security of this system, in spite of the brevity with which we've had to cover it here.

## How can blockchains be used?

[Entire books](https://www.amazon.com/Blockchain-Revolution-Technology-Changing-Business/dp/1101980133) have been written on the subject of blockchain applications, but I'd be remiss to get this far without mentioning a few:

### Banks and currency

The obvious application has already been mentioned: cryptocurrency, such as Bitcoin and Ethereum. By cutting out banks, cryptocurrencies promise trust without a trusted third-party and insulation from the tumult inherent in single-point-of-trust systems, such as traditional financial systems.

### Smart contracts

Artist Imogen Heap founded [Mycelia](http://myceliaformusic.org/2017/07/26/imogen-hbr-blockchain-help-musicians-make-money/), a blockchain-based project intended to use cryptocurrency and micro-payments to reinvent the music industry.

### Voting systems

In Estonia, the [entire government practically runs on blockchain](http://fortune.com/2017/04/27/estonia-digital-life-tech-startups/). One part of that system is identity and voting systems. Rather than deal with Social Security cards and paper proofs of identity in order to vote at centralized locations, Estonians receive a set of RSA keys for identification and vote from their computers.

In short, blockchains can *probably* disrupt any system that depends on a trusted third-party that acts as a middle-man, making profits on processing data in a predictable, well-defined, deterministic way.

## Credit and Reference

1. {{< footnote 1 "Bitcoin - Wikipedia" "https://en.wikipedia.org/wiki/Bitcoin" >}}

1. {{< footnote 2 "Blockchain - Wikipedia" "https://en.wikipedia.org/wiki/Blockchain" >}}

1. {{< footnote 3 "Cryptographic hash function - Wikipedia" "https://en.wikipedia.org/wiki/Cryptographic_hash_function" >}}

1. {{< footnote 4 "Proof-of-work system - Wikipedia" "https://en.wikipedia.org/wiki/Proof-of-work_system" >}}

1. {{< footnote 5 "Cryptographic nonce - Wikipedia" "https://en.wikipedia.org/wiki/Cryptographic_nonce" >}}

1. {{< footnote 6 "3Blue1Brown: Ever wonder how Bitcoin (and other cryptocurrencies) actually work?" "https://www.youtube.com/watch?v=bBC-nXj3Ng4" >}}
<div class="iframe-container ic169">
  <iframe src="https://www.youtube.com/embed/bBC-nXj3Ng4" frameborder="0"></iframe>
</div>

[cover]: /images/blockchain/cover.jpg
[01]: /images/blockchain/01.jpg
[02]: /images/blockchain/02.jpg
