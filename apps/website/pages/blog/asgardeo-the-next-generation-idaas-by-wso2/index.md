---
slug: "/posts/asgardeo-the-next-generation-idaas-by-wso2/"
date: "2022-02-26"
title: "Asgardeo || The Next-Generation IDaaS by WSO2"
description: "At the time of writing, it’s still in the early-adopter stage and the GA release will be announced soon. Well, let’s start with the name itself. Asgardeo was inspired by the mythical concept of…"
authors:
  - id: "ca410be341b9"
    name: "Brion Mario"
    username: "brionmario"
    image: "https://miro.medium.com/fit/c/176/176/1*VyzrTxkrThOJKKnvx20UTg.png"
    bio: "Software Engineer working at WSO2."
    twitterScreenName: "brion_mario"
readingTime: "4 min read"
draft: false
tags:
  - "asgardeo"
  - "idaas"
  - "ciam"
  - "iamcloud"
  - "low-code"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*PTNELAjCeN99cU1P_ryB-g.jpeg"
ogImage: "https://cdn-images-1.medium.com/max/2600/1*PTNELAjCeN99cU1P_ryB-g.jpeg"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*PTNELAjCeN99cU1P_ryB-g.jpeg"
  - "https://cdn-images-1.medium.com/max/2600/1*be_MRQxTu-02WANeVM6teQ.gif"
  - "https://cdn-images-1.medium.com/max/2600/1*zwQg8VV8On4dI6wPfwg3uA.png"
  - "https://cdn-images-1.medium.com/max/2600/1*hsjGRPELhA0k-k-duyJc-Q.png"
  - "https://cdn-images-1.medium.com/max/2600/1*FKQA2A4HXs-uOdGl2FjnwQ.png"

---

# Asgardeo || The Next-Generation IDaaS by WSO2

On October 13, 2021, [WSO2 introduced](https://wso2.com/about/news/wso2-introduces-asgardeo-next-generation-idaas/) its brand new IDaaS solution **Asgardeo**.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We are live 🎉 <br></br><br></br>Asgardeo is an IDaaS enabling developers with little IAM experience to build advanced Customer IAM into apps in minutes!<br></br>Read all about it ➡️ <a href="https://t.co/celmgcwLM3">https://t.co/celmgcwLM3</a><a href="https://twitter.com/hashtag/lowcode?src=hash&amp;ref\_src=twsrc%5Etfw">#lowcode</a> <a href="https://twitter.com/hashtag/appdevelopement?src=hash&amp;ref\_src=twsrc%5Etfw">#appdevelopement</a> <a href="https://twitter.com/hashtag/IAM?src=hash&amp;ref\_src=twsrc%5Etfw">#IAM</a> <a href="https://twitter.com/hashtag/SSO?src=hash&amp;ref\_src=twsrc%5Etfw">#SSO</a> <a href="https://twitter.com/hashtag/MFA?src=hash&amp;ref\_src=twsrc%5Etfw">#MFA</a> <a href="https://twitter.com/hashtag/Cloud?src=hash&amp;ref\_src=twsrc%5Etfw">#Cloud</a> <a href="https://twitter.com/hashtag/Asgardeo?src=hash&amp;ref\_src=twsrc%5Etfw">#Asgardeo</a></p>&mdash; Asgardeo (@asgardeo) <a href="https://twitter.com/asgardeo/status/1448276087994261515?ref\_src=twsrc%5Etfw">October 13, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

At the time of writing, it’s still in the early-adopter stage and the GA release will be announced soon.

In this post, I will try to give a brief on the new platform and its offerings.

### What is Asgardeo? 🤔

![Asgardeo Banner](https://cdn-images-1.medium.com/max/800/1*PTNELAjCeN99cU1P_ryB-g.jpeg)

Well, let’s start with the name itself. **Asgardeo** was inspired by the mythical concept of [Asgard](https://en.wikipedia.org/wiki/Asgard) which is one of the nine realms according to Norse mythology.

Pretty cool right 😎

![](https://cdn-images-1.medium.com/max/800/1*be_MRQxTu-02WANeVM6teQ.gif)

Getting back to business, Asgardeo is an IDaaS inspired by our learnings from the [WSO2 Identity Server](https://wso2.com/identity-server/) which has been in the IAM market for years.

One of the primary goals of Asgardeo was to improve the developer experience by abstracting out the complexities of the IAM domain. With this, even novice developers could easily implement IAM concepts in their workflows.

### How to Register 🗝

Head on over to [https://asgardeo.io/signup](https://asgardeo.io/signup) and follow the simple sign-up process.

> Click [here](https://wso2.com/asgardeo/docs/get-started/create-asgardeo-account/) to learn more on this from the official documentaion.

### Key Features ✨

#### Asgardeo Console

Once you successfully register, this will be the entry point where you can easily manage your user, applications, connections, etc.

![Asgardeo Console](https://cdn-images-1.medium.com/max/800/1*zwQg8VV8On4dI6wPfwg3uA.png)

#### Asgardeo Organizations

When you register on Asgardeo, an Organization will be created for you and it will be set as the default.

An Asgardeo admin could own several organizations, and they can be created via the Asgardeo Console.

> Click [here](https://wso2.com/asgardeo/docs/guides/your-asgardeo/manage-organizations/#create-an-organization) to learn how to create Asgardeo organizations from the official documentaion.

#### Asgardeo My Account

The My Account is the self-service portal for Asgardeo users.

As an organization owner, if you want to manage your own profile, you can head on to **My Account** from the user dropdown link, or by navigating to [https://myaccount.asgardeo.io](https://myaccount.asgardeo.io/).

The customers of your organization could navigate to the My Account portal for your organization to manage their profiles. The pattern of the URL would look something the following. Replace the `<YOUR_ORGANIZATION>` placeholder with the actual organization name.

<a href="https://myaccount.asgardeo.io/t/%3CYOUR_ORGANIZATION%3E" class="fenced-link">https://myaccount.asgardeo.io/t/<YOUR_ORGANIZATION></a>

![Asgardeo My Account](https://cdn-images-1.medium.com/max/800/1*hsjGRPELhA0k-k-duyJc-Q.png)

#### SDK Ecosystem

As I mentioned above, our key goal was to make the developer’s life easier. Hence, we have developed a rich [ecosystem of SDKs](https://github.com/asgardeo?q=sdk) to improve the developer experience.

We have more coming on the way. Stay tuned 😉

#### Easy Login Integration

With the above-mentioned SDKs in your toolbelt, integrating login to applications is a breeze 🌊 with Asgardeo. We have added quick start guides with sample applications and easy-to-follow wizards to help you along the way.

Adding social logins like Google, GitHub, Facebook, etc., or any other external identity provider is also extremely easy with our inline help and wizards. You could set up and ship your applications in no time.

If you have a requirement to have a complex authentication flow with MFA (Multi-Factor Authentication) or Conditional Authentication (Adaptive Scripts), we have got you covered as well 😉.

> Click [here](https://wso2.com/asgardeo/docs/get-started/start-integrating-apps/) to learn more on this from the official documentaion.

#### User management

User management has been a headache for developers for a long time but no more 🤩. You can enable self-sign-up options and onboard customers into your organizations smoothly.

Not just onboarding, Asgardeo provides comprehensive support for account recovery, locking, force-password resets, session management, and many more features.

> Click [here](https://wso2.com/asgardeo/docs/guides/users/) to learn more on User Management from the official documentation.

#### Organization Branding

When you integrate login to your applications with Asgardeo, by default you will see Asgardeo specific branding on the login pages. This would not be ideal since your customers might feel that they are redirected to a third party and also the UX will be bad due to the contrast in look and feel.

For the above use case, Asgardeo has a **Branding 🎨** feature where you can customize the login, recovery & MFA UIs shown to your customers when they log in to your apps.

![Asgardeo Branding](https://cdn-images-1.medium.com/max/800/1*FKQA2A4HXs-uOdGl2FjnwQ.png)

Read my [blog](https://medium.com/@brionmario/introducing-asgardeo-organization-branding-c0b8d66b8074) on the Branding feature. ⚡️

> Click [here](https://wso2.com/asgardeo/docs/guides/branding/) to learn more on Branding from the official documentation.

### Finally 🎭

It has been a blast and a huge privilege being part of the core development team of Asgardeo for the past 2+ years and I sincerely hope that Asgardeo will help fellow developers and businesses to succeed.

I hope that this post gave you some context on Asgardeo and if you haven't already tried it out, try it out today itself!

If you have any queries or suggestions regarding anything related to the platform head on over to the [IAM4DEVS Community](https://iam4devs.wso2.com/asgardeo-1) and let's socialize there 😉.

Signing off… ✌️❤️
