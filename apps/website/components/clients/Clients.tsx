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
import React, {PropsWithChildren} from 'react';
import {ReactElement} from 'react';
import {Logo} from './Logo';
import {users} from './users';

export function Clients({
  linked,
  staticWidth,
  companyList,
}: {
  linked: boolean;
  staticWidth?: boolean;
  companyList?: string[];
}) {
  const showcaseDark: JSX.Element[] = [];
  const showcaseLight: JSX.Element[] = [];

  const LogoWrapper = ({className, children}: PropsWithChildren<{className: string}>): ReactElement => {
    if (!staticWidth) return children as ReactElement;
    return <div className={cn('w-48 lg:w-40 flex items-center justify-center', className)}>{children}</div>;
  };

  users
    .filter(i => (companyList ? companyList.includes(i.caption) : true))
    .forEach(user => {
      if (user.pinned) {
        showcaseDark.push(
          <LogoWrapper key={`${user.caption}-dark`} className="flex dark:hidden">
            <Logo user={user} theme={'dark'} isLink={linked} />
          </LogoWrapper>,
        );
        showcaseLight.push(
          <LogoWrapper key={`${user.caption}-light`} className="hidden dark:flex">
            <Logo user={user} theme={'light'} isLink={linked} />
          </LogoWrapper>,
        );
      }
    });

  return (
    <>
      {showcaseDark}
      {showcaseLight}
    </>
  );
}
