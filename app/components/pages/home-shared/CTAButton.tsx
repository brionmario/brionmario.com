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
import {MouseEventHandler} from 'react';
import gradients from './gradients.module.css';

export const CTAButton = ({
  children,
  outline,
  onClick,
  monospace,
}: {
  children: React.ReactNode;
  monospace?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  outline?: boolean;
}) => {
  const outlineClasses =
    'border dark:border-neutral-400  dark:text-neutral-200 dark:hover:border-white dark:hover:text-white border-[#EAEAEA] text-neutral-800 hover:border-black hover:text-black';
  const filledClasses = 'dark:text-black text-white border-transparent bg-black dark:bg-white';

  return (
    <div className="relative w-full group">
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        onClick={onClick}
        className={`w-full min-w-[120px] text-base font-medium no-underline ${
          outline ? outlineClasses : filledClasses
        } rounded md:leading-6 transition-all duration-300 ${monospace ? 'font-mono' : ''}`}
      >
        {children}
      </button>
      {!outline && (
        <div
          className={cn(
            'absolute bg-red-100 w-full h-full top-0 -z-10 rounded-full transition-all duration-300 blur-xl group-hover:opacity-70 opacity-0',
            gradients.translatingGlow,
          )}
        />
      )}
    </div>
  );
};
