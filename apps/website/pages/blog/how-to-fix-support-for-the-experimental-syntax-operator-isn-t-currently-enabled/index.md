---
slug: "/posts/how-to-fix-support-for-the-experimental-syntax-operator-isn-t-currently-enabled/"
date: "2022-08-06"
title: "How to fix “Support for the experimental syntax ‘<OPERATOR>’ isn’t currently enabled”"
description: "I recently played around with the @primer/doctocat-template Gatbsy theme and encountered the following stack trace while building the repository. It was originating from the…"
authors:
  - id: "ca410be341b9"
    name: "Brion Mario"
    username: "brionmario"
    image: "https://miro.medium.com/fit/c/176/176/1*vSMWBwWmwDsLJ1px0jb07g.jpeg"
    bio: "Software Engineer working at WSO2."
    twitterScreenName: "brion_mario"
readingTime: "3 min read"
draft: false
tags:
  - "babel"
  - "doctocat"
  - "primer"
  - "gatsby"
  - "transpilation"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*Y28_Yp7lfuaEdfM3OxPGmg.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*Y28_Yp7lfuaEdfM3OxPGmg.png"
  - "https://cdn-images-1.medium.com/max/2600/1*1jKbjnj1eatsiOqalGLA6g.png"
  - "https://cdn-images-1.medium.com/max/2600/1*KvVfa28ArmwF7CaxDAfHVg.png"

---

# How to fix “Support for the experimental syntax ‘<OPERATOR>’ isn’t currently enabled”

![](https://cdn-images-1.medium.com/max/800/1*Y28_Yp7lfuaEdfM3OxPGmg.png)

### Problem ❓

I recently played around with the [@primer/doctocat-template](https://github.com/primer/doctocat-template) [Gatbsy theme](https://www.gatsbyjs.com/docs/themes/) and encountered the following stack trace while building the repository.

![](https://cdn-images-1.medium.com/max/800/1*1jKbjnj1eatsiOqalGLA6g.png)

It was originating from the [@primer/gatsby-theme-doctocat](https://www.npmjs.com/package/@primer/gatsby-theme-doctocat) package which was listed as a dependency in the `@primer/doctocat-template`  project.

### Diagnosis ⛑

Upon inspection, I figured out that in the [layout.js](https://github.com/primer/doctocat/blob/%40primer/gatsby-theme-doctocat%404.0.0/theme/src/components/layout.js#L24) in the `gatsby-theme-doctocat` , the developers have used the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment" class="fenced-link">Logical Assignment</a> operator. Hence, the complaints from [Babel](https://babeljs.io/).

```js
title ||= component.displayName
description ||= component.description
```

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment" class="fenced-link">Logical Assignment</a> seems to be a new proposal that requires an extra babel plugin called <a href="https://babeljs.io/docs/en/babel-plugin-proposal-logical-assignment-operators" class="fenced-link">@babel/plugin-proposal-logical-assignment-operators</a> .

The stack trace was really helpful in this scenario since it clearly mentioned what should be done to fix the problem.

When I checked inside the [theme-package](https://github.com/primer/doctocat/tree/%40primer/gatsby-theme-doctocat%404.0.0/theme), I couldn’t find any `build` steps or `transpile` steps.

Also, someone had already opened up [an issue](https://github.com/primer/doctocat-template/issues/35) regarding the problem and the suggested solution to <a href="https://babeljs.io/docs/en/babel-plugin-proposal-logical-assignment-operators" class="fenced-link">@babel/plugin-proposal-logical-assignment-operators</a> package as a dev dependency did not fix it for me.

### The Caveat 🦄

The tricky thing here is that the problem lies in one of the dependencies of the template project. If this was origination from the source code of the project, we could have easily added the respective plugin inside a `.babelrc` and get away with it.

### Playing around with Babel 🧪

Since the root cause seems to be related to the `Logical Assignment` operator transpilation, I decided to see if I can transpile the <a href="https://www.npmjs.com/package/@primer/gatsby-theme-doctocat" class="fenced-link">@primer/gatsby-theme-doctocat</a> package from inside the template project.

Gatsby already ships with a default babel configuration and it looks to be a `.babelrc` as per the [official documentation](https://www.gatsbyjs.com/docs/how-to/custom-configuration/babel/#how-to-use-a-custom-babelrc-file). Which usually skips `node_modules` from being transpiled.

For use-cases like this, there are two possible options as per my knowledge.

1.  Extend the Gatsby webpack config and stop <a href="https://www.npmjs.com/package/@primer/gatsby-theme-doctocat" class="fenced-link">@primer/gatsby-theme-doctocat</a> from being excluded from transpilation by <a href="https://www.npmjs.com/package/babel-loader" class="fenced-link">babel-loader</a> as explained [here](https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config/#modifying-the-babel-loader).
2.  Add a `babel.config.json` (not a `.babelrc` check the NOTE below for info) at the root of the template so that Gatsby will pick that instead of the default.

> NOTE: A `babel.config.json` should be used instead of a `.babelr` since we need the `node_modules` to be transpiled as well. This is suggested for mono-repos in the [Babel documentation](https://babeljs.io/docs/en/configuration#whats-your-use-case), but works in our favor in this scenario.

Since the second option seems to be a feasible easy solution, I decided to go ahead with that.

### The Fix ⚙️

1.  As per the instructions from the [documentation](https://www.gatsbyjs.com/docs/how-to/custom-configuration/babel/#how-to-use-a-custom-babelrc-file), I created a `babel.config.json` at the root of the template project.

2\. Installed <a href="https://www.npmjs.com/package/@babel/plugin-proposal-logical-assignment-operators" class="fenced-link">@babel/plugin-proposal-logical-assignment-operators</a> from npm.

```js
yarn add -D @babel/plugin-proposal-logical-assignment-operators
```

3\. Finally, I added <a href="https://www.npmjs.com/package/@babel/plugin-proposal-logical-assignment-operators" class="fenced-link">@babel/plugin-proposal-logical-assignment-operators</a>in the `plugins` array of the `babel.config.json` .

```js
{
  "plugins": [ "@babel/plugin-proposal-logical-assignment-operators" ],
  "presets": [
    [
      "babel-preset-gatsby",
      {
        "targets": {
          "browsers": [
            ">0.25%",
            "not dead"
          ]
        }
      }
    ]
  ]
} 
```

> Then I ran `yarn build` from the root and et voila, Success 🎉.

![](https://cdn-images-1.medium.com/max/800/1*KvVfa28ArmwF7CaxDAfHVg.png)

### Contributing 🐙

Being a good citizen of the open-source community, I sent a pull request to the [@primer/doctocat-template](https://github.com/primer/doctocat-template) repository, so that my fellow developers can kickstart their documentation journeys with this amazing template easily.

Pull Request: [https://github.com/primer/doctocat-template/pull/41](https://github.com/primer/doctocat-template/pull/41)

Signing off… ✌️❤️
