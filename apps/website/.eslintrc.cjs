/**
 * MIT License
 *
 * Copyright (c) 2022, Brion Mario
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

const path = require('path');

module.exports = {
  plugins: ['@brionmario'],
  extends: [
    '../../.eslintrc.js',
    'plugin:@brionmario/typescript',
    'plugin:@brionmario/react',
    // 'plugin:@brionmario/strict',
    'plugin:@brionmario/internal',
    'plugin:@brionmario/jest',
    'plugin:@brionmario/prettier',
    'plugin:@brionmario/next',
    'plugin:mdx/recommended',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    project: [path.resolve(__dirname, 'tsconfig.json')],
    babelOptions: {
      parserOpts: {
        plugins: ['jsx'],
      },
    },
  },
  overrides: [
    {
      files: '*.mdx',
      parser: 'eslint-mdx',
    },
  ],
  rules: {
    'react/no-unknown-property': ['error', {ignore: ['css']}],
    'import/prefer-default-export': 'off',
    // TODO: Disable this in the shared config.
    'no-restricted-exports': [
      'error',
      {
        restrictedNamedExports: [
          'then', // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions
        ],
      },
    ],
  },
};
