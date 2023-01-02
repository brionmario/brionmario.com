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

import clsx from 'clsx';
import Link, {LinkProps} from 'next/link';
import {NextRouter, useRouter} from 'next/router';
import {PropsWithChildren, ReactElement, ReactNode} from 'react';
import DarkModeSwitch from '../dark-mode-switch/dark-mode-switch';
import HeaderLogo from '../HeaderLogo';
import MenuButton from './menu/menu-button';
import MenuItem from './menu/menu-item';

interface NavigationItem extends LinkProps {
  name?: string;
  route?: string;
  title?: ReactNode;
}

type NavigationProps = {
  items: NavigationItem[];
};

const NavLink = ({href, title, ...rest}: PropsWithChildren<NavigationItem>): ReactElement => {
  const router: NextRouter = useRouter();
  const isSelected: boolean = router.pathname === href;

  return (
    <li className="px-5 py-2 flex items-center font-sans">
      <Link href={href} {...rest} legacyBehavior>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className={clsx(
            'underlined block whitespace-nowrap text-lg font-medium hover:text-primary focus:text-primary focus:outline-none',
            {
              'active text-current': isSelected,
              'text-secondary': !isSelected,
            },
          )}
        >
          {title}
        </a>
      </Link>
    </li>
  );
};

const Navigation = ({items}: NavigationProps): ReactElement => (
  <div className="py-9 lg:py-12">
    <nav className="mx-auto flex h-[var(--nextra-navbar-height)] max-w-[90rem] items-center justify-between gap-2 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
      <div className="flex justify-center gap-4 align-middle">
        <HeaderLogo />
      </div>

      <div className="flex">
        <ul className="hidden lg:flex">
          {items.map((item: NavigationItem) => (
            <NavLink key={item.route} href={item.route} title={item.title}>
              {item.name}
            </NavLink>
          ))}
        </ul>
        <div className="flex items-center justify-center">
          <div className="noscript-hidden hidden lg:block">
            <DarkModeSwitch />
          </div>
        </div>
      </div>
    </nav>
  </div>
);

export default Navigation;
