---
slug: "/posts/how-to-customize-the-user-portal-in-wso2-identity-server-5-10-0/"
date: "2020-05-10"
title: "How to customize the User Portal in WSO2 Identity Server 5.10.0"
description: "WSO2 Identity Server 5.10.0 is now available for everyone to use. And with that marked the introduction of the much-anticipated User Portal which is the successor to the dashboard. It was written…"
authors:
  - id: "ca410be341b9"
    name: "Brion Mario"
    username: "brionmario"
    image: "https://miro.medium.com/fit/c/176/176/1*vSMWBwWmwDsLJ1px0jb07g.jpeg"
    bio: "Software Engineer working at WSO2."
    twitterScreenName: "brion_mario"
readingTime: "6 min read"
draft: false
tags:
  - "wso2"
  - "identity-server"
  - "user-portal"
  - "theming"
  - "semantic-ui"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*OyKtARg0RWhlq4fxijiXWg@2x.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*OyKtARg0RWhlq4fxijiXWg@2x.png"
  - "https://cdn-images-1.medium.com/max/2600/1*LIlXpVhBWQ3vtFtcBjMsWQ.png"
  - "https://cdn-images-1.medium.com/max/2600/1*CnRNIPFIAOnBRX4-DdonbA@2x.png"
  - "https://cdn-images-1.medium.com/max/2600/1*p6POKSSYDsU8aVY3hZYVwg.png"
  - "https://cdn-images-1.medium.com/max/2600/1*44s56-3srdsOqsHk0J_cmQ.png"
  - "https://cdn-images-1.medium.com/max/2600/1*YMuNH-2wT5xsmprkey8ajA.png"
  - "https://cdn-images-1.medium.com/max/2600/1*9CJN1lRL1-xrYQQ47PCzjg.png"
  - "https://cdn-images-1.medium.com/max/2600/1*bqQB4UOrRerIMJRcI31BSg.png"
  - "https://cdn-images-1.medium.com/max/2600/1*AmD8fHCohMbMy_rRSBUH0A.png"
  - "https://cdn-images-1.medium.com/max/2600/1*BGomyRUFdRouaiPm2dKj7A.png"
  - "https://cdn-images-1.medium.com/max/2600/1*tf-h5R6gse6UDMWv5OKykA.gif"

---

# How to customize the User Portal in WSO2 Identity Server 5.10.0

![](https://cdn-images-1.medium.com/max/800/1*OyKtARg0RWhlq4fxijiXWg@2x.png)

[WSO2 Identity Server 5.10.0](https://wso2.com/identity-and-access-management) is now available for everyone to use. And with that marked the introduction of the much-anticipated User Portal which is the successor to the dashboard. It was written from scratch and all the front-end portals are now intended to use a centralized theming mechanism paving the way for easy customization.

> Click [here](https://wso2.com/blogs/thesource/wso2-identity-server-5-10-0-is-here/) to read more about the new features in 5.10.0.

#### Inspiration

I’m a night owl 🦉 hence the first thing I look for in a platform is the dark mode. Recently, Facebook rolled out its new redesigned portal with a dark mode and I immediately switched to it and has been loving the soothing color scheme and design. So, I thought of using that as a reference for this demo.

![\[Reference\] Facebook Dark Mode](https://cdn-images-1.medium.com/max/800/1*LIlXpVhBWQ3vtFtcBjMsWQ.png)

#### Checklist

In this post, I’ll try to cover the following steps in customizing the User Portal.

✅ Change the default theme to dark mode.

✅ Change the branding (Logo and Product title, Favicons, Copyright, etc.)

✅ Deploy the changes in the web app.

#### Pre-requisites

Okay, first things first, let’s check out the corresponding [identity apps](https://github.com/wso2/identity-apps) source code from the repo and set it up in the development environment. Follow [this blog](https://medium.com/@brionmario/how-to-set-up-wso2-identity-server-user-portal-in-an-development-environment-d406d15ec703) for instructions on setting up the dev environment and instead of checking out the master branch, you can check out the v1.0.72 tag since v1.0.72 of identity-apps was used in IS 5.10.0.

I’m working on my own fork of identity-apps and first I’m going to fetch all the tags and check out the v1.0.72 tag to a new branch.

```js
$ git fetch --all --tags --prune
```
```js
$ git checkout tags/v1.0.72 -b feature-dark-theme-demo
```

#### Change the default theme to dark mode

A customized version of the **default** theme\[1\] in the Semantic UI LESS package has been used to achieve the look and feel of the User Portal which is packed with 5.10.0 distribution.

![Default user portal theme](https://cdn-images-1.medium.com/max/800/1*CnRNIPFIAOnBRX4-DdonbA@2x.png)

If you navigate to **modules/theme/src/themes** folder, you would see the default theme overrides. Check the Semantic UI documentation if you wish to learn more about Semantic UI theming \[2\].

All the theme global variable overrides can be found in **modules/theme/src/themes/default/globals/site.variables** file and for the full set of variables, refer the original theme variables file\[3\].

Let’s dive in and override the variables in **site.variables**.

1.  First I’m going to change the primary color of the portal from orange(#FF5000) to Facebook’s primary color which is a shade of blue(#2D88FF).

Add a new color under the site colors and let’s call it **facebookBlue 😇**.

```js
/*-------------------  
    Site Colors  
--------------------*/
```
```js
@facebookBlue     : #2d88ff;
```

Now change the primary color variable.

```js
/*-------------------  
    Brand Colors  
--------------------*/
```
```js
@primaryColor        : @facebookBlue;
```

2\. Next, we can change the page background color from white to dark gray and change the default text color to a lighter shade.

Add a new variable under the brand colors and let’s call it **globalBackgroundColor.**

```js
/*-------------------  
    Brand Colors  
--------------------*/  
  
@globalBackgroundColor: #18191a;
```

Override the **@pageBackground** variable.

```js
/*-------------------  
        Page  
--------------------*/
```
```js
@pageBackground      : @globalBackgroundColor;  
@textColor           : #e4e6eb;
```

You can now build the theme module by running the following command and check the results reflected on the dev server.

```js
# from inside modules/theme
```
```js
$ npm run build
```

You will see something like the following. Quite frankly it looks like an uncooked pop tart but don’t worry, we can fix it 😁.

![Results after step 1 & 2](https://cdn-images-1.medium.com/max/800/1*p6POKSSYDsU8aVY3hZYVwg.png)

As you can see, we have to change the backgrounds of the header, footer, side navigation, and content cards.

3\. Change the header & footer background.

Add a new variable under the brand colors and let’s call it **globalForegroundColor.**

In **modules/theme/src/themes/default/collections/menu.variables**

```js
@background: @globalForegroundColor;
```

4\. The side panel background in Facebook UI is the same as the page background. The reusable variable that we created in step 2 will come in handy in this scenario.

In **modules/theme/src/themes/default/collections/menu.overrides**

```js
.ui.vertical.menu {  
    &.side-panel {  
        background: @globalBackgroundColor;  
        
        // Other styles  
    }  
}
```

5\. Modify the content card background color.

In **modules/theme/src/themes/default/views/card.variables**

```js
@background: @globalForegroundColor;
```

Now let’s do a status check to see the progress of our work by rebuilding the theme module. The changes should be reflected on the running dev server in no time.

![Progress at the end of step 5](https://cdn-images-1.medium.com/max/800/1*44s56-3srdsOqsHk0J_cmQ.png)

You can clearly see that we are getting somewhere. But there are obvious issues such as the harsh borders around the cards and also the side navigation styles look a bit weird. Since we understand the procedure, now we can play around with the styles and get the desired effect with some trial and error.

#### Change the branding

Now that we are done with the styling, let’s change the product branding.

1.  Change the product logo.

**Method 1 (Recommended)**

If you wish to change the logo without touching the compiled javascript bundle, you can do the following to override the existing WSO2 logo with CSS.

I added an owl icon I downloaded from [Flaticon.com](https://www.flaticon.com/)(Credits should go to Freepik\[4\]) to the **modules/theme/src/themes/default/assets/images** folder.

In **modules/theme/src/definitions/globals/product.less** replace the existing styles in **.product-logo** class with the following.

```js
._product-title_ {  
    ._product-logo_ {  
        width: 25px;  
        height: 25px;  
        vertical-align: text-top;  
        margin-right: 5px;  
        background: url(assets/images/owl.svg) no-repeat;  
        background-size: auto;  
  
        svg {  
            display: none;  
        }  
    }  
      
    // Other styles  
}
```

**Method 2**

Add the downloaded icon to the **modules/theme/src/themes/default/assets/images** folder.

In **modules/theme/src/index.js** replace **Logo** with  the path to the new icon.

```js
_export const_ Logo = require("../lib/assets/images/owl.svg");
```

Build user-portal artifacts.

```js
npx lerna run build — scope @wso2is/user-portal
```

Replace **main.js** & **main.js.map** inside the user-portal web app with the same from **apps/user-portal/build/user-portal.**

2\. Change the product title & Copyright.

In the IS pack, the User Portal web app is available on the following path.

```js
_<IS_HOME>/repository/deployment/server/webapps/user-portal_
```

In **index.jsp** add the following two entries in the **runConfig** window object.

```js
window["runConfig"] = {  
    ...  
    applicationName: "NIGHT OWL EXPRESS",  
    copyrightText: "Night Owl Express © 2020"  
};
```

3\. Change the Favicon and Title.

Replace **favicon.ico** at the root of the user-portal web app with the desired icon. You can use an online generator like [favicon.i](https://favicon.io/)o to generate a favicon for free.

To change the title, in **index.jsp** file of the web app, change the <title> tag.

```js
<title>Night Owl Express</title>
```

#### Deploy the changes in the web app

We are at the final step of the process which is the deployment. Follow the sequence of steps listed below to deploy the changes performed in the previous steps.

1.  Build the theme module.

```js
# from inside modules/theme
```
```js
$ npm run build
```

2\. Copy the artifacts to the web app.

The built artifacts will be available inside the lib folder. Copy everything to the clipboard and navigate to the user-portal web app in the IS pack.

![Theme module build artifacts](https://cdn-images-1.medium.com/max/800/1*YMuNH-2wT5xsmprkey8ajA.png)

As mentioned above, the user-portal web app is available in the following location.

```js
_<IS_HOME>/repository/deployment/server/webapps/user-portal_
```

Replace the contents inside **/libs/styles/css** with the copied artifacts.

NOTE: Make sure that you keep a backup of the original CSS folder.

[This diff](https://github.com/brionmario/blog-resources/blob/master/technical/how-to-customize-the-user-portal-in-wso2-identity-server-5.10.0/code/diff.patch) depicts the approach I took in order to achieve the following outcome.

![Overview Page](https://cdn-images-1.medium.com/max/800/1*9CJN1lRL1-xrYQQ47PCzjg.png)![Personal Info Page](https://cdn-images-1.medium.com/max/800/1*bqQB4UOrRerIMJRcI31BSg.png)![Security Page](https://cdn-images-1.medium.com/max/800/1*AmD8fHCohMbMy_rRSBUH0A.png)![Operations Page](https://cdn-images-1.medium.com/max/800/1*BGomyRUFdRouaiPm2dKj7A.png)![Final Demo](https://cdn-images-1.medium.com/max/800/1*tf-h5R6gse6UDMWv5OKykA.gif)

The final compiled theme bundle can be found [here](https://github.com/brionmario/blog-resources/tree/master/technical/how-to-customize-the-user-portal-in-wso2-identity-server-5.10.0/code/theme/lib).

Feel free to try this out and if you have any suggestions regarding the blog you can log an issue in [this repo](https://github.com/brionmario/blog-resources/issues) and also if you have any issues or suggestions regarding the user portal, please consider logging them [here](https://github.com/wso2/identity-apps/issues).

Happy Coding!

\[1\] [https://github.com/Semantic-Org/Semantic-UI-LESS/tree/master/themes/default](https://github.com/Semantic-Org/Semantic-UI-LESS/tree/master/themes/default)

\[2\] [https://semantic-ui.com/usage/theming.html](https://semantic-ui.com/usage/theming.html)

\[3\] [https://github.com/Semantic-Org/Semantic-UI-LESS/blob/master/themes/default/globals/site.variables](https://github.com/Semantic-Org/Semantic-UI-LESS/blob/master/themes/default/globals/site.variables)

\[4\] Icons made by Freepik [www.flaticon.com](http://www.flaticon.com)
