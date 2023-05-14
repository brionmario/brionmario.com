---
slug: "/posts/how-to-set-up-wso2-identity-server-user-portal-in-an-development-environment/"
date: "2020-03-17"
title: "How to set-up WSO2 Identity Server User Portal in an development environment"
description: "The upcoming WSO2 Identity Server version 5.10.0 will have redesigned UIs with improved UX. The Dashboard has been deprecated and been replaced with a new User Portal. The overall appearance has also…"
authors:
  - id: "ca410be341b9"
    name: "Brion Mario"
    username: "brionmario"
    image: "https://miro.medium.com/fit/c/176/176/1*VyzrTxkrThOJKKnvx20UTg.png"
    bio: "Software Engineer working at WSO2."
    twitterScreenName: "brion_mario"
readingTime: "3 min read"
draft: false
tags:
  - "wso2-identity-server"
  - "user-portal"
  - "dev-mode-setup"
  - "wso2"
  - "wso2is"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*ArGKJ2HGBymTJYrYkW5LTA.png"
ogImage: "https://cdn-images-1.medium.com/max/2600/1*ArGKJ2HGBymTJYrYkW5LTA.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*ArGKJ2HGBymTJYrYkW5LTA.png"
  - "https://cdn-images-1.medium.com/max/2600/1*8GEH34emQnw4oa_Wx5cBew.png"
  - "https://cdn-images-1.medium.com/max/2600/1*DyKyRbreFrhUuugNlelH9A.png"
  - "https://cdn-images-1.medium.com/max/2600/1*g30DebU_d7xnNbT4s2kJrQ.png"

---

# How to set-up WSO2 Identity Server User Portal in an development environment

The upcoming [WSO2 Identity Server](https://wso2.com/identity-and-access-management/) version 5.10.0 will have redesigned UIs with improved UX. The Dashboard has been deprecated and been replaced with a new User Portal. The overall appearance has also been upgraded to maintain consistency across the product.

In order to achieve the above, a centralized theming mechanism is a must. Therefore, all the front-end portals have been moved to a single mono-repo called “Identity Apps” ([https://github.com/wso2/identity-apps](https://github.com/wso2/identity-apps)).

When the final version of the WSO2 Identity Server 5.10.0 is released, the user portal will be available under the following URl.

```js
_http(s)://SERVER_HOST/t/TENANT_DOMAIN/user-portal_
```

If you are planning on setting up the repo in a development environment follow the steps below.

**Pre-requisites**

1.  Install [node](https://nodejs.org/en/download/) if you haven’t already(npm is already bundled with node).
2.  Install [maven](https://maven.apache.org/download.cgi) (Needed to run mvn commands).
3.  A running Identity Server v 5.10. (If you want to build from the source follow the instructions listed [here](https://github.com/wso2/product-is)).

**Configuring Identity Server**

> Default dev origin, hostname and port set for the User Portal is [https://localhost:9000.](https://localhost:9000.) So the following configurations will have to change accordingly if you change the port or any other configurations.

1.  Allowing Cross-Origin requests to the Identity Server.

Cross-origin requests will be blocked by default as a security measure. So you have to put the following CORS filter to the following config file in the WSO2 Identity Server distribution pack.

```js
<IS_HOME>/repository/resources/conf/templates/repository/conf/tomcat/web.xml.j2
```
```js
 CORS
    com.thetransactioncompany.cors.CORSFilter
    cors.allowOrigin
        https://localhost:9000 
    cors.supportedMethods
        GET, HEAD, POST, DELETE, OPTIONS, PATCH, PUT 
    cors.exposedHeaders
        Location 
 CORS
    /*
    REQUEST
    FORWARD 
```

2\. Add your hostname and port as a trusted FIDO2 origin.

Whitelist the dev URL in the FIDO configurations found in the following file.

```js
<IS_HOME>/repository/resources/conf/templates/repository/conf/identity/identity.xml.j2
```
```js
 {{fido.webauthn.enable}} 
    {% for origin in fido.trusted.origins %}
            {{origin}}
            {% endfor %}
            https://localhost:9000 
```

3\. Restart the Identity Server.

4\. Configure the callback URLs for the User Portal.

Log in to the management console [https://SERVER_HOST/carbon](https://localhost:9443/carbon/application/configure-authentication-flow.jsp?spName=travelocity.com)

Go to service provider listing and click on edit in User Portal portal list item.

![Service Provider Listing](https://cdn-images-1.medium.com/max/800/1*ArGKJ2HGBymTJYrYkW5LTA.png)

In the edit view, expand the “Inbound Authentication Configuration” section, and further expand the “OAuth/OpenID Connect Configuration”. Click on edit under User Portal list item.

![OAuth/OpenID Connect Configuration Editing](https://cdn-images-1.medium.com/max/800/1*8GEH34emQnw4oa_Wx5cBew.png)

You can simple change the port to _9000_ or you can add a regexp as follows.

```js
regexp=(https://localhost:9443/user-portal/login|https://localhost:9000/user-portal/login)
```
![Changing callback URL](https://cdn-images-1.medium.com/max/800/1*DyKyRbreFrhUuugNlelH9A.png)

**Building the Identity Apps repo**

You can fork the original repo or directly clone the original repo and start working on it, but I suggest you create your own fork.

```js
git clone [https://github.com/brionmario/identity-apps](https://github.com/wso2/identity-apps)  
cd [identity-apps](https://github.com/wso2/identity-apps)  
mvn clean install or npm run build
```

**Running the User Portal in dev mode**

After the build is finished, navigate to the user portal directory and run the portal using the webpack dev server.

```js
cd apps/user-portal  
npm start
```

The portal will be served from [https://localhost:9000/user-portal](https://localhost:9000/user-portal)

![User Portal in Dev Mode](https://cdn-images-1.medium.com/max/800/1*g30DebU_d7xnNbT4s2kJrQ.png)

Signing off… ✌️❤️
