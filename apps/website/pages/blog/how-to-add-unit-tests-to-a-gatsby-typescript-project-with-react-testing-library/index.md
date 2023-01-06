---
slug: "/posts/how-to-add-unit-tests-to-a-gatsby-typescript-project-with-react-testing-library/"
date: "2021-10-05"
title: "How to add Unit Tests to a Gatsby Typescript Project with React Testing Library"
description: "Unit tests makes sure that you are writing working code as developers and these tests can guarantee that the individual units are behaving as you expected. In this post, I will go through the process…"
authors:
  - id: "ca410be341b9"
    name: "Brion Mario"
    username: "brionmario"
    image: "https://miro.medium.com/fit/c/176/176/1*vSMWBwWmwDsLJ1px0jb07g.jpeg"
    bio: "Software Engineer working at WSO2."
    twitterScreenName: "brion_mario"
readingTime: "4 min read"
draft: false
tags:
  - "gatsby"
  - "typescript"
  - "react-testing-library"
  - "unit-testing"
  - "quality-assurance"
bannerImage: "https://cdn-images-1.medium.com/max/2600/1*D02e_lQYKcWbfwlSLr8lcA@2x.png"
ogImage: "https://cdn-images-1.medium.com/max/2600/1*D02e_lQYKcWbfwlSLr8lcA@2x.png"
images:
  - "https://cdn-images-1.medium.com/max/2600/1*D02e_lQYKcWbfwlSLr8lcA@2x.png"
  - "https://cdn-images-1.medium.com/max/2600/1*kp1adyTmpP0voiL26uSLMA.png"

---

# How to add Unit Tests to a Gatsby Typescript Project with React Testing Library

![](https://cdn-images-1.medium.com/max/800/1*D02e_lQYKcWbfwlSLr8lcA@2x.png)

Unit tests makes sure that you are writing working code as developers and these tests can guarantee that the individual units are behaving as you expected.

In this post, I will go through the process of adding Unit tests to a Gatsby TypeScript project with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

### Pre-requisites

You will need a Gatsby application to try this out. I will be using the [Gatsby Starter](https://github.com/brionmario/gatsby-starter) project that I built. Feel free to use the same or you can use this approach on any Gatsby TypeScript project.

> Read the [docs](https://www.gatsbyjs.com/docs/quick-start/) to learn how to create a Gatsby app or explore other TypeScript [starters](https://www.gatsbyjs.com/starters/?).

### Versions

Please note that I’m using the following versions at the time of writing this post.

*   Gatsby : 3.10.2
*   Jest: 27.0.6
*   React Testing Library: 12.0.0

> Disclaimer: This procedure is not guaranteed to work if you are using different versions.

### Let’s get started

#### Install Dependencies

```js
npm install --save-dev jest babel-jest @testing-library/react babel-preset-gatsby identity-obj-proxy
```

Also since we are on a TypeScript project, we need add type declarations for Jest & Jest DOM.

```js
npm install --save-dev @types/jest @testing-library/jest-dom
```

#### Configure Jest

Let’s create a `jest.config.js` file at the root of the project.

```js
# From the root of the project  
touch jest.config.js
```
```js
module.exports = {
    globals: {
        __PATH_PREFIX__: ""
    },
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "/tests/__mocks__/file-mock.js"
    },
    setupFiles: [
        "/tests/loadershim.js"
    ],
    testEnvironment: "jsdom",
    testMatch: [
        "/src/**/__tests__/**/?(*.)+(test).[jt]s?(x)"
    ],
    testPathIgnorePatterns: [
        "node_modules",
        "\\.cache",
        ".*/public"
    ],
    testURL: "http://localhost:8000",
    transform: {
        "^.+\\.[jt]sx?$": "/tests/jest-preprocess.js"
    },
    transformIgnorePatterns: [
        "node_modules/(?!(gatsby)/)"
    ]
};
```

💡 **globals**

Sets `__PATH_PREFIX__`, which is usually set by Gatsby, and which some components need.

💡 **moduleNameMapper**

Tells Jest how to handle imports. If you can’t test or don’t want to test a particular module you can create mocks.

For stylesheets, `identity-obj-proxy` package will be used for mocking. For other assets, you need to use a manual mock called `file-mock.js` inside a `__mocks__` directory in `tests`.

```js
module.exports = "test-file-stub";
```

💡 **setupFiles**

Lets you list files that will be included before all tests are run.

Create a file called `loadershim.js` inside the `tests` directory.

```js
global.___loader = {
    enqueue: jest.fn()
};
```

💡 **testEnvironment**

Test environment that will be used for testing. The default environment in Jest is a Node.js environment.

Since our app is a web app, we have to use a browser-like environment through `jsdom` instead.

💡 **testMatch**

The glob patterns Jest uses to detect test files.

I have **E2E** configured in the project in `<root>/cypress` directory. The E2E test files uses `.spec` prefix. If I don’t define `testMatch` property, Jest tries to run those files as well. Hence, I will ask Jest to only look inside the `src` directory for any files with the `.test` prefix inside `__tests__` directories.

💡 **testPathIgnorePatterns**

Jest will ignore any tests in the `node_modules` ,`.cache` or `public` directories.

💡 **testURL**

Need to specify a proper URL here because some DOM APIs such as localStorage are unhappy with the default (`about:blank` ).

💡 **transform**

Jest that all `js`, `jsx`, `ts` or `tsx` files need to be transformed using a `jest-preprocess.js` file in the project root. Let’s create this file inside the **tests** folder.

```js
const babelOptions = {
    presets: [
        "babel-preset-gatsby",
        "@babel/preset-typescript"
    ]
};

module.exports = require("babel-jest")
    .default
    .createTransformer(babelOptions);
```

💡 **transformIgnorePatterns**

Gatsby includes un-transpiled ES6 code. By default Jest doesn’t try to transform code inside `node_modules` . We need tell Jest to transpile `Gatsby` only.

#### Add useful mocks

**Mocking** `**gatsby**`

The [docs](https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/#3-useful-mocks-to-complete-your-testing-environment) suggest to mock `gatsby` module. This is supposed to be helpful if we want to test features like `Link` or `GraphQL` .

Create a `gatsby.js` file inside the `__mocks__` directory in `tests`.

```js
const React = require("react");
const gatsby = jest.requireActual("gatsby");

module.exports = {
    ...gatsby,
    Link: jest.fn()
        .mockImplementation(
            // these props are invalid for an `a` tag
            ({
                activeClassName,
                activeStyle,
                getProps,
                innerRef,
                partiallyActive,
                ref,
                replace,
                to,
                ...rest
            }) =>
                React.createElement("a", {
                    ...rest,
                    href: to
                })
        ),
    StaticQuery: jest.fn(),
    graphql: jest.fn(),
    useStaticQuery: jest.fn()
};
```

**Add helper npm scripts**

Let’s add the below helper scripts in the **script** section in `package.json`so that we can easily run our tests.

```js
{
    "scripts": {
        "test:unit": "jest --passWithNoTests",
        "test:unit:coverage": "npm run test:unit -- --coverage",
        "test:unit:watch": "npm run test:unit -- --watch",
    }
}
```

### Add the first Test

I will be adding some basic tests to the **Copyright** component in my application.

The copyright component resides in `src/components/footer/copyright.tsx` . So I’m going to create a new test file in `src/components/__tests__/footer/copyright.test.tsx` .

For demo purpose, I will do a simple [snapshot test](https://jestjs.io/docs/snapshot-testing) and will check if the component render without any issues.

```js
import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Copyright } from "../../footer";

describe("Test if the Copyright component is working as expected", () => {
    it(" matches snapshot", () => {
        const component = render();
        expect(component.container).toMatchSnapshot();
    });

    it(" renders without exploding", () => {
        const component = render();
        expect(component.getByTestId("footer-copyright"))
            .toBeInTheDocument();
    });
});
```

### Run Tests

You can execute the following command to run the Unit test suite.

```js
npm run test:unit
```

**Run with Coverage**

Execute the following command to run the test coverage.

```js
npm run test:unit:coverage
```
![Test with Coverage](https://cdn-images-1.medium.com/max/800/1*kp1adyTmpP0voiL26uSLMA.png)

**Run in watch mode**

This script will watch files for changes and rerun tests related to changed files. If you want to re-run all tests when a file has changed.

```js
npm run test:unit:watch
```

### Conclusion

Hope you found this blog post useful. Feel free to try this out and if you have any suggestions regarding the blog you can log an issue in [this repo](https://github.com/brionmario/blog-resources/issues).

#### Links

*   [Source Code](https://github.com/brionmario/gatsby-starter/tree/init-unit-testing)

Signing off… ✌️❤️
