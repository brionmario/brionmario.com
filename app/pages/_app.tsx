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

import '../shims';
import '../styles/custom.css';
import '../styles/tailwind.css';
import type {AppProps} from 'next/app';
import type {ReactElement, ReactNode} from 'react';

type NextraAppProps = AppProps & {
  Component: AppProps['Component'] & {
    // eslint-disable-next-line no-unused-vars
    getLayout: (page: ReactNode) => ReactNode;
  };
};

const Nextra = ({Component, pageProps}: NextraAppProps): ReactElement => (
  <>
    <>
      {/**
       * Globally defined svg linear gradient, for use in icons
       */}
      <svg height="0px" width="0px">
        <defs>
          <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(156, 81, 161, 1)" />
            <stop offset="70%" stopColor="rgba(255, 30, 86, 1)" />
          </linearGradient>
        </defs>
      </svg>
    </>
    <Component {...pageProps} />
  </>
);

export default Nextra;
