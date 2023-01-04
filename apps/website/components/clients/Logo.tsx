/* * MIT License
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

import cn from 'classnames';
import Image from 'next/future/image';
import React from 'react';
import {TurboUser} from './users';

const DEFAULT_SIZE = {
  width: 100,
  height: 75,
};

export function Logo({user, theme, isLink}: {user: TurboUser; theme: 'dark' | 'light'; isLink: boolean}) {
  const styles = {
    ...DEFAULT_SIZE,
    ...user.style,
  };
  const logo = (
    <Image
      src={user.image.replace('/logos', theme === 'light' ? '/logos/white' : '/logos/color')}
      alt={`${user.caption}'s Logo`}
      width={styles.width}
      height={styles.height}
      priority={true}
      style={styles}
      className={cn('mx-8', {
        'hidden dark:inline': theme !== 'dark',
        'dark:hidden inline': theme === 'dark',
      })}
    />
  );

  if (isLink) {
    return (
      <a
        href={user.infoLink}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('flex justify-center item-center', {
          'hidden dark:flex': theme !== 'dark',
          'dark:hidden flex': theme === 'dark',
        })}
      >
        {logo}
      </a>
    );
  }

  return logo;
}
