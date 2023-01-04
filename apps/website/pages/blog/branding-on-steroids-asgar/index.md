---
slug: "/posts/branding-on-steroids-asgar/"
date: "2022-07-24"
title: "Branding On Steroids"
description: "In a previous blog post 👈, I introduced Asgardeo Organization Branding capabilities. And since then, we have added quite a few cool nifty features that could really help users to achieve advanced…"
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
  - "asgardeo"
  - "branding"
  - "organization-management"
  - "ciam"
  - "idaas"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*8Xc8la1Vu5J7OafVyw21lg.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*8Xc8la1Vu5J7OafVyw21lg.png"
  - "https://cdn-images-1.medium.com/max/2600/1*0obr30ejPhFU7t26csMRvQ.png"
  - "https://cdn-images-1.medium.com/max/2600/1*7IgtkAcPgbvvFbEdQjxEgA.gif"
  - "https://cdn-images-1.medium.com/max/2600/1*X03Tv9CTRk_jAKq-3Jo7UA.png"
  - "https://cdn-images-1.medium.com/max/2600/1*0aPaLOQbXX3H1aIVInR3mw.png"
  - "https://cdn-images-1.medium.com/max/2600/1*W8FSgL4RJvPsDsfyIiyucQ.png"
  - "https://cdn-images-1.medium.com/max/2600/1*PVa3j8r3mLwPrDUr3COCug.png"
  - "https://cdn-images-1.medium.com/max/2600/1*-cbIJty0KxmM5RCIt_t2tA.png"
  - "https://cdn-images-1.medium.com/max/2600/1*Pazqfoi2xNTQ6mv8PSNanA.png"
  - "https://cdn-images-1.medium.com/max/2600/1*R5WOWKmyNlv3F2l4dlIc3w.png"

---

# Branding On Steroids

![](https://cdn-images-1.medium.com/max/800/1*8Xc8la1Vu5J7OafVyw21lg.png)

In a previous [blog post](https://medium.com/identity-beyond-borders/introducing-asgardeo-organization-branding-c0b8d66b8074) 👈, I introduced [Asgardeo Organization Branding](https://wso2.com/asgardeo/docs/guides/branding/) capabilities. And since then, we have added quite a few cool nifty features that could really help users to achieve advanced customizations whilst staying in the low code realm.

This blog post will take a sample scenario and compare the newly added capabilities.

### TL;DR:

To have a branding like the sign-in page of this application 👉 [https://drogo-nft-demo.web.app](https://drogo-nft-demo.web.app/), update the branding configurations of your organization with [these values](https://gist.github.com/brionmario/10dc6d1a60620aa6dd8a0208e771066d).

And also watch this how to view 👉 [https://www.youtube.com/watch?v=yXhSaNUMMN4&ab_channel=Asgardeo](https://www.youtube.com/watch?v=yXhSaNUMMN4&ab_channel=Asgardeo)

### Scenario 🏜

![](https://cdn-images-1.medium.com/max/800/1*0obr30ejPhFU7t26csMRvQ.png)

**Drogo** is a new startup company that specializes in [NFTs](https://en.wikipedia.org/wiki/Non-fungible_token). They have a [marketplace application](https://drogo-nft-demo.web.app/) that is hosted on Firebase.

They want to let their users log in to their marketplace application and also they require to drive new users to register with their service via the application. This is where Asgardeo comes in. They’ve used the [Asgardeo React SDK](https://github.com/asgardeo/asgardeo-auth-react-sdk) to integrate login capabilities to the application.

Here’s the progress until now!

![Drogo Application initial flow](https://cdn-images-1.medium.com/max/800/1*7IgtkAcPgbvvFbEdQjxEgA.gif)

**Did you notice what’s lacking here?**

Of course, the branding transition sticks out like a sore thumb.

Let’s fix it. shall we…

### Get Started 🚀

I will first log in to [Asgardeo Console](https://console.asgardeo.io) with the credentials of my organization(`drogo`). And I will navigate to `Develop > Branding` to reach the branding feature.

![Branding Feature in Asgardeo Console](https://cdn-images-1.medium.com/max/800/1*X03Tv9CTRk_jAKq-3Jo7UA.png)

> ⚠️ Always remember to **Go Live** if you want your changes to appear

### General Settings ⚙️

Here we can configure the general settings of the company branding. I will explain in brief what each of these fields does.

> Also, I will be adding the values i’m using so it’ll be easier if you decide to follow along 😉

#### **Site Title**

This is the text that appears in the browser tab when you shower over, in social media shares, etc.

_Value Used_

```js
Login | Drogo
```

_In Action_

![](https://cdn-images-1.medium.com/max/800/1*0aPaLOQbXX3H1aIVInR3mw.png)

#### **Copyright Text**

Text that appears at the footer of the login screens.

_Value Used_

```js
© Drogo 2022. All Rights Reserved.
```

_In Action_

![](https://cdn-images-1.medium.com/max/800/1*W8FSgL4RJvPsDsfyIiyucQ.png)

> For free-tier subscriptions, the Powered by Asgardeo label will display on the Asgardeo-powered interfaces when branding is published.

#### **Contact Email**

The email address appears in error pages and other important areas where your customer might want to contact you for additional support.

_Value Used_

```js
support@drogo.io
```

_In Action_

![](https://cdn-images-1.medium.com/max/800/1*PVa3j8r3mLwPrDUr3COCug.png)

### Design 🎨

#### Theme

This is the base for your design. We currently support **Dark 🌑** & **Light 🔆** variants to start with.

Since the Drogo NFT application has a darker tone, I will start with the Dark theme.

![Theme Selection](https://cdn-images-1.medium.com/max/800/1*-cbIJty0KxmM5RCIt_t2tA.png)

#### Theme Preferences

Now I can start customizing the overall look and feel based on the organization’s branding guidelines.

Following is the color palette salvaged from the company’s branding guidelines.

![Color Pallete](https://cdn-images-1.medium.com/max/800/1*Pazqfoi2xNTQ6mv8PSNanA.png)

#### Theme Preferences > Images

**Logo**

This is the image that appears on top of the Login Box. You can add a hosted URL of an image and also an [Alt text](https://moz.com/learn/seo/alt-text) for accessibility.

> For better performance, use an image that’s `600x600` pixels and less than `1mb` .

**Favicon**

This is the image that appears on the browser tab. You can also add a URL of a hosted favicon image here.

> For better results, use an image with a square aspect ratio that’s at least `16x16` pixels in size.

```js
images:
    logo:
        alt: Drogo Logo
        url: https://drogo-nft-demo.web.app/images/dragon-face-85x.svg
    favicon:
        url: https://drogo-nft-demo.web.app/favicon.ico
```

#### Theme Preferences > Color Palette

**Primary Color**

Color of the primary action buttons, hyperlinks, etc.

**Secondary Color**

Color of the secondary action buttons like cancel buttons, etc.

```js
colors:
    primary: #673ab7
    secondary: #ff8139
```

#### Theme Preferences > Page

**Background Color**

The background color of the body of the pages in the login screens.

**Font Color**

The font color of the pages instead of hyperlinks. If you change this value, it’ll affect the overall font color of elements like headers, input labels, etc. You will be able to have more fine-grained control over the input label colors in later sections.

```js
page:
    background: #190827
    font_color: #ffffff
```

#### Theme Preferences > Footer

**Border Color**

The top border color of the page footer.

**Font Color**

The font color of the copyright text and other links in the footer.

```js
footer:
    border: #333333
    font_color: #9b9b9b
```

#### Theme Preferences > Font

The font-face of the login pages.

**Use a Web Safe Font**

Pick a [web-safe font](https://blog.hubspot.com/website/web-safe-html-css-fonts) (fonts that are pre-installed by many operating systems) like Arial, Times New Roman, etc.

**Import a Font**

Import a font from a CDN or a font service like [google](https://fonts.google.com/).

**Import a Font > Import URL**

Enter a URL to import a custom font from a font service.

**Import a Font > Font Family**

Name of the font family you are planning to import. This is usually documented in the font service.

```js
font:
    import_url: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap
    family: 'Inter', sans-serif
```

#### Theme Preferences > Headings

**Font Color**

Font color of the H1, H2, H3, H4, H5 & H6 headings in the login pages.

```js
headings:
    font_color: #ffffff
```

#### Theme Preferences > Buttons > Primary

These buttons appear as the primary actions in the login flows.

**Font Color**

Color of the primary button’s font.

**Border Radius**

Border radius of the primary button.

> The background color of the primary button will be infered from the primary color defined in the color pallette.

#### Theme Preferences > Buttons > Secondary

These buttons appear as the secondary actions in the login flows such as cancel buttons, etc.

**Font Color**

Color of the secondary button’s font.

**Border Radius**

Border radius of the secondary button.

> The background color of the secondary button will be infered from the secondary color defined in the color pallette.

#### Theme Preferences > Buttons > External Connections

These buttons are used to display external IdPs and social connections (Google, Facebook, etc) inside the login box.

**Background Color**

The background color of the button.

**Font Color**

Color of the button’s font.

**Border Radius**

Border radius of the button.

```js
buttons:
    primary:
        font_color: #ffffff
        broder_radius: 20px
    secondary:
        font_color: #000000
        broder_radius: 20px
    external:
        background: #24292e
        font_color: #000000
        broder_radius: 20px
```

#### Theme Preferences > Login Box

**Background Color**

The background color of the login box.

**Font Color**

The color of the text inside the login box including text, input labels, etc.

> If you need to change input labels to a different color, that can be done from the Inputs section.

**Border Color**

The border color of the login box.

**Border Width**

The border width of the login box.

**Border Radius**

The border-radius of the login box.

```js
login_box:
    background: #9013FE -> ALPHA 15 
    font_color: #ffffff
    border:
        color: #6821a7
        radius: 12px
        width": 1px
```

#### Theme Preferences > Inputs

**Background Color**

The background color of the text inputs, checkboxes, etc.

**Font Color**

The font color of the characters inside the text input fields, ✔️ of checkboxes, etc.

**Border Color**

The border color of the text inputs, checkboxes, etc.

**Border Radius**

The border-radius of the text inputs.

#### Theme Preferences > Inputs > Input Labels

**Font Color**

The font color of the labels of text inputs, checkboxes, etc.

```js
inputs:
    font_color: #ffffff
    background: #22043c
    border_color: #292929
    border_radius: 4px
    labels:
        font_color: #cccccc
```

### Advanced 🔗

And finally, under advanced, we can configure the privacy, terms of service (TOS), and also the cookie policy URLs.

> If these are not configured when the branding is live, the privacy and TOS links will not be visible in the footer and the cookie policy popup will also be hidden.

```js
privacy_policy: https://drogo-nft-demo.web.app/privacy
terms_of_ervice: https://drogo-nft-demo.web.app/terms-of-service
cookie_policy: https://drogo-nft-demo.web.app/cookie-policy
```

### Final Outcome 🎉

![](https://cdn-images-1.medium.com/max/800/1*R5WOWKmyNlv3F2l4dlIc3w.png)

> To see for yourself, go to [https://drogo-nft-demo.web.app](https://drogo-nft-demo.web.app/) and click on `Sign In`

### Live Demo 📹

<iframe src="https://www.youtube.com/embed/yXhSaNUMMN4?feature=oembed" width="100%" height="393" frameborder="0" scrolling="no" />

### Concluding Remarks 🔚

[Asgardeo](https://wso2.com/asgardeo/) RnD team is tirelessly working on improving the feature further.

If you have any further requests or suggestions, please reach out to the team through [our community](https://iam4devs.wso2.com/asgardeo-1) or via [asgardeo-help@wso2.com](mailto:asgardeo-help@wso2.com).

Signing off… ✌️❤️

[https://youtu.be/yXhSaNUMMN4](https://youtu.be/yXhSaNUMMN4)

### References

*   [Official Documentation on Branding](https://wso2.com/asgardeo/docs/guides/branding)
*   [Drogo NFT application source code](https://github.com/brionmario/asgardeo-integrations/tree/main/apps/drogo-nft)
*   [Introductory blog](https://medium.com/identity-beyond-borders/introducing-asgardeo-organization-branding-c0b8d66b8074)
