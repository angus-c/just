---
published: true
slug: why-hosting-email-at-home-is-not-good-idea
title: Why hosting email at home isn't good idea
date: 20.07.2019
readingTime: 3 min read
snippet: Now days it's pretty simple task to launch mail server at home. Tools like docker and virtualization can help us to run MTA in a few minutes. But you shouldn't. SMTP wasn't designed in secure manner and SPAM is q global problem for that old standard.
desc: Now days it's pretty simple task to launch mail server at home. Tools like docker and virtualization can help us to run MTA in a few minutes. But you shouldn't. SMTP wasn't designed in secure manner and SPAM is q global problem for that old standard.
---

# {title}

{readingTime}

Now days it's pretty simple task to launch mail server at home. Tools like docker and virtualization can help us to run MTA in a few minutes. But you shouldn't. SMTP wasn't designed in secure manner and SPAM is q global problem for that old standard.

In times of old web there was lots of small mail providers, but with evolution of web most of the mails concentrated at big email providers, like Gmail, Hotmail etc.

They started their epic fight against spam. DNSBL lists and manual ip blocks. And spammers started to extensively burn resources needed for sending mails. At some grade buying new ip stated to be more expensive than revenue from it.

And then spammers realized that each household has unique and private IP. And virus epidemic exploded in internet. Infected programs sent millions of mails. And it was legitimate ips.

At some point big mail providers calculated that almost all legitimate mails received from data centers and servers on them. But almost all mails from home networks are spam.

Then big mail providers started to grade incoming mails also by as net records. Mails from residential ips received penalty as more suspicious. Of course SPF, DKIM, DMARC and other technical methods will allow sender to bypass spam filter, but probability of being trapped is much more from residential iPs.

Also, in a difference of home iPs - even virtual servers have static IPs. Another problem that in most home networks IPS are floating, that makes correct usage of SPF impossible. Even more - you can't guess who was yours predecessor, who controlled that IP before.

That's why if you want to send mails you should better rent SaaS service like G Suite, or at least setup server at Data center.
