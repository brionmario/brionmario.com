---
slug: "/posts/oauth-2-0-authorization-code-flow-react-spa-demo-using-wso2-identity-server/"
date: "2020-03-17"
title: "OAuth 2.0 Authorization code flow React SPA demo using WSO2 Identity Server"
description: "This blog post will help you test out the OAuth2 authorization code flow in a React SPA application using the WSO2 Identity Server. In the edit view, expand the “Inbound Authentication Configuration”…"
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
  - "oauth2"
  - "authorization-code"
  - "react"
  - "react-oidc"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*Z7rCncgTk8CyubIxl2bj_Q.png"
ogImage: "https://cdn-images-1.medium.com/max/2600/1*Z7rCncgTk8CyubIxl2bj_Q.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*Z7rCncgTk8CyubIxl2bj_Q.png"
  - "https://cdn-images-1.medium.com/max/2600/1*SynoQXI02y06qiOioh3HEw.png"
  - "https://cdn-images-1.medium.com/max/2600/1*0thnBBAvC9rwZRsSitIDdQ.png"
  - "https://cdn-images-1.medium.com/max/2600/1*3r0blRF6ZJYOn8pKIMSqEQ.png"
  - "https://cdn-images-1.medium.com/max/2600/1*XHiIlzNedeFFI2Fuk8hRVw.png"
  - "https://cdn-images-1.medium.com/max/2600/1*6qO406jZxs7tOMECH0oqVg.png"
  - "https://cdn-images-1.medium.com/max/2600/1*9n5bY6aCMryqcu6SVDE6tw.png"

---

# OAuth 2.0 Authorization code flow React SPA demo using WSO2 Identity Server

This blog post will help you test out the OAuth2 authorization code flow in a React SPA application using the WSO2 Identity Server.

> Read more about the OAuth 2.0 Authorization Code Grant from [here](https://is.docs.wso2.com/en/latest/learn/authorization-code-grant/)

**Pre-requisites**

1.  Install [node](https://nodejs.org/en/download/) if you haven’t already(npm is already bundled with node).
2.  A running Identity Server. (If you want to build from source follow the instructions listed [here](https://github.com/wso2/product-is)).
3.  IDE or code editor of your choice.

**Setting up a service provider in WSO2 Identity Server.**

Log in to the management console [https://localhost:9443/carbon](https://localhost:9443/carbon)

User Service Providers, click on +Add and create a new service provider.

![Create a Service Provider](https://cdn-images-1.medium.com/max/800/1*Z7rCncgTk8CyubIxl2bj_Q.png)

In the edit view, expand the “Inbound Authentication Configuration” section, and further expand the “OAuth/OpenID Connect Configuration”.And click on “Configure”.

![Configuring OAuth/OIDC](https://cdn-images-1.medium.com/max/800/1*SynoQXI02y06qiOioh3HEw.png)

In the settings page,

1.  Select OAuth Version as 2.0
2.  Select “Code” as the grant type.
3.  And add the callback URL. (The sample runs on [https://localhost:9000](https://localhost:9000), therefore the callback URL has to be [https://localhost:9000/login](https://localhost:9000/login)).
4.  Click on the “Update” button.

![OAuth/OIDC Settings](https://cdn-images-1.medium.com/max/800/1*0thnBBAvC9rwZRsSitIDdQ.png)

**Setting up the demo app.**

You can fork the sample repo or directly clone and start working on it, but I suggest you create your own fork.

```js
git clone [https://github.com/brionmario/is-samples.git](https://github.com/brionmario/is-samples.git)  
cd is-samples/react-oidc  
npm install
```

After all the node dependencies are being installed, you can configure the app settings.

Open the source code using an IDE/code editor and all the app configurations are available under the config.js file.

Follow the below steps to set up the application.

1.  Copy the “OAuth Client Key” and “OAuth Client Secret” from the service provider that you just created.

![Retrieving the Client ID and Client Secret](https://cdn-images-1.medium.com/max/800/1*3r0blRF6ZJYOn8pKIMSqEQ.png)

2\. Modify the CLIENT\_ID and CLIENT\_SECRET attributes of the config.js file.

```js
export const CONFIG = {
    TOKEN_ENDPOINT: "https://localhost:9443/oauth2/token",
    AUTHORIZE_ENDPOINT: "https://localhost:9443/oauth2/authorize",
    RESPONSE_TYPE: "code",
    SCOPE: "openid",
    REDIRECT_URI: "https://localhost:9000/login",
    CLIENT_ID: "eBQwwWgf5TasqSUBnUHeoKVy51Ma",
    CLIENT_SECRET: "",
    GRANT_TYPE: "authorization_code",
    CLIENT_URL: "https://localhost:9000",
    LOGOUT_URL: "https://localhost:9443/oidc/logout",
    COOKIE_PATH: "/"
}; 
```

3\. Configure IS to allow our application to access the APIs.

Since we are running our application on [https://localhost:9000](https://localhost:9000), IS will automatically block requests made to the IS endpoints. In order to allow CORS requests, please put the following CORS filter to the following config file in WSO2 Identity Server distribution pack.

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

4\. Run the application.

From inside the react-oidc folder, execute the following command to run the application using webpack dev server.

```js
npm run demo
```

or if you are using command prompt or powershell, use the following commands.

```js
# For command prompt  
npm run demo-cmd
```
```js
#For power shell  
npm run demo-pshell
```

If the browser window doesn’t open automatically, manually navigate to the [https://localhost:9000](https://localhost:9000).

The blow screen will initially be presented to you if everything goes as expected 😁.

![Initial Window](https://cdn-images-1.medium.com/max/800/1*XHiIlzNedeFFI2Fuk8hRVw.png)

Click on the “LOGIN” button and you will be redirected to the WSO2 Identity Server authentication page. Enter your credentials and click on “CONTINUE”.

![WSO2 Identity Server authentication page](https://cdn-images-1.medium.com/max/800/1*6qO406jZxs7tOMECH0oqVg.png)

If the login is successful, you will see the “Token Response” and the “ID Token Response” on the UI.

![Responses](https://cdn-images-1.medium.com/max/800/1*9n5bY6aCMryqcu6SVDE6tw.png)

Explore the source code further especially the API requests under the actions folder. If you have any issues or concerns, feel free to raise them at [https://github.com/brionmario/is-samples/issues](https://github.com/brionmario/is-samples/issues).

Signing off… ✌️❤️
