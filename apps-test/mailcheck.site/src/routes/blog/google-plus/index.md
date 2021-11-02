---
published: true
slug: google-plus
title: Google+ is shutting down. So what?
date: 15.03.2019
readingTime: 3 min read
snippet: Google announced shutting down social media platform Google+. It is hard to find some technical article that hasn’t mentioned the end of Google’s social network era. But, a high level of consistency in connectivity within services of the company had received scant attention. In this article I would like to share my thoughts on the internal way of Google services consistency and what does it mean for Google API users when it comes to a Google+ shutdown.
desc: Google announced shutting down social media platform Google+. It is hard to find some technical article that hasn’t mentioned the end of Google’s social network era. But, a high level of consistency in connectivity within services of the company had received scant attention. In this article I would like to share my thoughts on the internal way of Google services consistency and what does it mean for Google API users when it comes to a Google+ shutdown.
---

# {title}

{readingTime}

Google announced shutting down social media platform Google+. It is hard to find some technical article that hasn’t mentioned the end of Google’s social network era. But, a high level of consistency in connectivity within services of the company had received scant attention. In this article I would like to share my thoughts on the internal way of Google services consistency and what does it mean for Google API users when it comes to a Google+ shutdown.

From a client’s point of view, the use of Gmail Photos and a further shift to Docs should be as clear as possible — at first glance, these services are independent and united within one platform that is a point of access called Single Sign-On [accounts.google.com](https://accounts.google.com). But as developers, we know, that terms “shutdown”, “takeover”, “integrate” involve great meaning (and also work) for those people, who take part in this process. So, let’s take a closer look at a process of Google’s one of the external services takeovers, and what’s going on with taken-over service API and Google API.

## Account and userID

Beside users who use Gmail and may heard of Google Plus, there is also a huge number of APIs for developers that include such things as account identifiers, the notorious userID. The userID is Google’s internal ID, this is the thing that helps Google services understand who is who. It appeared in many APIs, and we see that it has not changed from service to service.

## Let’s take a closer look at another example of external takeover performed by Google

Obviously, for the implementation of SSO in the newly absorbed service, you cannot simply take and transfer accounts from the old base to the new “Google accounts base”. I think there is simply no such thing - there are many intertwined services, levels of interaction, chains of responsibility, service management services. Seriously, if you think about it, then there must be many, many, many levels of connections between Google services for everything to work. But then everything goes not so smoothly - in an effort to popularize G+ it used the userID of users who are part of the global SSO service.

Let’s get back to the thesis. There is a need to make changes to the existing API from both the absorbed side of the API and from other services that can now start working with the new service. It would seem like nothing supercomplex - to adapt the existing user base of the service to “common google” services, to create points of interaction with other services so that they can use the new service for their own purposes. But this is not about small projects - a corporation of good does not waste time on trifles and absorbs multimillion-dollar companies, which, most likely, have already established infrastructure - otherwise they could not grow to their scale. So, it makes sense to leave its code base, or rather, the core of the service, and redo the input-output channels of the service's links so that they become compatible with Google. Then the service becomes a Google service. Let's Suppose that at this moment it has already been tested and is considered to be quite trustworthy by the people from Google who are responsible for the integration. Here is the most interesting part - the service can be integrated into other services and / or transferred from service to service. In general, it would not be scary if it were not for Google’s tendency to change the registration of services. Take for example photos.

> Picasa desktop application (2002) => Picasa Web Albums — Google acquires Picasa (2004) => Google Plus incorporated Picasa (2011) => Google Photos is separated from G+ (2015) => …

Considering the inertia of the integration process, in the majority of products, Google still supports very old APIs. At the time of publication of the article, the Picasa API is still working the way it did back to the time when Picasa was a separate product. That is brings us to the conclusion that when Google integrated Picasa as their next service, they created a “branch” from the original product and left the old “branch” to the mercy of fate, but did not shut down its API.

And then it's time to recall the reason for closing G+. It happened due to a reported security issue, but in reality there can be even more security issues due to inconsistency in different APIs.

## Proof of concept

For instance, there was a service called PicasaWeb — the predecessor of Google Photos. It is unavailable since 2016 but according to the note at the end of a post — its API still operates. The end date of this API is March 15, 2019. This service was noteworthy because it allowed getting email and internal userID match. How would it be useful?

For instance, we develop an email validator. In this case, this API would be a manna from heaven. Knowing an Account ID from G+ we can get a name of a user, photo, and even additional information. The trick is that you can't get userID if this user never logged in to our website. But despite this, users were able to post pictures at web-albums that were linked with email using old PicasaWebAlbums. That suggested that old API allows getting to user’s account using userID or user’s email.

Let’s check: [https://picasaweb.google.com/data/feed/api/user/nosov@nodeart.io?deprecation-extension=true](https://picasaweb.google.com/data/feed/api/user/nosov@nodeart.io?deprecation-extension=true)

- [https://picasaweb.google.com/data/feed/api/user/](https://picasaweb.google.com/data/feed/api/user/)
- API’s endpoint; — [nosov@nodeart.io](mailto:nosov@nodeart.io) — user’s email for validation (as we can see, it is not required to use Gmails only). User should have Google Apps accounts (this validation is very helpful with lead generation), users with Google+ accounts also have this (by linking a third-party email beforehand), for example, [Yandex.ru](https://yandex.ru/)
- deprecation-extension=true — the indication about an imminent end of API's life.

If we will try to pass nonexistent email, we’ll get clear interpreted response: “Unable to find a user with email [noname@nodeart.io](mailto:noname@nodeart.io), that leads to the conclusion that this email is not valid. And even more — if we will try to send a group mailing address to the API the answer be “Unknown user”. It would then be possible to distinguish the difference between personal G-Suite emails and corporate emails. It’s hard to say that we can “catch” personal data this way if this data wasn’t shared by the user, but it was good for the global validation of user list via API.

## So, how this imprecision was linked to Google+ shutting down? Conclusions

The key reason to shut down Google+ was security lapse, more precisely, the ability to get data from Google+ by the services that weren’t planned and intended beforehand.

Beside Google +, partial shut down of various APIs is performed. For instance, you should pass payed audit to get access to gmail.api which makes this API unavailable for the vast majority of developers.

## Citation

> The assessment fee is paid by the developer and may range from $15,000 to $75,000 (or more) depending on the size and complexity of the application.

In fact, this gives us a reason to think that Google has become entangled in the system of interaction between services since the actions that previously could be performed simply by obtaining the required scope, now require manual validation for 15–75k USD and manual inclusion in whitelist. It remains only to guess what else you can do using undocumented features of the Google's rich ecosystem of the services and the SSO service in particular.

In order to [qualitatively validate mailing lists](https://www.mailcheck.co/), we will need to look for new non-standard ways of public APIs usage, so we will continue to explore the Google \\ Facebook API and other services. (By the way, Facebook until recently had a similar way of email validation.)
