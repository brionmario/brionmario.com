---
slug: "/posts/how-to-add-a-custom-eslint-configuration-to-a-create-react-app-project/"
date: "2021-08-15"
title: "How to add a custom ESLint configuration to a Create React App project"
description: "Every front-end project should have some sort of static code analyzing tool. This will ensure that your team sticks to one coding style and avoids known anti-patterns in development. Arguably, one of…"
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
  - "eslint"
  - "typescript"
  - "javascript"
  - "create-react-app"
  - "react"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*j32lk541VB7qNNWbmUd-dQ@2x.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*j32lk541VB7qNNWbmUd-dQ@2x.png"
  - "https://cdn-images-1.medium.com/max/2600/1*QdthOmmdeSYlASN7ARjrfw.png"
  - "https://cdn-images-1.medium.com/max/2600/1*JOGUU2R4F1og_Xs0lksQDw.png"

---

# How to add a custom ESLint configuration to a Create React App project

![](https://cdn-images-1.medium.com/max/800/1*j32lk541VB7qNNWbmUd-dQ@2x.png)

### Background

Every front-end project should have some sort of static code analyzing tool. This will ensure that your team sticks to one coding style and avoids known anti-patterns in development.

Arguably, one of the best lint tools for JavaScript projects is [ESLint](https://eslint.org/). It supports a variety of plugins to extend the functionality and has rich east-to-use documentation. ESLint can also be configured to work with TypeScript projects hence previously dominated [TSLint](https://palantir.github.io/tslint/) was deprecated in favor of ESLint.

In this post, we will look at ESLint integration on both JavaScript and TypeScript based React Projects created with [Create React App](https://create-react-app.dev/) (CRA) boilerplate.

**Do I need a custom ESLint configuration?**

Probably not. Because Create React App comes with ESLint already integrated. They use their own [sharable ESLint configuration](https://github.com/facebook/create-react-app/tree/v4.0.3/packages/eslint-config-react-app) and this can be found under the **eslintConfig** object in `package.json`.

```js
 "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
```

If you are fine with using the configuration provided in the boilerplate, you can skip reading now 🙃.

> To checkout the rules and plugins used in **react-app** ESLint config, click [here](https://github.com/facebook/create-react-app/blob/v4.0.3/packages/eslint-config-react-app/index.js).

**Why use a custom configuration?**

Mind you that most of the ESLint rules are tailored for a specific individual or team. For example, using _single quotes_ over _double quotes_ will depend on preference.

It is always better to define your own lining rules based on your/team’s preference if you are working on a long-term project.
