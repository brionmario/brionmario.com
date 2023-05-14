---
slug: "/posts/how-to-deploy-wso2-identity-server-my-account-on-an-external-server/"
date: "2021-09-30"
title: "How to deploy WSO2 Identity Server My Account on an external server."
description: "My Account (previously known as User Portal in Identity Server 5.10.0) is the end-user dashboard of the WSO2 Identity Server(WSO2 IS). With the My Account application, users can manage their…"
authors:
  - id: "ca410be341b9"
    name: "Brion Mario"
    username: "brionmario"
    image: "https://miro.medium.com/fit/c/176/176/1*VyzrTxkrThOJKKnvx20UTg.png"
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
ogImage: "https://cdn-images-1.medium.com/max/2600/1*vR9zGGWPCS8NSpck2Gl2DA.png"
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

I **recommend** the latter option and will explain the process of building a compatible artifact.Prerequisites

#### Download and Install an Identity Server Instance

In order to follow along, you’ll need an Identity Server instance running in your local environment. If you don’t have one, please download and install the latest version from the [official website](https://wso2.com/identity-server/).

At the time of writing this post, Identity Server 5.12.0 is yet to be released and is still in the Alpha phase. I will be the version [5.12.0-alpha4](https://github.com/wso2/product-is/releases/tag/v5.12.0-alpha4).

#### Make My Account Configurations Editable in Console

Since we are overriding the default behavior of the My Account application, we need to do some modifications to the application’s configurations from the [Console](https://wso2.com/blogs/thesource/whats-new-with-wso2-identity-server-5.11/).

By default, My Account is marked as a read-only application on the Console to avoid unintended misconfigurations but we can override this behavior via the `deployment.toml` .

Open up `deployment.toml` file located at `<IS_HOME>/repository/conf/deployment.toml` and add the following configuration. Restart the server once you’re done.

```js
[system_applications]
read_only_apps = []
```

### Set-up the Codebase

First, we need to check out the <a href="https://github.com/wso2/identity-apps" class="fenced-link">identity apps</a> source code in order to set up the development environment. Make sure you follow the README and set up the [required tools](https://github.com/wso2/identity-apps/tree/v1.2.574#setup-build-environment).

It’s recommended to fork the original repository and checkout to your own copy so you could persist any changes that you do.

I’m going to fork my clone.

```js
$ git clone [https://github.com/brionmario/identity-apps.git](https://github.com/brionmario/identity-apps.git)
```

And then, I’m setting up a new remote for the original repository called `upstream` .

```js
$ git remote add upstream [https://github.com/wso2/identity-apps.git](https://github.com/wso2/identity-apps.git)
```

At the time of writing this post, the latest tag of `identity-apps` is [v1.2.574](https://github.com/wso2/identity-apps/releases/tag/v1.2.574). I will be using that in the demonstration.

Execute the following command to fetch all the tags and checkout to a new branch based on the tag we require (v1.2.574).

```js
$ git fetch --all --tags --prune
```
```js
$ git checkout tags/v1.2.574 -b external-deploy
```

### Build the Project

Now that we have checked out the code base, let’s install the dependencies and build the entire project.

From the root of the project, execute the following commands.

```js
# Installs all the dependencies and Bootstrap the project  
$ npm run bootstrap
```
```js
# Build all the modules and apps.  
$ npm run build
```

### Deployment

#### Deploy on an external Java EE Server

Perform the following steps in order to build the application without any Java util dependencies.

1.  Navigate to the My Account source.

```js
$ cd apps/myaccount
```

2\. Build the app with either command.

```js
$ npm run build:external
```
```js
# Alternative command  
$ npm run build:prod -- --env IS_DEPLOYED_ON_EXTERNAL_SERVER=true
```

3\. Grab the build artifacts from `build/myaccount` folder and deploy them on your server.

I’m using a Tomcat server so I’ll be copying the artifacts to `<TOMCAT_HOME>/webapps` .

4\. Configure Authorized Redirect URLs & Allowed Origins

If you try to access the application now (in my case via [http://localhost:8080/myaccount](http://localhost:8080/myaccount/)), you’ll get an error like below.

![Invalid Callback Error](https://cdn-images-1.medium.com/max/800/1*DURBP4z6gVkKuhhUbSf3xw.png)

The reason for this is that the Authorized Redirect URLs configured in the Application configurations do not have an entry for `http://localhost:8080/myaccount/login` .

Navigate to the Console application via [https://localhost:9443/console](https://localhost:9443/console) and Go to the **Applications** section under **Develop**.

Locate the **My Account** application and go to its settings.

Under `protocol` tab, add `http://localhost:8080/myaccount/login` as an `Authorized Redirect URL`.

Also, add `http://localhost:8080` as an `Allowed origin` to allow cross-origin requests.

![Configure Allowed Redirect URLs and CORS Origins](https://cdn-images-1.medium.com/max/800/1*B2tPKoNbLW-VJImH4PuJhg.png)

Now I can see the following when I access <a href="http://localhost:8080/myaccount/" class="fenced-link">http://localhost:8080/myaccount/</a>

![My Account on Tomcat](https://cdn-images-1.medium.com/max/800/1*TtVxNYVLKgdowCZJLQ5LTg.png)

Success! 🎉

#### Deploy on a static server on the root context

Perform the following steps in order to build the application with an `index.html` on the root context without and JSP files or Java EE server-specific folders etc.

1.  Navigate to the My Account source.

```js
$ cd apps/myaccount
```

2\. Modify the `appBaseName` to `“”` (Empty quotes) in `public/deployment.config.json`.

![App Base Name Configuraration](https://cdn-images-1.medium.com/max/800/1*IYeX-VhoFiuKpTLcw-HZ8g.png)

> By default, this is set to `myaccount` and it will be used by webpack as a base path for constructing static resource paths in the index files.

3\. Build the app with either command.

```js
$ npm run build:external:static
```
```js
# Alternative command  
$ npm run build:prod -- --env IS_DEPLOYED_ON_EXTERNAL_SERVER=true --env SERVER_TYPE=static
```

4\. Make sure the paths in `index.html` are as follows.

> `contextPathGlobal` should be empty and all the static asset paths should begin with a `/` (forward slash).

```js
 You need to enable JavaScript to run this app. 
```

5\. Grab the build artifacts from `build/myaccount` folder and deploy them on your server.

6\. Configure Authorized Redirect URLs & Allowed Origins

I’m going to host the artifacts on [Firebase](https://www.google.com/aclk?sa=l&ai=DChcSEwjRkNSyjaXzAhWJMyoKHVO4DjYYABAAGgJ0bQ&sig=AOD64_2M-ueHqyYsHaQDYBKNRQsW0Vq68w&q&nis=1&adurl&ved=2ahUKEwjM2suyjaXzAhX38HMBHbi5CvsQ0Qx6BAgCEAE). Hence, I need to update `Authorized Redirect URLs` and `Allowed Origins` as follows. Modify them accordingly with your URLs.

![Static Deployment — Configure Allowed Redirect URLs and CORS Origins](https://cdn-images-1.medium.com/max/800/1*MOfUoA4_Zu-3LYOFASmWkQ.png)

Now I can see the following when I access the firebase site URL.

![My Account on Firebase](https://cdn-images-1.medium.com/max/800/1*X9g8IPt7N9X2Lxo2j0Ejqg.png)

Success! 🎉

### Conclusion

Hope you found this blog post useful

Signing off… ✌️❤️
