---
slug: "/posts/how-to-avoid-bad-code-from-slipping-into-your-repositories/"
date: "2021-08-14"
title: "How to avoid bad code from slipping into your repositories"
description: "In this blog,  I will go through the process of preventing code that violates lint rules from being slipped into repositories using Lint Staged and Husky."
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
  - "lint-staged"
  - "husky"
  - "best-practices"
  - "eslint"
  - "front-end-development"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*r-qkOyGrghFGU23p6yRmGw@2x.png"
ogImage: "https://cdn-images-1.medium.com/max/2600/1*r-qkOyGrghFGU23p6yRmGw@2x.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*r-qkOyGrghFGU23p6yRmGw@2x.png"
  - "https://cdn-images-1.medium.com/max/2600/1*oo7gjgIuuLNGIj4euQz-tA.png"

---

# How to avoid bad code from slipping into your repositories

![Post Banner](https://cdn-images-1.medium.com/max/800/1*r-qkOyGrghFGU23p6yRmGw@2x.png)

Adding static code analysis tools like [ESLint](https://eslint.org/) is considered a best practice in front-end Ecmascript based project development. These tools make sure that the code we write adheres to a certain standard defined by the team.

But when there are several developers working on one code base, the code quality could get out of hand. Oftentimes, code that violates the linting rules gets pushed to the repositories. This is not ideal for large projects and could render the usage of linting tools redundant.

To fix this we can use the awesome two tools [Lint Staged](https://www.npmjs.com/package/lint-staged) and [Husky](https://typicode.github.io/husky/).

**What is Husky?**

Husky can be used to run scripts before certain Git Hooks are executed. Read the [docs](https://typicode.github.io/husky/#/).

**What is Lint Staged?**

Runs linters against staged git files.

### Pre-requisites

You will need a Javascript or Typescript application with a static code analyzing tool configured to try this out. I will be using the [Gatsby Starter](https://github.com/brionmario/gatsby-starter) project that I built. Feel free to use the same if you would like.

### Versions

Please note that I’m using the following versions at the time of writing this post.

*   Lint Staged : 11.1.2
*   Husky: 7.0.0

> Note: With previous version of Husky, the configuring mechanism was different than the approach I will be following in this guide.

### Let’s get started

#### Install dependencies

1.  Install Husky

```js
npx husky-init && npm install
```

2\. Install lint-staged.

```js
npm install --save-dev lint-staged
```

#### Configure lint staged

1.  Create a lint-staged configuration file.

```js
touch lint-staged.config.js
```

> There are many ways you can add the configuration file. I prefer the JS config. Check out the [documentation](https://github.com/okonet/lint-staged#configuration) for alternatives.

2\. Add the configuration.

```js
module.exports = {
    "*.+(js|jsx|ts|tsx)": [
        "npm run lint"
    ]
};
```

Since I’m using a TypeScript project, I have added `ts` and `tsx`  to the blob pattern. You can skip this if you are configuring on a JavaScript project.

> I’m only running the lint command against the matched files. Obviously you can append any script you want to the array and lint-staged will run that for you.

#### Add an npm script to run lint staged

Add the following script under the **script** section in `package.json`.

```js
"lint:staged": "lint-staged",
```

> Without this, husky will complain about lint-staged command being missing. I guess you can use npx to run lint staged, but this method is cleaner IMO 😉.

#### Add a pre-commit hook

I want to make sure that before every commit, linting is being run against the staged files.

For this purpose, I can use a pre-commit Git hook. There are other Git hooks that husky supports.

```js
npx husky add .husky/pre-commit "npm run lint:staged"
```

#### Testing the flow

I intentionally made a lint violation in one of my files and tried to commit a file.

I got the bellow error as expected and I wasn’t allowed to commit to the repository.

![Husky & Lint Staged in Action](https://cdn-images-1.medium.com/max/800/1*oo7gjgIuuLNGIj4euQz-tA.png)

**All Done….. 🥳**

### Conclusion

Hope you found this blog post useful. Feel free to try this out and if you have any suggestions regarding the blog you can log an issue in [this repo](https://github.com/brionmario/blog-resources/issues).

#### Resources

*   [Source Code](https://github.com/brionmario/gatsby-starter/tree/init-lint-staged-and-husky)

Signing off… ✌️❤️
