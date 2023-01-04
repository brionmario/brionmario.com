---
slug: "/posts/how-to-deploy-wso2-identity-server-my-account-on-an-external-server/"
date: "2021-09-30"
title: "How to deploy WSO2 Identity Server My Account on an external server."
description: "My Account (previously known as User Portal in Identity Server 5.10.0) is the end-user dashboard of the WSO2 Identity Server(WSO2 IS). With the My Account application, users can manage their…"
authors:
  - id: "ca410be341b9"
    name: "Brion Mario"
    username: "brionmario"
    image: "https://miro.medium.com/fit/c/176/176/1*vSMWBwWmwDsLJ1px0jb07g.jpeg"
    bio: "Software Engineer working at WSO2."
    twitterScreenName: "brion_mario"
readingTime: "5 min read"
draft: false
tags:
  - "wso2-identity-server"
  - "my-account"
  - "external-deployment"
  - "tomcat"
  - "firebase"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*vR9zGGWPCS8NSpck2Gl2DA.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*vR9zGGWPCS8NSpck2Gl2DA.png"
  - "https://cdn-images-1.medium.com/max/2600/1*lXoukPHUjXLbUeFkO73CnQ.png"
  - "https://cdn-images-1.medium.com/max/2600/1*DURBP4z6gVkKuhhUbSf3xw.png"
  - "https://cdn-images-1.medium.com/max/2600/1*B2tPKoNbLW-VJImH4PuJhg.png"
  - "https://cdn-images-1.medium.com/max/2600/1*TtVxNYVLKgdowCZJLQ5LTg.png"
  - "https://cdn-images-1.medium.com/max/2600/1*IYeX-VhoFiuKpTLcw-HZ8g.png"
  - "https://cdn-images-1.medium.com/max/2600/1*MOfUoA4_Zu-3LYOFASmWkQ.png"
  - "https://cdn-images-1.medium.com/max/2600/1*X9g8IPt7N9X2Lxo2j0Ejqg.png"

---

# How to deploy WSO2 Identity Server My Account on an external server.

![](https://cdn-images-1.medium.com/max/800/1*vR9zGGWPCS8NSpck2Gl2DA.png)

[My Account](https://is.docs.wso2.com/en/latest/learn/my-account/) (previously known as [User Portal](https://is.docs.wso2.com/en/5.10.0/learn/user-portal/) in Identity Server 5.10.0) is the end-user dashboard of the WSO2 Identity Server(WSO2 IS). With the My Account application, users can manage their account-related preferences with more convenience.

It can be accessed via the URL [https://localhost:9443/myaccount](https://localhost:9443/myaccount) on an Identity Server running with default configurations.

### The Problem

If your business requires you to host this application on a server outside of the Identity Server, you’ll be faced with some difficulties.

We pack a [JSP](https://docs.oracle.com/javaee/5/tutorial/doc/bnagy.html) index file by default in the artifact. So, if you try to host the artifact found under the path `<IS_HOME>/repository/deployment/server/webapps/myaccount` , it’ll be impossible out of the box.

Even if you try to host the application on an external [Tomcat](http://tomcat.apache.org/) server, even though JSP is supported, you’ll see an exception like below.

![](https://cdn-images-1.medium.com/max/800/1*lXoukPHUjXLbUeFkO73CnQ.png)

The reason for the above exceptions is the usage of some Java utils in the applications to resolve server origin, super tenant information, etc. These utils are extremely helpful to maintain the dynamic nature of the application when it is hosted inside the IS, but when it comes to external deployments, this poses an obstacle.

### Possible Solutions

You can of cause manually remove all the Java dependencies from the index file and try to overcome the issue (only works if you are hosting the application on a Java EE server) or you could check out the source code and build the application so that it is compatible to be hosted on any server.

I **recommend** the latter option and will explain the process of building a compatible artifact.
