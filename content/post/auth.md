---
title: "Authentication"
date: 2018-06-06T10:09:48-06:00
tags: ["authentication","cryptography","security"]
draft: false
---

Developers often refer to the family of ideas surrounding authentication and authorization as, simply, "auth"&mdash; and fair enough, as the two words seem similarly rooted, at least, if not interchangeable. However, their etymologies are actually not so identical, and the differences can explain which ideas the two concepts do and do not share.

![Three factors: knowledge, ownership, inherence][01]

**Authentication** defers its etymology to "authentic", which comes from the Greek word, *authentes*, meaning "the perpetrator of an act."{{< footref 1 "" >}}  So authentication can be thought of as answering the question, "who perpetrated this act?" or simply, "who did this?".  More specifically, authentication refers to "the act of confirming the truth of an attribute of a single piece of data claimed true by an entity."{{< footref 2 "" >}}

**Authorization** hails from the same root as "author": the Latin word, *auctor*, meaning "author or originator."{{< footref 3 "" >}}  Whereas authentication is concerned with confirming identity claims of some actor, authorization is concerned with granting privileges to an actor.  The difference between the two lies in the subtle distinction between determining who someone is and what they should be allowed to do.

> Whereas authentication is concerned with confirming identity claims, authorization is concerned with granting privileges.

Entire fields of study comprise each idea, but the fundamentals are relatively simple. We'll only flirt with authorization, spending more time on authentication.

The basic components of an authentication protocol are called **factors**, upon which something we'll call a **protocol** can be built.

## Factors

The term {{< footref 5 "two-factor, or multi-factor authentication" >}} is likely familiar to you&mdash;and if not, then it should be. In practice, it usually means requiring an additional step in an authentication process, like receiving and entering a code via text or, better, via a cryptographic one-time password generator (like [Google Authenticator](https://github.com/google/google-authenticator)). But the taxonomy of factors is more broad than password and text message. There are three categories of factors: **knowledge**, **ownership**, and **inherence**.

1. **Knowledge** factors describe tokens an entity knows and can share when prompted. These are extremely common in web-applications, including passwords, PINs, and security questions. In the physical world, a PIN to a garage is a great example.

1. **Ownership** factors describe tokens an entity can prove they own when prompted. The second of the two factors usually leverage an ownership factor, where the owned thing is the associated phone number or cryptographic authentication token. Back to the physical realm, the key to a door is the best example.

1. **Inherence** factors describe tokens an entity can prove to be or to do. In our home example, this might be a fingerprint or ocular scanner for entry, but a simpler physical example is a person's signature.

## Protocols

While the list of factors may strike you as obvious, there are interesting schematic problems to solve. For instance, is username and password (and hopefully another factor) the only way to initially authenticate someone? And after you authenticate with a web application, how does it remember you? Here, we'll cover a few examples of answer to each question; that is, initial and persistent protocols, respectively.

### Initial protocols

Everyone reading this has registered an account somewhere, requiring a username and password. The username can be public, but the password should be a secret because the only thing that differentiates you from a fraud is your knowledge factor. (This is why I use [LastPass](https://www.lastpass.com/) to generate and save random passwords that nobody&mdash;not even I&mdash;would simply guess.) When you authenticate for the first time, or after logging out, you are asked to prove you are who you claim to be by offering these data. But that's not the only way to initially authenticate.

<a name="oauth"></a>
#### OAuth

Anywhere you can authenticate yourself using your Google, Facebook, etc. account is almost certainly implementing a protocol called OAuth. (We will use "OAuth" to refer to OAuth 2.0, while acknowledging its predecessor, OAuth 1.0, which we will not discuss here.) OAuth "is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords."{{< footref 6 "" >}} In a sense, OAuth lets users offer their authenticated identity with one service as an ownership factor for authenticating with another.

> OAuth lets users offer their authenticated identity with one service as an ownership factor for authenticating with another.

![Log in with Google][05]

According to {{< footref 7 "RFC 6749" >}}, OAuth defines four roles:

- **Resource owner**  
An entity capable of granting access to a protected resource. When the resource owner is a person, it is referred to as an end-user.

- **Resource server**  
The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens.

- **Client**  
An application making protected resource requests on behalf of the resource owner and with its authorization.  The term "client" does not imply any particular implementation characteristics (e.g., whether the application executes on a server, a desktop, or other devices).

- **Authorization server**  
The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization.

First, an example:  Ron (resource owner and end-user) has a Hooli account. He's trying to register an account with a new application, Clynt (client). Instead of defining a username and password, Ron selects the option, "Use your Hooli account". Clynt requests authorization from Ron to obtain information from Hooli (authorization server); this could include access to Ron's email address, first name, and birthdate from a Hooli profile (resource server). Ron has to decide if Clynt should be allowed to obtain this data from Hooli or not. If he decides, "yes," then he authorizes the flow of information detailed below; that is the "Authorization Grant".

![Protocol flow][03]

##### Prologue

The resource owner is not yet a resource owner, per se, but simply a person who wants to do something that requires authenticated data. They choose  to use OAuth, by opting to "Log in with Hooli".

##### A&mdash;Authorization Request

The end-user selects the protocol, but the client makes the first move: it asks the end-user to authorize the use of their data. This process is usually mediated by the Authorization Server, as the protocol writers recommend.

In a browser-based version of our previous example, that could take the form of Clynt opening a new window in which Hooli asks Ron to grant or deny Clynt access to Ron's personal information.

##### B & C&mdash;Authorization Grant

At it's most basic, the authorization grant is proof that Ron said "yes" to Clynt's Hooli-mediated request. The grant is sent to Clynt, which forwards it along to Hooli's authorization server as proof that Hooli can rightly provide Clynt with a token (think "password") to access Ron's data.

According to the spec, "[a]n authorization grant is a credential representing the resource owner's authorization (to access its protected resources) used by the client to obtain an access token. This specification defines four grant types -- authorization code, implicit, resource owner password credentials, and client credentials".{{< footref 7 "" >}} Briefly, each are defined as follows.

###### Authorization Code

The process of Hooli mediating Clynt and Ron would use an authorization code. After Ron selects, "Yes, grant Clynt access to information," Hooli sends Ron back to Clynt's app with an authorization code. This process is the most common of the four. It provides security benefits, such as being able to authenticate the client, that you can read more about in [RFC 6749](https://tools.ietf.org/html/rfc6749#page-8).

###### Implicit

Implicit authorization grant protocol is similar to authorization code flow, but foregoes the extra security benefits (i.e. client authentication) in favor of fewer round-trips between parties in the interest of speed and ease-of-use. Specifically, instead of issuing a code to the client that can be exchanged for an access token, the access token is directly issued from authorization server to client.

###### Resource owner password credentials

Here's a simple one: Ron simply gives his username and password, which Clynt then trades with the authorization server for an access token. That's not a good idea for most applications, not least because the point is to *not* use password credential protocols. Ron shouldn't trust Clynt with his Hooli password because Clynt might be a malicious actor, or simply too incompetent to protect his password from other malicious actors, in which case he can't revoke access to his already-limited authorization of data. He'd have to change his password, at the very least, at which point it's already too late.

###### Client credentials

If the client and authorization server already have an arrangement (e.g. maybe the client *is* the resource owner, trying to gain an access token to it's own information stored in a vault protected by the authorization server) then the client can use its own credentials.

##### C & D & E&mdash;Access Token

The client sends along the authorization grant as a request for an access token (unless the authorization grant is implicit, in which case this step is moot because the grant *is* the token). Why does the client need a token if it already has a code? The code can't be used to gain access to anything, except a token; it is merely an ephemeral proof that the resource owner approves of access being granted. The client must exchange it for a token, which can be used to request protected data for an extended (but not infinite) amount of time. During this exchange, the client can be authenticated, providing the extra layer of security not afforded to the implicit authorization grant protocol.

This step sounds simple, but it is the crux of the protocol. Once an access token is granted, the grantee has access. Hence, the protocol authors highly encourage the client to authenticate with the authorization service before being granted a token, lest an attacker get a hold of a code and be able to gain unauthorized access. Although additional credentials *may* be required of a client alongside an access token in subsequent requests, no such measure is required by the protocol, so it can be assumed that the access token is the golden key.

##### E & F&mdash;Protected Resource

No longer do the resource owner nor the authorization server have to do any work. The resource server is instructed to provide authorized access to the protected resources requested by clients with valid access tokens. When now, when Ron is authenticated with Hooli and Clynt has been granted access, Clynt can go straight to a Hooli resource server for Ron's data.

Maybe you've already caught the twist: **OAuth is technically an authorization protocol, not an authentication protocol**. When you are asked to log into your Google account, you are authenticating; but after that, the applications interfacing via OAuth with your identity are really saying, "Ok, Google knows who you are, so we need to ask Google to authorize us to use some Google-controller resource of yours."

![Google][04]

It's a fine line, for sure&mdash;after all, there's a case to be made that before OAuth-ing, the application doesn't know your identity and afterwards it might. But the only thing OAuth can *truly* grant is authorization to the third-party service, perhaps to your full identity, and perhaps not.

##### Coda: OpenID

The *authentication* protocol that most closely resembles OAuth is called OpenID.

> The crucial difference is that in the OpenID authentication use case, the response from the identity provider is an assertion of identity; while in the OAuth authorization use case, the identity provider is also an API provider, and the response from the identity provider is an access token that may grant the application ongoing access to some of the identity provider's APIs, on the user's behalf.{{< footref 6 "" >}}

#### SQRL

### Persistent protocols

We've covered a few initial authentication sequences, but in practice we know that subsequent requests are simply granted until you log out. Why doesn't an application forget who you are the moment you leave the login page?  Without asking for your password for each subsequent request, it continues to serve you securely. In a way, it does ask for a password&mdash;but one that you own without necessarily knowing. The two most common of these are **session cookies** and **JSON web tokens**, or **JWTs**.

#### Cookies & Sessions

Cookies are ephemeral byte values (like randomly-generated passwords) that a stateless server associates with a user upon authentication, then sends to the front-end client (e.g. browser, Android app, etc.) to store securely and send along with subsequent requests to the server. The cookie will (should!) eventually expire (or be deleted by clearing your browser's cookies) at which point the user is required to authenticate again, retrieving a new, entirely different cookie.

To see cookies in action, open the developer console in your favorite browser. In Chrome, at least, the cookies are found under **Application / Storage / Cookies**, indexed by domain.

![Check out your cookies][02]

#### Tokens

Tokens, like JSON Web Tokens, are similar to cookies, but differ in some critical and interesting ways.

TODO

In a way, both cookies and tokens upend

## Credit, Reference, Related

1. {{< footnote 1 "Authentic | Definition of Authentic from Merriam-Webster" "https://www.merriam-webster.com/dictionary/authentic" >}}

1. {{< footnote 2 "Wikipedia: Authentication" "https://en.wikipedia.org/wiki/Authentication" >}}

1. {{< footnote 3 "Author | Definition of Author from Merriam-Webster" "https://www.merriam-webster.com/dictionary/author" >}}

1. {{< footnote 4 "Wikipedia: Authorization" "https://en.wikipedia.org/wiki/Authorization" >}}

1. {{< footnote 5 "Wikipedia: Multi-factor authentication" "https://en.wikipedia.org/wiki/Multi-factor_authentication" >}}

1. {{< footnote 6 "Wikipedia: OAuth" "https://en.wikipedia.org/wiki/OAuth" >}}

1. {{< footnote 7 "RFC 6749 - The OAuth 2.0 Authorization Framework" "https://tools.ietf.org/html/rfc6749" >}}

[01]: /images/auth/cover.jpg
[02]: /images/auth/cookies.png
[03]: /images/auth/protocol-flow.png
[04]: /images/auth/google.jpg
[05]: /images/auth/log-in-with-google.png
