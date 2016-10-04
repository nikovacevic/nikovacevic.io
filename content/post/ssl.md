+++
date = "2016-10-03T16:21:41-06:00"
title = "Transport Layer Security"
tags = ["TLS", "SSL", "security", "networking", "certificates", "cryptography"]
+++

Maybe you've noticed it---that green padlock in your browser's address bar.

![HTTPS][2016-10-03-ssl-1]

Users of online banking, e-commerce, and private chat take comfort in HTTPS's promise of a secure connection.  Without it, few would likely risk sharing their credit card numbers and sensitive messages.  However, so few trusting users are likely to understand the mechanics and specifics of that icon's promise.

How does it work?  What does it guarantee?  What *can* it guarantee?  Are users vulnerable, in spite of using it?

*What is it?*

Before we get to these questions, we must address the purpose of security.

# Why do we need security?

In the most simple terms, information security refers to the protection of information from malicious use.  Wikipedia elaborates:

> Information security, sometimes shortened to InfoSec, is the practice of defending information from unauthorized access, use, disclosure, disruption, modification, inspection, recording or destruction.<sup>[1]</sup>

Protecting against malicious intent is a broad field, but we will choose to focus on three essential features:

- **Confidentiality** refers to the ability to send information without an eavesdropper intercepting and comprehending it. Without confidentiality, Eve the eavesdropper could intercept to your latest Amazon purchase, extract your credit card number, and use it without your knowledge or consent.

- **Authentication** refers to the ability to guarantee the identity of an actor.  Without authenitcation, Eve impersonate you by placing and order with Amazon on your behalf without your knowledge or consent.

- **Integrity** refers to the ability to guarantee the content of a message is not altered between the moment it is sent and the moment it is received by the intended target.  Without integrity, Eve could alter your most recent Amazon order, changing the shipping address to hers, without your knowledge or consent.

The triple of confidentiality, authentication, and integrity guarantees that a message from an authentic sender will remain intact as it is privately transmitted to the proper destination.

Because we are interested in the open Internet, we must assume that an eavesdropper will be able to intercept messages; therefore, it's reasonable to substitute **encryption**---the obfuscation of information from all but the intended parties---for **confidentiality**, as they are one in the same in this context.

It is worth noting, then, that this concept of security is not necessarily a complete one! For instance, a system that guarantees confidentiality, authentication, and integrity may still allow an eavesdropper to know that some communication between two identifiable parties occurred.  If the fact that you contacted Amazon at all is enough to get you in trouble, our security concept will not help you.

As High Performance Browser Networking (HPBN) states,

> When SSL is used correctly, a third-party observer can only infer the connection endpoints, type of encryption, as well as the frequency and an approximate amount of data sent, but cannot read or modify any of the actual data.<sup>[3]</sup>

With that security concept in mind, we can address the next most pressing issue: *what is protecting us from this cruel and elaborate world?*

# Transport Layer Security!

Transport Layer Security---also known as **TLS** or **SSL**---is the cryptographic protocol that provides **confidentiality**, **authenticity**, and **integrity** for Internet communication.  Whereas HTTP (Hypertext Transfer Protocol) establishes the procedure for sharing hypertext documents across the Internet, TSL (or SSL) establishes the procedure for securely communicating over a computer network, e.g. the Internet.

TLS communication occurs by transmission of records using [symmetric encryption](https://en.wikipedia.org/wiki/Symmetric-key_algorithm)<sup>[6]</sup>, which relies on a shared secret key, known exclusively by the two communicating parties (henceforth the client and server, for our purposes).  Before we cover that, how do the client and server agree on a shared secret key?  In TLS, it's called the **handshake**.

## Interlude:  Public-key cryptography

For its handshake protocol, TLS employs [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography), a marvel of modern mathematics.  You should know that public-key cryptography relies on a key pair---one public, one private---to communicate securely.  **Public keys**, which are used to encrypt information, must be published openly; conversely, **private keys**, which are used to decrypt encryptions, must be kept secret.  Think of public keys as pad locks and private keys as the combination to unlock them.  Anyone can lock a message with your pad lock, but only you can open it!

## The Handshake

Prior to the TLS handshake, the client and server establish a TCP connection with a [TCP handshake](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment).  Then, the TLS handshake begins with a simple hello over the fresh TCP connection:

![TLS Handshake][2016-10-03-ssl-2]
*Image credit to [HPBN](https://hpbn.co/transport-layer-security-tls/) <sup>[3]</sup>*

1. **Client Hello** (Client to Server) specifies the TLS version and the list of cipher suites the client supports, ordered by preference (generally, strongest first).  *There have been TLS attacks targeting the list of cipher suites, attempting to downgrade to breakable ciphers <sup>[8]</sup>*

2. **Server Hello** (Server to Client) specifies a cipher suite from the client's list, defines a session ID, and provides the server's SSL certificate.  *We will cover SSL certificates in the next section!  For now, just imagine a fancy piece of paper with a gold star and a big, random-looking byte string.*

3. **Client-side Authentication** (Client) verifies the SSL certificate provided by the server. The certificate assures the client that the server's identity is authentic, which can be guaranteed by the [Certification Authority, or CA](https://en.wikipedia.org/wiki/Public-key_cryptography#Certification_authority).  This step protects against establishing a shared key with a malicious server acting as a [man-in-the-middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), pretending to be the intended server. The SSL certificate also includes the server's **public key**.

4. **Secret exchange** (Client to Server) requires the client to use the server's public key to encrypt a random secret, *K<sub>pm</sub>*, sometimes known as the pre-master key. We'll refer to the encryption of *K<sub>pm</sub>* under the server's public key as *E<sub>s</sub>(K<sub>pm</sub>)*. The client sends *E<sub>s</sub>(K<sub>pm</sub>)* to the server, which decrypts the secret with its **private key**.  Recall that decrypting *E<sub>s</sub>(K<sub>pm</sub>)* requires the server's private key, which only the server knows!

5. **Shared key generation** (Client and Server) is made possible because the client and server share exclusive knowledge of *K<sub>pm</sub>*.  Independently, the client and server each compute a shared symmetric key, *K<sub>s</sub>*, using *K<sub>pm</sub>*.

After step 3, the server might request a client SSL certificate, which operates the same way that the server's SSL certificate does, allowing for reciprocal identity validation.  [IBM's overview of the TLS protocol](http://www.ibm.com/support/knowledgecenter/SSFKSJ_7.1.0/com.ibm.mq.doc/sy10660_.htm) steps through that process.

*Please note that this is an extremely brief and incomplete overview of public-key cryptography, which boasts many fascinating nuances beyond this scope.*

## The Tunnel

At this point, the client and server share a few things:

- an open TCP connection
- a secret key, *K<sub>s</sub>*
- an agreed-upon cipher suite

Using the **TLS Record protocol**, client and server can communicate securely!  The sender uses the cipher suite and *K<sub>s</sub>* to encrypt and sign packets (e.g. using [AES block cipher](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) to encrypt and [HMAC](https://en.wikipedia.org/wiki/Hash-based_message_authentication_code) to sign), then uses the TCP connection to delivers the packets.  The receiver decrypts and verifies the packets using the *K<sub>s</sub>*.  Receiver may then become sender, and vice-a-versa, completing a round-trip flow of **confidential** and **authentic** information with guaranteed **integrity**.

The aforementioned TLS Record protocol defines the organization of the following information within each packet:

- Content type (e.g. handshake, alert, data)
- Payload, which is encrypted
- MAC, or signature

![TLS Record][2016-10-03-ssl-3]
*Image credit to [HPBN](https://hpbn.co/transport-layer-security-tls/) <sup>[3]</sup>*

# TLS/SSL in Practice

Now that the general process of TLS is clear, we can discuss how to go about using it in practice from both the client perspective and the server perspective.

## Client-side: you, the user

As complicated a topic as TLS can be, this one is simple.  In fact, as a user, there really isn't much for you to do besides making sure that the services you're using are serving their content over HTTPS.  If you're trying to access a website over HTTPS, but the connection is insecure, a good web browser will stop you right there.  Google Chrome, Firefox, and Safari all do just that.

However, that's not quite the end of the story.  There have been tragic instances of [spoofing security certificates](https://www.cnet.com/news/flame-virus-spread-through-rogue-microsoft-security-certificates/), which undermines the entire protocol.  Furthermore, some folks have been fooled into securely connecting to servers that *look* like banks, government services, etc., but are not!  Rather, they obtain their own SSL certificates and hope that you don't notice who owns the certificate.  Oh, what a brutal world!

To check who owns the certificate, click that little green lock and find out!  You can also go to [DigiCert's help page](https://www.digicert.com/help/), which provides a neat tool.  Try typing in "nikovacevic.io" and see what happens.

![Check your SSL certificates][2016-10-03-ssl-4]

## Server-side: you, the engineer

Luckily for you, the engineer, the process is fairly simple as well.  You need to obtain a certificate and serve it, upon a client's request of an SSL connection.

We'll avoid the how-to aspect of actually serving the certificate, which your server (e.g. nginx) should handle, but it's common to include such information in a server's config file.  Mine, for instance, looks like this:

```
# SSL Certificates
ssl_certificate     /etc/letsencrypt/live/nikovacevic.io/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/nikovacevic.io/privkey.pem;
```

You'll notice the format here looks familiar: one public and one private.  So, how do you, the engineer, obtain one?

## SSL Certificates

Depending on your needs, you may need one of a few [types of certificates](https://en.wikipedia.org/wiki/Public_key_certificate#Validation_levels):

- **Domain validation (DV)** guarantees that the server has the right to act on behalf of the given domain.  This is the minimum necessary guarantee.
- **Organization validation (OV)** guarantees domain rights and that the organization exists.
- **Extended validation (EV)** guarantees domain rights, organization existence, and requires the owner to "persuade the certificate provider of its [the owner's] legal identity, including manual verification checks by a human" <sup>[13]</sup>

There are many Certificate Authorities from which to obtain an SSL cert; most of them will do a fine job.  For my own purposes with this domain (DV), I have chosen [Let's Encrypt](https://letsencrypt.org/) because, as they say, it's free, automated, and open!

![Let's Encrypt][2016-10-03-ssl-5]

Let's Encrypt makes the process to simple that there is simply no excuse to serve or consume content over regular, old HTTP any more.

# You might be wondering

## Why is "SSL" an abbreviation for Transport Layer Security?

TLS has a predecessor, Secure Sockets Layer.  The original SSL protocols were developed by Netscape in the mid-1990s.  Although TLS 1.0 was released in 1999, effectively spelling the end for the original SSL protocols, SSL 3.0 was not deprecated until 2015.

## Does TLS only protect HTTPS communication?

It does not! It was defined to abstractly protect an application-layer transport protocol.  TCP, which is the the Internet's transport protocol, is only one such example.  HPBN relates another:

> TLS was designed to operate on top of a reliable transport protocol such as TCP. However, it has also been adapted to run over datagram protocols such as UDP. The Datagram Transport Layer Security (DTLS) protocol, defined in RFC 6347, is based on the TLS protocol and is able to provide similar security guarantees while preserving the datagram delivery model.<sup>[3]</sup>

# Credit, Reference, and Related Reading

1. [Wikipedia: Information security](https://en.wikipedia.org/wiki/Information_security)

2. [Wikipedia: Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security)

3. [High Performance Browser Networking: Transport Layer Security](https://hpbn.co/transport-layer-security-tls/) from O'Reilly provides ____.

4. [The Transport Layer Security (TLS) Protocol: Version 1.2](https://tools.ietf.org/html/rfc5246) is the protocol, itself!

5. [Let's Encrypt](https://letsencrypt.org/) is a wonderful resource for obtaining free SSL certificates.

5. [Wikipedia: Symmetric-key Algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm)

6. [Wikipedia: Transmission Control Protocol](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)

7. [IBM: An overview of the SSL or TLS handshake](http://www.ibm.com/support/knowledgecenter/SSFKSJ_7.1.0/com.ibm.mq.doc/sy10660_.htm)

8. [OpenSSL TLS Export Cipher Suite Downgrade (CVE-2015-0204; CVE-2015-1637)](https://www.checkpoint.com/defense/advisories/public/2015/cpai-2015-0223.html)

9. [IBM: How certificate chains work](http://www.ibm.com/support/knowledgecenter/en/SSFKSJ_7.1.0/com.ibm.mq.doc/sy10600_.htm)

10. [Wikipedia: Man-in-the-middle attack](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)

11. [SSL.com: The SSL/TLS Handshake: an Overview](https://www.ssl.com/article/ssl-tls-handshake-overview/)

12. [IBM: Secure Sockets Layer (SSL) and Transport Layer Security (TLS) concepts](http://www.ibm.com/support/knowledgecenter/en/SSFKSJ_7.1.0/com.ibm.mq.doc/sy10640_.htm)

13. [Wikipdeai: Public key certificate](https://en.wikipedia.org/wiki/Public_key_certificate)

[2016-10-03-ssl-1]: /images/2016-10-03-ssl-1.png
[2016-10-03-ssl-2]: /images/2016-10-03-ssl-2.svg
[2016-10-03-ssl-3]: /images/2016-10-03-ssl-3.svg
[2016-10-03-ssl-4]: /images/2016-10-03-ssl-4.png
[2016-10-03-ssl-5]: /images/2016-10-03-ssl-5.png
