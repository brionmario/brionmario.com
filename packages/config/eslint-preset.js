/**
 * MIT License
 * 
 * Copyright (c) 2022 Brion Mario
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* eslint-disable sort-keys */
const SEVERITY = {
  OFF: 0,
  WARN: 1,
  ERROR: 2
};
/* eslint-enable sort-keys */

const CONFIG = {
  INDENT_SIZE: 2
};

const LINE_PADDING_RULES = [
  SEVERITY.WARN,
  // Add a new line after const, let, var declarations.
  { blankLine: "always", next: "*", prev: [ "const", "let", "var" ] },
  { blankLine: "any", next: [ "const", "let", "var" ], prev: [ "const", "let", "var" ] },
  // Add a new line after directive declarations like `use strict` etc.
  { blankLine: "always", next: "*", prev: "directive" },
  { blankLine: "any", next: "directive", prev: "directive" },
  // Add a new line before return statements.
  { blankLine: "always", next: "return", prev: "*" },
  // Add a new line try blocks.
  { blankLine: "always", next: "try", prev: "*" },
  // Add a new line break statements.
  { blankLine: "always", next: "break", prev: "*" },
  // Add a new line continue statements.
  { blankLine: "always", next: "continue", prev: "*" },
  // Add a new line before exports.
  { blankLine: "always", next: "export", prev: "*" },
  { blankLine: "any", next: "export", prev: "export" },
  // Add a new line before for loops.
  { blankLine: "always", next: "for", prev: "*" },
  // Add a new line before classes.
  { blankLine: "always", next: "class", prev: "*" },
  // Add a new line after import statements.
  { blankLine: "always", next: "*", prev: "import" },
  { blankLine: "any", next: "import", prev: "import" }
];

module.exports = {
  env: {
    es6: true,
    jest: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "next"
  ],
  overrides: [
    {
      env: {
        es6: true,
        jest: true,
        node: true
      },
      extends: [
        "eslint:recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      files: [ "**/*.ts" ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 9,
        sourceType: "module"
      },
      plugins: [
        "eslint-plugin-tsdoc"
      ],
      rules: {
        "@typescript-eslint/ban-types": SEVERITY.WARN,
        "@typescript-eslint/explicit-function-return-type": SEVERITY.OFF,
        "@typescript-eslint/no-empty-function": [
          SEVERITY.ERROR,
          {
            allow: [ "constructors" ]
          }
        ],
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-unused-vars": [
          SEVERITY.WARN,
          {
            argsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
            varsIgnorePattern: "^_"
          }
        ],
        "@typescript-eslint/no-use-before-define": [
          SEVERITY.WARN,
          {
            classes: false,
            functions: false,
            typedefs: false,
            variables: false
          }
        ],
        "@typescript-eslint/padding-line-between-statements": [ ...LINE_PADDING_RULES ],
        "eol-last": SEVERITY.ERROR,
        // In development, error level is set to `warn`. This will be overridden
        // by the production env linting config.
        "no-debugger": SEVERITY.WARN,
        // `no-undef` is discouraged in Typescript projects.
        // https://github.com/typescript-eslint/typescript-eslint/issues/2477#issuecomment-686892459
        "no-undef": SEVERITY.OFF,
        "no-use-before-define": SEVERITY.OFF,
        "padding-line-between-statements": SEVERITY.OFF,
        "tsdoc/syntax": SEVERITY.WARN
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "module"
  },
  plugins: [ "import" ],
  root: true,
  rules: {
    "@next/next/no-html-link-for-pages": SEVERITY.OFF,
    "array-bracket-spacing": [
      SEVERITY.WARN,
      "always"
    ],
    "arrow-parens": [ SEVERITY.ERROR, "always" ],
    "comma-dangle": [
      SEVERITY.WARN,
      "never"
    ],
    "eol-last": SEVERITY.ERROR,
    "import/order": [
      SEVERITY.WARN,
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc"
        },
        groups: [ "builtin", "external", "index", "sibling", "parent", "internal" ]
      }
    ],
    indent: [
      SEVERITY.WARN,
      CONFIG.INDENT_SIZE,
      {
        SwitchCase: 1
      }
    ],
    "lines-between-class-members": [
      SEVERITY.WARN,
      "always",
      {
        exceptAfterSingleLine: true
      }
    ],
    "max-len": [
      SEVERITY.WARN,
      {
        code: 120
      }
    ],
    "newline-per-chained-call": [
      SEVERITY.ERROR,
      {
        "ignoreChainWithDepth": 1
      }
    ],
    "no-alert": SEVERITY.WARN,
    "no-console": SEVERITY.WARN,
    "no-duplicate-imports": SEVERITY.WARN,
    "no-restricted-imports": [
      SEVERITY.ERROR,
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
            importNames: [ "chain" ],
            message: "Avoid using chain since it is non tree-shakable. Try out flow instead.",
            name: "lodash-es"
          },
          {
            message: "Please use import foo from 'lodash-es/foo' instead.",
            name: "lodash-es"
          }
        ],
        patterns: [ "lodash/**", "lodash/fp/**" ]
      }
    ],
    "no-unreachable": SEVERITY.ERROR,
    "object-curly-spacing": [
      SEVERITY.WARN,
      "always"
    ],
    "padding-line-between-statements": [ ...LINE_PADDING_RULES ],
    "prefer-arrow-callback": SEVERITY.ERROR,
    quotes: [
      SEVERITY.WARN,
      "double"
    ],
    semi: SEVERITY.WARN,
    "sort-imports": [
      SEVERITY.WARN,
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false
      }
    ],
    "sort-keys": [
      SEVERITY.WARN,
      "asc",
      {
        caseSensitive: true,
        minKeys: 2,
        natural: false
      }
    ]
  },
  settings: {
    next: {
      rootDir: [
        "apps/*/",
        "packages/*/"
      ],
    },
  },
};
