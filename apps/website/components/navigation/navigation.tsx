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

import {Menu, MenuButton, MenuItems, MenuLink, MenuPopover, useMenuButtonContext} from '@reach/menu-button';
import clsx from 'clsx';
import {useReducedMotion, AnimatePresence, motion} from 'framer-motion';
import Link, {LinkProps} from 'next/link';
import {NextRouter, useRouter} from 'next/router';
import {PropsWithChildren, ReactElement, ReactNode, useEffect} from 'react';
import DarkModeSwitch from '../dark-mode-switch/dark-mode-switch';
import HeaderLogo from '../HeaderLogo';

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

// TODO: Fix types
const MobileMenuList = ({items}: any): ReactElement => {
  const {isExpanded} = useMenuButtonContext();
  const shouldReduceMotion: boolean = useReducedMotion();

  useEffect(() => {
    if (isExpanded) {
      // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
      document.body.classList.add('fixed');
      document.body.classList.add('overflow-y-scroll');
      // alternatively, get bounding box of the menu, and set body height to that.
      document.body.style.height = '100vh';
    } else {
      document.body.classList.remove('fixed');
      document.body.classList.remove('overflow-y-scroll');
      document.body.style.removeProperty('height');
    }
  }, [isExpanded]);

  return (
    <AnimatePresence>
      {isExpanded ? (
        <MenuPopover
          position={r => ({
            top: `calc(${Number(r?.top) + Number(r?.height)}px + 2.25rem)`, // 2.25 rem = py-9 from navbar
            left: 0,
            bottom: 0,
            right: 0,
          })}
          style={{display: 'block'}}
          className="z-50"
        >
          <motion.div
            initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: -50, opacity: 0}}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.15,
              ease: 'linear',
            }}
            className="bg-background-main flex h-full flex-col overflow-y-scroll border-t border-gray-200 pb-12 dark:border-gray-600"
          >
            <MenuItems className="border-none bg-transparent p-0">
              {items.map(link => (
                <Link key={link.route} href={link.route}>
                  <MenuLink
                    className="bg-background-main hover:bg-background-light focus:bg-background-light text-primary border-b border-gray-200 px-5vw py-9 hover:text-current dark:border-gray-600"
                    as="a"
                  >
                    {link.title}
                  </MenuLink>
                </Link>
              ))}
            </MenuItems>
          </motion.div>
        </MenuPopover>
      ) : null}
    </AnimatePresence>
  );
};

const topVariants = {
  open: {rotate: 45, y: 7},
  closed: {rotate: 0, y: 0},
};

const centerVariants = {
  open: {opacity: 0},
  closed: {opacity: 1},
};

const bottomVariants = {
  open: {rotate: -45, y: -5},
  closed: {rotate: 0, y: 0},
};

// TODO: Fix types
const MobileMenu = ({items}: any) => {
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? {duration: 0} : {};
  return (
    <Menu>
      {({isExpanded}) => {
        const state = isExpanded ? 'open' : 'closed';
        return (
          <>
            <MenuButton className="focus:border-primary hover:border-primary border-secondary text-primary inline-flex h-14 w-14 items-center justify-center rounded-full border-2 p-1 transition focus:outline-none">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.rect
                  animate={state}
                  variants={topVariants}
                  transition={transition}
                  x="6"
                  y="9"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <motion.rect
                  animate={state}
                  variants={centerVariants}
                  transition={transition}
                  x="6"
                  y="15"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <motion.rect
                  animate={state}
                  variants={bottomVariants}
                  transition={transition}
                  x="6"
                  y="21"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </MenuButton>

            <MobileMenuList items={items} />
          </>
        );
      }}
    </Menu>
  );
};

const Navigation = ({items}: NavigationProps): ReactElement => (
  <div className="py-9">
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
          <div className="block lg:hidden">
            <MobileMenu items={items} />
          </div>
          <div className="noscript-hidden lg:block">
            <DarkModeSwitch className="ml-4" />
          </div>
        </div>
      </div>
    </nav>
  </div>
);

export default Navigation;
