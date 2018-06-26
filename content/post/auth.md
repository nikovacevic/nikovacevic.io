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

While the list of factors may strike you as obvious, there are interesting schematic problems to solve. For instance, is username and password (and hopefully another factor) the only way to initially authenticate someone? And after you authenticate with a web application, how does it remember you? Here, we'll cover a few examples&mdash;some common and some not-so-common&mdash;answering those questions.

We'll cover [username and password](#password) with [cookies](#cookies-sessions) and with [JWTs](#json-web-tokens), [OAuth](#oauth), and [SQRL](#sqrl).

### Password

Everyone reading this has registered an account somewhere, requiring a username and password. The username can be public, but the password should be a secret because the only asset that differentiates you from a fraud is your knowledge factor. (This is why I use [LastPass](https://www.lastpass.com/) to generate and save random passwords that nobody could reasonably guess.) When you authenticate for the first time, or after logging out, you are asked to prove you are who you claim to be by offering these data.

The username-and-password protocol is so simple, both schematically and cryptographically, that it feels crude, but it will provide context for more complicated protocols later on. We'll also get to answer some nuanced questions about persistence strategies that will foreshadow future ideas.

So, how does it work? We'll define a few actors:

-  **End-user**, or simply **user**, is the entity trying to be authenticated in order to gain access to a resource.

-  **Authentication server** is the entity that authenticates requests.

-  **Resources server** is the entity that requires authentication before providing access to a resource. In practice, it may be integrated with the authentication server as two services within a single physical or virtual server.

#### Prologue

The user tried to access a resource that requires authentication. Not having an account, the user opts to create one, for which the web application might deliver a sign-up or registration form that facilitates step A.

```
+--------+                                      +----------------+
|        |--(A)-- Set credentials ------------->| Authentication |
|        |                                      |     Server     |
|        |<-(B)-- Approve & store credentials --|                |
|        |                                      |                |
|        |                                      |                |
|        |--(C)-- Submit credentials ---------->|                |
|  User  |                                      |                |
|        |<-(D)-- Authenticate & issue token ---|                |
|        |                                      |                |
|        |                                      |                |
|        |--(E)-- Request with token ---------->|                |--+
|        |                                      +----------------+  |
|        |                                      +----------------+  |
|        |<-(F)-- Protected resource -----------|    Resource    |--+
|        |                                      |     Server     |
+--------+                                      +----------------+
```

#### A & B&mdash;Registration

The user selects a username and password, with which the user agrees to identify themselves in future interactions with the authentication server. That is, until either the username or the password is changed, the way the user will prove their identity is by submitting these two pieces of information.

The authentication server is responsible for confirming that the username is a unique value. (If user X and user Y had the same username, then a submission of that username with some password would be ambiguous.) Often, the authentication server also requires the password be entered twice (once, and again to confirm) to mitigate typographic errors.

In this step, the authentication server should never store plaintext passwords. Rather, best practice involves saving a [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of the password.

<div style="background: rgba(0,0,0,0.05); border-radius: 2px; padding: 20px 26px; color: #555555; font-weight: 300; margin-bottom: 1em; max-width: 100%; overflow-x: scroll;">
  <h5 id="hash-functions"><a href="#hash-functions">Cryptographic hash functions</a></h5>
  <p>A cryptographic hash function has a few properties that make it useful for encrypted password persistence. For a given hash function, <code>func hash(plain []byte) cipher []byte</code>, that maps a plaintext string or byte array to a cipher byte array,
    <ul>
      <li><code>hash(a) == hash(a)</code> for all <code>a</code>; i.e. the same input always generates the same output (deterministic)</li>
      <li><code>hash(a) != hash(b)</code> for all <code>a != b</code>; i.e. different inputs generate completely different results (collision resistant)</li>
      <li>Given <code>hash(a)</code>, the only way to determine <code>a</code> is guess-and-check (non-invertible)</li>
    </ul>
  </p>
  <p>For slightly more on cryptographic hash functions, checkout the <a href="http://localhost:1313/2017/09/08/blockchain-basics/#hash-functions">section in Blockchain Basics</a>.</p>
</div>

Saving only the output of the hash function, given the password, enables the authentication server to verify user login attempts in the future without actually knowing any user passwords; that is, the server can compute the hash of the password in the login request and compare it to the saved hash. This is considered a secure practice because if authentication server's database were to be hacked, the raw passwords are still unknown to the attacker. The attacker can't do much with a hash because they can't submit the hash to login to the victim's account&mdash;they would have to submit the original plaintext password (i.e. `hash(hash(x)) != hash(x)`).

(More precisely, the hash value of a password is useless unless the attacker has the time and resources to guess-and-check common plaintext passwords, running each guess through the hash function and comparing the outputs to the hash values they've stolen. This sort of attack is called a [rainbow table attack](https://en.wikipedia.org/wiki/Rainbow_table). (Even then, rainbow table attacks can be somewhat deterred by [hashing with salt](https://en.wikipedia.org/wiki/Salt_(cryptography)), which is an important practice that you should read about on your own!))

At the time of this writing, the [Blowfish cipher](https://en.wikipedia.org/wiki/Blowfish_(cipher)) designed by cryptography legend, [Bruce Schneier](https://en.wikipedia.org/wiki/Bruce_Schneier), is often used.

To recap: at the end of this step, **the user has memorized a username (public) and password (private)** and **the authentication server has stored the username (public) and the hash of the password (private)**.

#### C & D&mdash;Login

The credentials have been defined, but the user is not authenticated yet. In order to do so, the user submits their username and password, which the authentication server validates by hashing the password and comparing the hash to the hash it has saved for that username. If they match, the submission is deemed authentic and the user is authenticated.

But what does it mean to "be authenticated"? How does that state travel around with the user so that each subsequent interaction doesn't require a username and password? Generally, the authentication server will respond to a valid authentication request with a **token**, which is a cryptographically secure (i.e. very difficult to guess) temporary value that the user's device stores and attaches to subsequent requests. There are two main types of tokens, [cookies](#cookies-sessions) and [JSON web tokens (JWTs)](#json-web-tokens).

In either case, the "cryptographically secure" qualification is important because *if you have an entity's token, you can act on their behalf*. That is, if you published the cookie your browser currently stores for a website, someone could add that cookie to their browser's cookie storage and be seamlessly recognized as you be that website&mdash;no additional work required. (Perhaps, if the authentication service is sophisticated, it would recognize that the cookie does not match the last device known to use it and require re-authentication, but that's certainly beyond standard procedure.) As such, they should be long enough and random enough (terms which deserve their own entire blog post) that guessing one from publicly-available information would be infeasible.

Once again, the two types of tokens are cookies, which pair with sessions, and JWTs, which do just fine on their own, thank you very much.

##### Cookies & Sessions

Cookies are long, random byte values that a stateless server randomly generates and assigns to a user upon authentication. In response to the authentication request, a `Set-Cookie` header is sent to the front-end client (e.g. browser, native app, etc.) to store securely and send along with subsequent requests to the server ([Step E](#e-f-mdash-authenticated-requests)). The cookie will (should!) eventually expire (or be deleted by clearing your browser's cookies) at which point the user is essentially unknown to the authentication server once again, requiring them to authenticate again ([steps C & D](c-d-mdash-login)) in order to retrieve a new, entirely different cookie.

On the authentication-side of this interaction is a session, which is simply a key-value store of session IDs and cookie values (again, probably hashed). It's a self-similar pattern with the username-and-password protocol as a whole, where the session is correlated with the user's resources in such a way that the authentication service knows which session belongs to which user.

```
Simple session schema

+-------------+                 +----------+
| Session     |                 |  User    |
+-------------+                 +----------+
| id          |        +------->| id       |
| cookie_hash |        |        | username |
| user_id     |<-------+        | password |
+-------------+                 +----------+
```

To see cookies in the wild, open the developer console in your favorite browser. In Chrome, for instance, the cookies are found under **Application / Storage / Cookies**, indexed by domain. But remember not to publish them anywhere!

![Check out your cookies][02]

##### JSON Web Tokens

A JSON Web Token, abbreviated "JWT", is similar to a cookie, but whereas a cookie requires an associated session, a JWT operates all by itself. Terrific, but how?

First, what *is* a JSON web token? It's more than a simple random byte value; according to {{< footref 9 "RFC 7519" >}}, it is "a compact claims representation format intended for space constrained environments such as HTTP Authorization headers and URI query parameters.  JWTs encode claims to be transmitted as a JSON [RFC 7159](https://tools.ietf.org/html/rfc7159) object that is used as the payload of a JSON Web Signature (JWS) [JWS](https://tools.ietf.org/html/rfc7519#ref-JWS) structure or as the plaintext of a JSON Web Encryption (JWE) [JWE](https://tools.ietf.org/html/rfc7519#ref-JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted".

Unpacking that description, a JWT is a set of claims in JSON representation, which can be [signed or encrypted](#signing-versus-encrypting). JWTs are [base64](https://en.wikipedia.org/wiki/Base64)-encoded to make them compatible with URLs, meaning that they are compact and are represented with URL-legal characters. A signed JWT, which is relevant to our purposes, contains three parts: a header, a payload and a signature.<{{< footref 10 "" >}}

###### JWT Header

A header contains the token type (i.e. "JWT") and the algorithm used to sign the token (e.g. "HMAC")

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

###### JWT Payload

The payload contains the claims, or key-value pairs of data, to be transferred between parties. This is the meat of a JWT, in that it contains user data. Claims are either ***registered**, **public**, or **private**. Registered claim types are defined in [RFC-7519 Section 4.1](https://tools.ietf.org/html/rfc7519#section-4.1) and include such data as the issuer, the subject, and the expiry. Public claims are similar but slightly more informal; they should be registered with [the IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml). Private claims are anything the users of a particular JWT agree to include&mdash;there are really no additional rules or conventions to private claims.

```
{
  // Registered
  "iss": "http://authentication.server.io",
  "sub": "347582345345",
  
  // Public
  "name": "Bruce Schneier",
  "email": "bruce@schneier.io",
  
  // Private
  "total_boss": true,
  "genius_level": "exceptional"
}
```

*Note: the actual token would not include comments.*

###### JWT Signature

Signature is the way to ensure data integrity. Without the signature, how could the authorization server know that the claims are unaltered by a malicious user? If claims are to be used for identity, the server must be able to confirm that the content matches the authorized grants in at the time the token was issued. The server "signs" the header and payload with a value that is generated by a secret value only it knows. Then, upon receipt of a token, it uses that same secret to validate the signature. Only matching signatures are trusted.

In brief, a signature example using HMAC would look like this:  the authorization server base64-encodes the header and payload (e.g. `x := b64encode(header); y := b64encode(payload);`), concatenates the results with a period  (e.g. xy := x + "." + y;), then cryptographically signs the result (e.g. `y := hmac(xy, s)` where `s` is a strong secret known only to the authorization server). The final token has the signature concatenated after a second period, i.e. `x.y.z`.

A token might look similar to this in practice:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vYXV0aGVudGljYXRpb24uc2VydmVyLmlvIiwic3ViIjoiMzQ3NTgyMzQ1MzQ1IiwibmFtZSI6IkJydWNlIFNjaG5laWVyIiwiZW1haWwiOiJicnVjZUBzY2huZWllci5pbyIsInRvdGFsX2Jvc3MiOnRydWUsImdlbml1c19sZXZlbCI6ImV4Y2VwdGlvbmFsIn0.0tp9kl09DqT53M1AxzvRFaKCZIa_nlLv9nvg-3uMvkU
```

*For fun, head over to [jwt.io](https://jwt.io/) to decode that token! To validate the signature, use the secret: `rq860OZMm4Q9CMWNtgDlsfD6PoR6aX52`*

###### For the love of God, why?

There are several advantages to using JWTs, including URL safety and compactness. But compared to cookies and sessions, the main advantage is not managing extra application state. Remember that session schema from above? Who needs it! Just slap the user ID directly into the JWT claims. If an attacker wants to place a different user ID than their own into the token (or modify any claim at all, for that matter), the signature will fail to validate and the token will be rejected.

###### Signing versus Encrypting

To digitally sign data (or to "MAC", for the algorithm [HMAC](https://en.wikipedia.org/wiki/HMAC)) is to ensure that is not tampered with, but not necessarily to keep it private. Encryption offers the opposite: to keep something private, but not necessarily to ensure it is not tampered with. The operations are not exclusive; the best practice for composing operations is to encrypt-then-sign, i.e. encrypt-then-MAC.

#### E & F&mdash;Authenticated requests

Can we make requests for data yet? Hell yes, we can! The user's request will include a token, either a cookie or a JWT, which the authentication server will validate before passing the request on to the resource server to deliver the requested resource(s). This process (steps E & F) will continue to work until the token expires, whether by time or by the user logging out. At that point, the user must re-authenticate with steps C & D.

Now, what about protocols that don't require a username and password?

### OAuth

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

#### Prologue

The resource owner is not yet a resource owner, per se, but simply a person who wants to do something that requires authenticated data. They choose  to use OAuth, by opting to "Log in with Hooli".

#### A&mdash;Authorization Request

The end-user selects the protocol, but the client makes the first move: it asks the end-user to authorize the use of their data. This process is usually mediated by the Authorization Server, as the protocol writers recommend.

In a browser-based version of our previous example, that could take the form of Clynt opening a new window in which Hooli asks Ron to grant or deny Clynt access to Ron's personal information.

#### B & C&mdash;Authorization Grant

At it's most basic, the authorization grant is proof that Ron said "yes" to Clynt's Hooli-mediated request. The grant is sent to Clynt, which forwards it along to Hooli's authorization server as proof that Hooli can rightly provide Clynt with a token (think "password") to access Ron's data.

According to the spec, "[a]n authorization grant is a credential representing the resource owner's authorization (to access its protected resources) used by the client to obtain an access token. This specification defines four grant types -- authorization code, implicit, resource owner password credentials, and client credentials".{{< footref 7 "" >}} Briefly, each are defined as follows.

##### Authorization Code

The process of Hooli mediating Clynt and Ron would use an authorization code. After Ron selects, "Yes, grant Clynt access to information," Hooli sends Ron back to Clynt's app with an authorization code. This process is the most common of the four. It provides security benefits, such as being able to authenticate the client, that you can read more about in [RFC 6749](https://tools.ietf.org/html/rfc6749#page-8).

##### Implicit

Implicit authorization grant protocol is similar to authorization code flow, but foregoes the extra security benefits (i.e. client authentication) in favor of fewer round-trips between parties in the interest of speed and ease-of-use. Specifically, instead of issuing a code to the client that can be exchanged for an access token, the access token is directly issued from authorization server to client.

##### Resource owner password credentials

Here's a simple one: Ron simply gives his username and password, which Clynt then trades with the authorization server for an access token. That's not a good idea for most applications, not least because the point is to *not* use password credential protocols. Ron shouldn't trust Clynt with his Hooli password because Clynt might be a malicious actor, or simply too incompetent to protect his password from other malicious actors, in which case he can't revoke access to his already-limited authorization of data. He'd have to change his password, at the very least, at which point it's already too late.

##### Client credentials

If the client and authorization server already have an arrangement (e.g. maybe the client *is* the resource owner, trying to gain an access token to it's own information stored in a vault protected by the authorization server) then the client can use its own credentials.

#### C & D & E&mdash;Access Token

The client sends along the authorization grant as a request for an access token (unless the authorization grant is implicit, in which case this step is moot because the grant *is* the token). Why does the client need a token if it already has a code? The code can't be used to gain access to anything, except a token; it is merely an ephemeral proof that the resource owner approves of access being granted. The client must exchange it for a token, which can be used to request protected data for an extended (but not infinite) amount of time. During this exchange, the client can be authenticated, providing the extra layer of security not afforded to the implicit authorization grant protocol.

This step sounds simple, but it is the crux of the protocol. Once an access token is granted, the grantee has access. Hence, the protocol authors highly encourage the client to authenticate with the authorization service before being granted a token, lest an attacker get a hold of a code and be able to gain unauthorized access. Although additional credentials *may* be required of a client alongside an access token in subsequent requests, no such measure is required by the protocol, so it can be assumed that the access token is the golden key.

#### E & F&mdash;Protected Resource

No longer do the resource owner nor the authorization server have to do any work. The resource server is instructed to provide authorized access to the protected resources requested by clients with valid access tokens. When now, when Ron is authenticated with Hooli and Clynt has been granted access, Clynt can go straight to a Hooli resource server for Ron's data.

Maybe you've already caught the twist: **OAuth is technically an authorization protocol, not an authentication protocol**. When you are asked to log into your Google account, you are authenticating; but after that, the applications interfacing via OAuth with your identity are really saying, "Ok, Google knows who you are, so we need to ask Google to authorize us to use some Google-controller resource of yours."

![Google][04]

It's a fine line, for sure&mdash;after all, there's a case to be made that before OAuth-ing, the application doesn't know your identity and afterwards it might. But the only thing OAuth can *truly* grant is authorization to the third-party service, perhaps to your full identity, and perhaps not.

#### Coda: OpenID Connect

There is an *authentication* protocol built atop OAuth. It's called [OpenID Connect](http://openid.net/connect/) and it describes itself as, "a simple identity layer on top of the OAuth 2.0 protocol."{{< footref 8 "" >}} (Note that this is somewhat dissimilar to regular {{< footref 6 "OpenID" >}}, but similar enough that we won't get stuck untangling the weeds here.)

> The crucial difference is that in the OpenID authentication use case, the response from the identity provider is an assertion of identity; while in the OAuth authorization use case, the identity provider is also an API provider, and the response from the identity provider is an access token that may grant the application ongoing access to some of the identity provider's APIs, on the user's behalf.{{< footref 6 "" >}}

In short, you can think of OpenId Connect as the single point of the authorization-authentication Venn diagram that would overlap: a protocol that *authorizes* access to someone's identity, which is equivalent to *authenticating* them. Check out [Google's OpenID Connect](https://developers.google.com/identity/protocols/OpenIDConnect) developer documentation to get a sense for an implementation of OpenID Connect.

### SQRL

SQRL is a perfect case study in authentication because it's unusual, but promises some serious security benefits. Once again, before digging into the protocol we'll get a feel for the user experience.

Steve visits GRC.com, but needs to log it. He sees a QR code labeled with the site's domain (e.g. www.grc.com). Steve confirms that www.grc.com is, in fact, the website with which he's trying to authenticate, so he clicks the QR code and he's been authenticated. That's it!

This one's a bit of a magic trick, at least until you understand which factors are at work and where they enter the equation. (They are there&mdash;but the user experience is intentionally meant to mask them.) After we unpack the protocol, we can consider the advantages and disadvantages of the process.

```
+-------------+                                          +----------------+
|    User     |<-(A)-- Generate and offer URL QR code ---| Authentication |
|             |                                          |     Server     |
|             |--(B)-+ Confirm domain and                |                |
|             |      | send QR to SQRL client            |                |
|             |      |   +-------------+                 |                |
|             |      +-->| SQRL client |---(C)----+      |                |
|             |          +-------------+          |      |                |
|             | 1. Create a public key pair (*)   |      |                |
|             | 2. Sign the URL with private key  |      |                |
|             | 3. Send public key and signature  +----->|                |
|             |                                          |                |
|             |<-(D)-- 1. Validate signature ------------|                |
|             |        2. Save public key as user's ID   |                |
|             |        3. Send token back                |                |
|             |                                          |                |
|             |--(E)-- Request with token -------------->|                |--+     
|             |                                          +----------------+  |
|             |                                          +----------------+  |
|             |<-(F)-- Protected resource ---------------|    Resource    |--+
|             |                                          |     Server     |
+-------------+                                          +----------------+

* Only generate keys on "registration". Subsequent login uses existing keys
```

The trade-off is clear: a simpler user experience results, naturally enough, in a more complicated protocol behind-the-scenes. After all, someone or something has to be responsible for the security concerns!

#### Prologue

Setting up SQRL sounds like it would be a lot like setting up LastPass (or any equivalent password manager) except with one catch: none seem to exist&mdash;or at least none popular enough to mention. SQRL's own [list of implementations](https://www.grc.com/sqrl/implementations.htm) is fifteen-long, rife with broken links and links to Github projects that have been inactive for some time. Anyways, this is how it *might* work.

1. The user downloads a SQRL client (henceforth referred to as, simply, "SQRL") and is asked to create an identity by selecting a single, long, secure master password. This allows SQRL to authenticate the user locally. It is the first and final time a password will be used, and it never gets transmitted remotely, which is a huge security benefit.

1. SQRL randomly generates a 256-bit identity master key, which is immediately encrypted under the user's master password. A QR code is generated that represents the master key, sans-password, such that in order to seed a new SQRL client, one would be required to enter the associated master password. (This is how you would access the same identity on a different device.)

The user now visits a domain that supports SQRL and clicks on the login QR code for the first time.

#### A & B&mdash;QR generation and confirmation

The offered QR code contains a URL with the domain and a randomly-generated nonce, which serves as a cryptographic challenge.{{< footref 11 "" >}} SQRL goes to work, cryptographically hashing the domain portion of the URL (which will remain unchanged) with the user's encrypted and never-changing master key in order to generate a site-specific public and private key pair.

<div style="background: rgba(0,0,0,0.05); border-radius: 2px; padding: 20px 26px; color: #555555; font-weight: 300; margin-bottom: 1em; max-width: 100%; overflow-x: scroll;">
  <h5 id="public-key-encryption"><a href="#public-key-encryption">Public-key encryption</a></h5>
  <p>Public-key encryption, sometimes called asymmetric encryption, is a terribly interesting topic, but outside the already-creeping scope of this post. In brief, it refers to encryption schemes for which the encryption key is not identical to the decryption key. This stands in contrast to symmetric encryption schemed wherein a single key is used for both operations.</p>
  <p>The obvious power of this type of system is in solving the initial-sharing of a shared symmetric key.  That is, if two remote entities want to privately communicate secrets protected by symmetric encryption, they must first share a key with each other&mdash;but how do they share the secret without the secret itself being intercepted? Public-key encryption allows the receiving entity to publish a public key used for encrypting, keeping the private key secret for decrypting. The sender encrypts a message with the receiver's public key and sends the encrypted message to them; the receiver decrypts it with their private key.</p>
  <p>Start with the <a href="https://en.wikipedia.org/wiki/Public-key_cryptography">Wikipedia article on Public-key encryption</a> for more on the topic.</p>
</div>

Now SQRL has a domain-specific key pair and QR-encoded URL.

#### C & D&mdash;Sign and validate

SQRL then signs the entire URL (random nonce included) with the site-specific private key it just generated, then sends a response to the authentication server that includes the site-specific public key and the signature. 

![SQRL URL][07]

The public key uniquely identifies the user because it is generated from a hash with the user's master key. The signature is unique to the site because of the random nonce and because it is signed with the user's unique key pair.

When the authentication server receives the response from SQRL, it validates the signature (only the public key is required) and saves the key as the identifier of the new user. If an attacker tried to spoof the identity of the user by submitting their public key, they'd have to forge the signature, which is impossible (for all intents and purposes) without the user's private key, which *never even leaves the SQRL client*.

This is a major security feature: the key authentication factor doesn't get remotely transmitted, meaning that man-in-the-middle attacks like [logging keystrokes](https://en.wikipedia.org/wiki/Keystroke_logging) or [intercepting submitted passwords over non-encrypted public WiFi](https://lifehacker.com/5853483/a-guide-to-sniffing-out-passwords-and-cookies-and-how-to-protect-yourself-against-it) aren't possible, which is great news.

![SQRL man-in-the-middle][06]

(Although this isn't necessarily part of the process, the authentication server would most likely return a token for ongoing authenticated requests, which leads us into the next step, echoing previous protocols.)

#### E & F&mdash;Subsequent requests

SQRL has no opinion about how this part of the process occurs, so we can make reference to the [cookie](#cookie-session)- or [JWT](#json-web-tokens)-based token authentication schemes.

*See [steps E & F](#e-f-mdash-authenticated-requests) from part 1.*

#### SQRL Factors

So what, precisely, are the factors here? This could be debated, but I think there are two&mdash;potentially three&mdash;factors at work here:

##### SQRL Ownership
The user owns the device that runs their SQRL client. This is very similar to owning a device that runs Google Authenticator&mdash;without the proper device (or the seed for the SQRL client) you simply cannot access one's identity.

##### SQRL Knowledge
A SQRL client master password is a strong second factor. (So strong, in fact, it's often the only factor, as in old-school username-and-password protocols.) It's made stronger still if you argue that the password can be very complex because it's the only one you have to remember.

##### SQRL Inherence
While it's not explicitly a part of the SQRL protocol, one could argue that phones with fingerprint ID add a third factor. However I would disagree with this claim because (1) most (all?) phones allow for fingerprint OR a PIN, which is a knowledge factor; and (2) if we award this factor for SQRL, then we must award it to Google Authenticator running on a phone, too.

## Key ideas

In order to authenticate an entity, convincing-enough proof must be given, whatever that means. There are a great many protocols for doing this, with more are being invented every day, but they all hinge on demonstration of unique data, be they **knowledge**, **ownership**, or **inherence**. Each factor has its vulnerabilities: knowledge has theft or cracking of secrets; ownership has theft or imitation of property; inherence has duplication and imitation of traits.

No crypto-system is perfect, but understanding the inner workings of widely-used protocols can go a long way in optimizing their power over keeping our identities secure.

## Credit, Reference, Related

1. {{< footnote 1 "Authentic | Definition of Authentic from Merriam-Webster" "https://www.merriam-webster.com/dictionary/authentic" >}}

1. {{< footnote 2 "Wikipedia: Authentication" "https://en.wikipedia.org/wiki/Authentication" >}}

1. {{< footnote 3 "Author | Definition of Author from Merriam-Webster" "https://www.merriam-webster.com/dictionary/author" >}}

1. {{< footnote 4 "Wikipedia: Authorization" "https://en.wikipedia.org/wiki/Authorization" >}}

1. {{< footnote 5 "Wikipedia: Multi-factor authentication" "https://en.wikipedia.org/wiki/Multi-factor_authentication" >}}

1. {{< footnote 6 "Wikipedia: OAuth" "https://en.wikipedia.org/wiki/OAuth" >}}

1. {{< footnote 7 "RFC 6749 - The OAuth 2.0 Authorization Framework" "https://tools.ietf.org/html/rfc6749" >}}

1. {{< footnote 8 "OpenID Connect" "http://openid.net/connect/" >}}

1. {{< footnote 9 "RFC 7519 - JSON Web Token (JWT)" "https://tools.ietf.org/html/rfc7519" >}}

1. {{< footnote 10 "JSON Web Token Introduction - jwt.io" "https://jwt.io/introduction/" >}}

1. {{< footnote 11 "SQRL" "https://www.grc.com/sqrl/sqrl.htm" >}}

[01]: /images/auth/cover.jpg
[02]: /images/auth/cookies.png
[03]: /images/auth/protocol-flow.png
[04]: /images/auth/google.jpg
[05]: /images/auth/log-in-with-google.png
[06]: /images/auth/sqrl-mitm.png
[07]: /images/auth/sqrl-url.png
