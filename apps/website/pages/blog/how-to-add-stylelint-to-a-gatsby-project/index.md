---
slug: "/posts/how-to-add-stylelint-to-a-gatsby-project/"
date: "2021-10-05"
title: "How to add Stylelint to a Gatsby project"
description: "You will need a Gatsby application to try this out. I will be using the Gatsby Starter project that I built. Feel free to use the same or you can use this approach on any Gatsby project. I followed…"
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
  - "gatsby"
  - "stylelint"
  - "static-analysis"
  - "testing"
  - "code-quality"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*pYn5hJ5wC5zFUp6CbycUuw@2x.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*pYn5hJ5wC5zFUp6CbycUuw@2x.png"
  - "https://cdn-images-1.medium.com/max/2600/1*ehZQoXOYsH2nKlGjdQWLXg.png"

---

# [How to add Stylelint to a Gatsby project](https://medium.com/p/156004013f36/edit?source=your_stories_page-------------------------------------)

![](https://cdn-images-1.medium.com/max/800/1*pYn5hJ5wC5zFUp6CbycUuw@2x.png)

In this post, I will go through the process of adding [Stylelint](https://stylelint.io/) to a Gatsby project.

### Pre-requisites

You will need a Gatsby application to try this out. I will be using the [Gatsby Starter](https://github.com/brionmario/gatsby-starter) project that I built. Feel free to use the same or you can use this approach on any Gatsby project.

> Read the [docs](https://www.gatsbyjs.com/docs/quick-start/) to learn how to create a Gatsby app or explore other [starters](https://www.gatsbyjs.com/starters/?).

### Let’s get started

#### Install the Gatsby Plugin for Stylelint

```js
npm install --save @danbruegge/gatsby-plugin-stylelint
```

**Remarks**

I followed the instructions in the [documentation](https://www.gatsbyjs.com/plugins/gatsby-plugin-stylelint/) but that seems to be outdated. The package [gatsby-plugin-stylelint](https://www.npmjs.com/package/gatsby-plugin-stylelint) has been deprecated and moved to [@danbruegge/gatsby-plugin-stylelint](https://www.npmjs.com/package/@danbruegge/gatsby-plugin-stylelint).

Also there was the following note in the documentation.

> **Note**

> You need your own Stylelint setup. Please have a look at the Stylelint [website](https://stylelint.io/). The intention of this plugin is to inject Stylelint into webpack for gatsbyjs.

This means that installing [@danbruegge/gatsby-plugin-stylelint](https://www.npmjs.com/package/@danbruegge/gatsby-plugin-stylelint) only configures Stylelint for webpack.

#### Add the plugin to Gatsby Config

Next, we need to add the plugin we just installed to the `gatsby.config.js` .

The plugin supports config options from [stylelint-webpack-plugin](https://github.com/webpack-contrib/stylelint-webpack-plugin#options). I just updated the blob pattern to look for CSS, SASS and SCSS files.

```js
module.exports = {
    plugins: [
        ...
        {
            options: {
                files: [
                    "**/*.{css,sass,scss}"
                ]
            },
            resolve: "@danbruegge/gatsby-plugin-stylelint"
        }
    ],
    ...
};
```

#### **Install Stylelint package and sharable lint ruleset**

Now we need to install [stylelint](https://www.npmjs.com/package/stylelint) and [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard).

```js
npm install --save stylelint stylelint-config-standard
```

Installing Stylelint package will give access to the Stylelint command and the [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard) is a good starting point for configuring Stylelint.

#### Add a Stylelint configuration file

There are many ways of configuring S[tylelint](https://www.npmjs.com/package/stylelint) but I prefer to use a JavaScript configuration file.

> Click [here](https://stylelint.io/user-guide/configure) to read more about alternative configuration methods.

```js
# From the root directory.  
touch stylelint.config.js
```

Add the following config inside the file that you just created.

```js
module.exports = {
    extends: [
        "stylelint-config-standard"
    ],
    rules: {
        "at-rule-no-unknown": [ true, {
            "ignoreAtRules": [
                "extends",
                "tailwind"
            ]
        }],
        "indentation": 4
    }
};
```

**extends**

You can extend any sharable lint configuration here. Read the docs [here](https://stylelint.io/user-guide/configure#extends).

**rules**

Add or override any rules here. Checkout the [docs](https://stylelint.io/user-guide/rules/list) for the list of available rules.

#### Add helper npm script

It is always best to add npm scripts to execute the linter.

Add the following script in the **script** section in `package.json`.

```js
"lint:styles": "stylelint 'src/**/*.{css,scss,sass}' --config stylelint.config.js --allow-empty-input",
```

This command basically tries to run the linter against the specified file patterns inside the **src** folder.

`--config` option can be used to point to our configuration file.

`--allow-empty-input` ensures that the command is successful if there are no files matching the file patter.

### Let’s try it out

Now we can try out and see if the linter integration is working as expected.

Execute the below command to see the result.

> I have intentionally violated the indentation rule I had specified for demo purposes.

![Stylelint in Action](https://cdn-images-1.medium.com/max/800/1*ehZQoXOYsH2nKlGjdQWLXg.png)

### — — — — — — — — — -All Done 🥳 — — — — — — — — —

### Conclusion

Hope you found this blog post useful. Feel free to try this out and if you have any suggestions regarding the blog you can log an issue in [this repo](https://github.com/brionmario/blog-resources/issues).

#### Links

*   [Source Code](https://github.com/brionmario/gatsby-starter/tree/init-stylelint)

Happy Coding! ❤️
