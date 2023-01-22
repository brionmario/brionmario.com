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

import cn from 'classnames';
import {ReactElement} from 'react';
import Logo from './logos/logo';

export const FooterContent = () => (
  <div className="w-full" aria-labelledby="footer-heading">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <div className="w-full py-8 mx-auto">
      <div className="xl:grid xl:grid-cols-2 xl:gap-8">
        <div className="flex">
          <div>
            <Logo alt="logo" width={150} />
            <p className="mt-1 text-xs text-gray-500 dark:text-[#888888]">
              &copy; {new Date().getFullYear()} brionmario.com. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Footer = (): ReactElement => (
  <footer className="bg-background-main pb-[env(safe-area-inset-bottom)] relative">
    <hr className="dark:border-neutral-800" />
    <div
      className={cn(
        'mx-auto max-w-[90rem] py-12 flex justify-center md:justify-center text-black dark:text-white',
        'pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]',
      )}
    >
      <FooterContent />
    </div>
  </footer>
);
