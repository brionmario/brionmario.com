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

### Pre-requisites

1.  [NodeJS](https://nodejs.org/en/) & [npm](https://www.npmjs.com/).
2.  An app created with [Create React App](https://create-react-app.dev/) boilerplate.
3.  ESLint plugin configured in the IDE/Editor. ([VSCode Plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) | [WebStorm Plugin](https://www.jetbrains.com/help/webstorm/eslint.html))

### Let’s get started

#### Remove the existing config

Go to `package.json` at the root of the project, and remove the **eslintConfig** object**.**

```js
 "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
```

#### Add ESLint configuration

Inside the root directory, let's create a `.eslintrc.js`  file. There are [other formats](https://eslint.org/docs/user-guide/configuring/configuration-files#configuration-file-formats) too but I personally prefer the JS format.

```js
# from the root directory  
touch .eslintrc.js
```

Let’s start with the following basic configuration.

```js
module.exports = {
    env: {
        browser: true, // Browser global variables like `window` etc.
        commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
        es6: true, // Enable all ECMAScript 6 features except for modules.
        jest: true, // Jest global variables like `it` etc.
        node: true // Defines things like process.env when generating through node
    },
    extends: [],
    parser: "babel-eslint", // Uses babel-eslint transforms.
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module" // Allows for the use of imports
    },
    plugins: [],
    root: true, // For configuration cascading.
    rules: {},
    settings: {
        react: {
            version: "detect" // Detect react version
        }
    }
}; 
```

This will basically define the environments and parser options.

Now we’ll improve the configuration by adding some useful sharable configurations and plugins.

**Add Sharable Configurations (Presets)**

✅ eslint:recommended

Enables few key rules in [ESLint rule book](https://eslint.org/docs/rules/).

✅ plugin:react/recommended

Enables the [recommended](https://www.npmjs.com/package/eslint-plugin-react#recommended) React rule set in [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react).

✅ plugin:jsx-a11y/recommended

Enables the recommended accessibility rules in [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y).

✅ plugin:react-hooks/recommended

Enables React Hooks best practices rule set in [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks).

✅ plugin:jest/recommended

Enables recommended rules in [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)

✅ plugin:testing-library/react

Enables recommended settings in [eslint-plugin-testing-library](https://www.npmjs.com/package/eslint-plugin-testing-library)

```js
extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:testing-library/react"
],
```

**Add Plugins**

✅ eslint-plugin-import

This plugin intends to support the linting of ES2015+ (ES6+) import/export syntax, and prevent issues with the misspelling of file paths and import names.

```js
plugins: [
    "import" // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
],
```

**Add Rules**

You can override the rules defined in the presets to your own liking. I like to have **4** space indentations, **double quotes,** etc. I can now specify that in the **rules object** like below.

```js
rules: {
    indent: [
        "error",
        4
    ],
    quotes: [
        "warn",
        "double"
    ]
}
```

Also, I will define the sort order of the imports. This rule is supplied by the `eslint-plugin-import` plugin we added in the previous step.

```js
"import/order": [
    "warn",
    {
        alphabetize: {
          caseInsensitive: true,
          order: "asc"
        },
        groups: [
          "builtin",
          "external",
          "index",
          "sibling",
          "parent",
          "internal"
        ]
    }
]
```

> You can also use **plugin:import/recommended**  as a preset but i like to define my own sorting method. Check the [docs](https://www.npmjs.com/package/eslint-plugin-import) for more info.

**Optional**: If you use [lodash](https://lodash.com/) in your project and if your build system supports tree shaking, you can restrict the use of the CommonJS imports and non-tree-shakable modules using the following rule.

```js
"no-restricted-imports": [
    "error",
    {
        paths: [
            {
                message: "Please use import foo from 'lodash-es/foo' instead.",
                name: "lodash"
            },
            {
                message: "Avoid using chain since it is non tree-shakable. Try out flow instead.",
                name: "lodash-es/chain"
            },
            {
                importNames: ["chain"],
                message: "Avoid using chain since it is non tree-shakable. Try out flow instead.",
                name: "lodash-es"
            },
            {
                message: "Please use import foo from 'lodash-es/foo' instead.",
                name: "lodash-es"
            }
        ],
        patterns: [
            "lodash/**",
            "lodash/fp/**"
        ]
    }
],
```

Following is the final configuration 🎉. I have enabled few more rules as per my liking and feel free to modify them based on your requirements.

```js
module.exports = {
    env: {
        browser: true, // Browser global variables like `window` etc.
        commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
        es6: true, // Enable all ECMAScript 6 features except for modules.
        jest: true, // Jest global variables like `it` etc.
        node: true // Defines things like process.env when generating through node
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jest/recommended",
        "plugin:testing-library/react"
    ],
    parser: "babel-eslint", // Uses babel-eslint transforms.
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module" // Allows for the use of imports
    },
    plugins: [
        "import" // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
    ],
    root: true, // For configuration cascading.
    rules: {
        "comma-dangle": [
            "warn",
            "never"
        ],
        "eol-last": "error",
        "import/order": [
            "warn",
            {
                alphabetize: {
                    caseInsensitive: true,
                    order: "asc"
                },
                groups: [
                    "builtin",
                    "external",
                    "index",
                    "sibling",
                    "parent",
                    "internal"
                ]
            }
        ],
        indent: [
            "error",
            4
        ],
        "jsx-quotes": [
            "warn",
            "prefer-double"
        ],
        "max-len": [
            "warn",
            {
                code: 120
            }
        ],
        "no-console": "warn",
        "no-duplicate-imports": "warn",
        "no-restricted-imports": [
            "error",
            {
                paths: [
                    {
                        message: "Please use import foo from 'lodash-es/foo' instead.",
                        name: "lodash"
                    },
                    {
                        message: "Avoid using chain since it is non tree-shakable. Try out flow instead.",
                        name: "lodash-es/chain"
                    },
                    {
                        importNames: ["chain"],
                        message: "Avoid using chain since it is non tree-shakable. Try out flow instead.",
                        name: "lodash-es"
                    },
                    {
                        message: "Please use import foo from 'lodash-es/foo' instead.",
                        name: "lodash-es"
                    }
                ],
                patterns: [
                    "lodash/**",
                    "lodash/fp/**"
                ]
            }
        ],
        "no-unused-vars": "warn",
        "object-curly-spacing": [
            "warn",
            "always"
        ],
        quotes: [
            "warn",
            "double"
        ],
        "react/jsx-curly-spacing": [
            "warn",
            {
                allowMultiline: true,
                children: {
                    when: "always"
                },
                spacing: {
                    objectLiterals: "always"
                },
                when: "always"
            }
        ],
        "react/jsx-filename-extension": [
            "error",
            {
                extensions: [
                    ".js",
                    ".jsx",
                    ".ts",
                    ".tsx"
                ]
            }
        ],
        "react/jsx-indent": [
            "error",
            4,
            {
                checkAttributes: true,
                indentLogicalExpressions:
                    true
            }
        ],
        "react/jsx-indent-props": [
            "error",
            4
        ],
        "react/prop-types": "warn",
        semi: "warn",
        "sort-imports": [
            "warn",
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false
            }
        ],
        "sort-keys": [
            "warn",
            "asc",
            {
                caseSensitive: true,
                minKeys: 2,
                natural: false
            }
        ]
    },
    settings: {
        react: {
            version: "detect" // Detect react version
        }
    }
}; 
```

#### Configuration for TypeScript Projects

If you created a TypeScript project using the CRA TypeScript template, use the [overrides](https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work) object in the configuration to apply the rules to TypeScript files.

```js
overrides: [
    {
        files: [ "**/*.ts?(x)" ],
        parser: "@typescript-eslint/parser",
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            },
            ecmaVersion: 2018,
            sourceType: "module"
        },
        plugins: [
            "@typescript-eslint"
        ],
        // You can add Typescript specific rules here.
        // If you are adding the typescript variant of a rule which is there in the javascript
        // ruleset, disable the JS one.
        rules: {
            "@typescript-eslint/no-array-constructor": "warn",
            "no-array-constructor": "off"
        }
    }
],
```

> You only need to add rules to this section if the base ESLint rule is not supporting TypeScript of you want to add a certain rule only to TypeScript files. Most rules work for both TypeScript & JavaScript.

#### Add ESLint ignore file

Create a `.eslintignore` file to ignore certain files/folders from linting. You can ignore the node_modules, distribution folders, cache folders etc.

```js
# from the root directory  
touch .eslintignore
```
```js
node_modules
public 
```

#### Add helper npm Scripts

CRA will usually show the Lint warnings/errors in the terminal when you run the application.

Also if you have the ESLint plugins properly configured in you Editor or IDE, the errors/warnings will be shown inline.

But it is always best to create npm scripts so that you can use them in CI systems as well.

For **JavaScript** projects, use the following npm scripts.

```js
"scripts": {
    "lint": "eslint -c .eslintrc.js --ext .js,.jsx .",
    "lint:fix": "npm run lint -- --fix"
}
```

For TypeScript projects, use the following npm scripts.

```js
"scripts": {
    "lint": "eslint -c .eslintrc.js --ext .js,.jsx,.ts,.tsx .",
    "lint:fix": "npm run lint -- --fix"
}
```

**Run the Scripts**

The following command will run the linter for the project and report if there are any issues.

```js
npm run lint
```
![ESLint erros on the terminal](https://cdn-images-1.medium.com/max/800/1*QdthOmmdeSYlASN7ARjrfw.png)

The following script will [autofix](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) the possible errors.

```js
npm run lint:fix
```

Now you have a working application with ESLint configurations. If you need, check out the following optional steps to further configure your setup.

### Optional Steps

As an additional step, I like to make sure that any code that violates our ESLint config doesn’t get pushed to the codebase. So basically, i need to enforce running ESLint before a Git commit.

We can easily accomplish the requirement using [husky](https://www.npmjs.com/package/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged).

**What is Husky?**

Husky can be used to run scripts before certain Git Hooks are executed. Read the [docs](https://typicode.github.io/husky/#/).

**What is Lint Staged?**

Runs linters against staged git files.

#### Setting Up

1.  Install Husky

```js
npx husky-init && npm install
```

2\. Install lint-staged.

```js
npm install --save-dev lint-staged
```

3\. Create a lint-staged configuration file.

```js
touch lint-staged.config.js
```

> There are many ways you can add the configuration file. I prefer the JS config. Check out the [documentation](https://github.com/okonet/lint-staged#configuration) for alternatives.

4\. Add the lint-staged configuration.

```js
module.exports = {
    "*.+(js|jsx)": [
        "npm run lint"
    ]
}; 
```

For TypeScript projects, add `ts` and `tsx`  as well as the blob pattern**.**

```js
“*.+(js|jsx|ts|tsx)”
```

5\. Add an npm script to run lint staged.

Add the following script under the **script** section in `package.json`.

```js
"lint:staged": "lint-staged",
```

> Without this, husky will complain about lint-staged command being missing. I guess you can use npx to run lint staged, but this method is cleaner IMO 😉.

6\. Add a pre-commit hook.

```js
npx husky add .husky/pre-commit "npm run lint:staged"
```

#### Testing the flow

I intentionally made a lint violation in `App.js` and tried to commit a file.

I got the bellow error as expected and I wasn’t allowed to commit to the repository.

![Husky & Lint Staged in Action](https://cdn-images-1.medium.com/max/800/1*JOGUU2R4F1og_Xs0lksQDw.png)

### Conclusion

Hope you found this blog post useful. Feel free to try this out and if you have any suggestions regarding the blog you can log an issue in [this repo](https://github.com/brionmario/blog-resources/issues).

#### Links

*   [JavaScript Config](https://github.com/brionmario/blog-resources/blob/master/technical/how-to-add-a-custom-eslint-configuration-to-a-create-react-app-project/code/javascript/.eslintrc.js)
*   [TypeScript Config](https://github.com/brionmario/blog-resources/blob/master/technical/how-to-add-a-custom-eslint-configuration-to-a-create-react-app-project/code/typescript/.eslintrc.js)
*   [JavaScript Demo App Source Code](https://github.com/brionmario/blog-resources/tree/master/technical/how-to-add-a-custom-eslint-configuration-to-a-create-react-app-project/code/javascript)
*   [TypeScript Demo App Source Code](https://github.com/brionmario/blog-resources/tree/master/technical/how-to-add-a-custom-eslint-configuration-to-a-create-react-app-project/code/typescript)

Signing off… ✌️❤️
