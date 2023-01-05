/**
 * MIT License
 *
 * Copyright (c) 2023, Brion Mario
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

/* eslint-disable react/jsx-filename-extension */

import {useRouter} from 'next/router';
import {useConfig, useTheme} from 'nextra-theme-docs';
import {Footer} from './components/Footer';
import Navigation from './components/navigation';
import HeaderLogo from './components/HeaderLogo';
import DarkModeSwitch from './components/dark-mode-switch/dark-mode-switch';

const SITE_ROOT = 'https://brionmario.com';

/**
 * @type {import('nextra-theme-docs').DocsThemeConfig}
 */
const theme = {
  chat: false,
  docsRepositoryBase: 'https://github.com/brionmario/brionmario.com/tree/main/apps/website/pages',
  getNextSeoProps: function SEO() {
    const {frontMatter} = useConfig();
    const defaultTitle = frontMatter.overrideTitle || 'Brion Mario';

    return {
      description: frontMatter.description,
      defaultTitle,
      titleTemplate: `%s – ${defaultTitle}`,
    };
  },
  search: {component: null},
  unstable_flexsearch: false,
  unstable_staticImage: true,
  toc: {
    float: true,
  },
  font: false,
  feedback: {
    link: 'Question? Give us feedback →',
  },
  logo: HeaderLogo,
  logoLink: false,
  head: function Head() {
    const {asPath} = useRouter();
    const {systemTheme = 'dark'} = useTheme();
    const {frontMatter} = useConfig();

    const fullUrl = asPath === '/' ? SITE_ROOT : `${SITE_ROOT}${asPath}`;
    let ogImage = `${SITE_ROOT}/og-image.png`;

    if (frontMatter?.ogImage) {
      ogImage = `${SITE_ROOT}${frontMatter.ogImage}`;
    }

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href={`/images/favicon-${systemTheme}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`/images/favicon-${systemTheme}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`/images/favicon-${systemTheme}/favicon-16x16.png`} />
        <link rel="mask-icon" href={`/images/favicon-${systemTheme}/safari-pinned-tab.svg`} color="#000000" />
        <link rel="shortcut icon" href={`/images/favicon-${systemTheme}/favicon.ico`} />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@brion_mario" />
        <meta name="twitter:creator" content="@brion_mario" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <link rel="canonical" href={fullUrl} />
        <meta property="twitter:image" content={ogImage} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="en_IE" />
        <meta property="og:site_name" content="Brion Mario" />
      </>
    );
  },
  editLink: {
    text: 'Edit this page on GitHub',
  },
  navbar: {
    component: Navigation,
    extraContent: DarkModeSwitch,
  },
  footer: {
    component: Footer,
  },
  nextThemes: {
    defaultTheme: 'dark',
  },
};

export default theme;
