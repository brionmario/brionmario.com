/**
 * MIT License
 *
 * Copyright (c) 2023, Brion Mario.
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

import {cx} from '@emotion/css';
import {CSSProperties, ReactElement} from 'react';

export const HeroText = ({children, className, h1}: {children: React.ReactNode; className?: string; h1?: boolean}) => {
  const combinedClassname = cx(
    'font-good-brush tracking-[-0.04em] leading-none text-[40px] md:text-5xl lg:text-[80px] max-w-lg md:max-w-xl lg:max-w-4xl text-center text-white',
    className,
  );

  if (h1) {
    return <h1 className={combinedClassname}>{children}</h1>;
  }
  return <h2 className={combinedClassname}>{children}</h2>;
};

export const SectionHeader = ({children}: {children: React.ReactNode}) => (
  <h2
    className={cx(
      'font-bold tracking-[-0.01em] pb-1 text-[32px] md:text-4xl lg:text-[40px] max-w-sm md:max-w-md lg:max-w-2xl text-center dark:text-white',
    )}
  >
    {children}
  </h2>
);

export const SectionSubtext = ({
  hero,
  children,
  className,
  textAlign = 'center',
}: {
  children: React.ReactNode;
  className?: string;
  hero?: boolean;
  textAlign?: CSSProperties['textAlign'];
}): ReactElement => {
  const textClasses: string = hero ? 'text-[20px] lg:text-xl' : 'text-[16px] lg:text-[20px]';

  return (
    <p
      className={cx(
        `font-space-grotesk leading-snug dark:text-[#FFFFFFB2] text-[#00000080] ${textClasses} max-w-md md:max-w-xl lg:max-w-[640px] text-${textAlign}`,
        className,
      )}
    >
      {children}
    </p>
  );
};

export const PageHeader = ({children}: {children: React.ReactNode}) => (
  <h2
    className={cx(
      'font-bold tracking-[-0.01em] pb-1 text-[32px] md:text-4xl lg:text-[40px] max-w-sm md:max-w-md lg:max-w-2xl text-center dark:text-white',
    )}
  >
    {children}
  </h2>
);
