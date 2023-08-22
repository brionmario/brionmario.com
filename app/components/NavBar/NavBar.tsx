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

import {ReactElement, ReactNode, useEffect, useState} from 'react';
import Link, {LinkProps} from 'next/link';
import {useReducedMotion, AnimatePresence, motion, Transition} from 'framer-motion';
import {NextRouter, useRouter} from 'next/router';
import {SerializedStyles, css} from '@emotion/react';
import type {TestableComponent} from '../../models/dom';
import ThemeSwitch from '../ThemeSwitch';
import MobileLogo from '../MobileLogo';
import Logo from '../Logo';
import NavLink, {MobileNavLink} from '../NavLink';

/**
 * The `NavBarProps` interface represents the props accepted by the `NavBar` component.
 */
export type NavbarProps = TestableComponent & {
  /**
   * An array of navigation items.
   */
  items: NavBarItem[];
};

/**
 * Represents an individual navigation item.
 */
export interface NavBarItem extends LinkProps {
  /** The display name of the navigation item. */
  name?: string;
  /** The route URL of the navigation item. */
  route?: string;
  /** The title of the navigation item. */
  title?: ReactNode;
}

/**
 * CSS styles for the `NavBar` component.
 */
const navBarCss: SerializedStyles = css`
  .navbar-mobile-logo {
    display: block;

    @media (min-width: 768px) {
      display: none;
    }
  }

  .navbar-logo {
    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  }
`;

/**
 * `NavBar` is a React component that represents a navigation panel of an application.
 *
 * @example
 * ```jsx
 * <NavBar items={[{name: 'home', Route: '/home', title: 'Home'}]} />
 * ```
 *
 * @param props - Props for the component.
 * @returns NavBar as a React component.
 */
const NavBar = ({items}: NavbarProps): ReactElement => {
  const router: NextRouter = useRouter();
  const shouldReduceMotion: boolean = useReducedMotion();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleRouteChangeComplete = (): void => {
      setMobileMenuOpen(false);
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const transition: Transition = shouldReduceMotion ? {duration: 0} : {};

  return (
    <div className="py-9" css={navBarCss}>
      <nav className="mx-auto flex h-[var(--nextra-navbar-height)] max-w-[90rem] items-center justify-between gap-2 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        <div className="flex justify-center gap-4 align-middle">
          <Link href="/" passHref>
            <a title="Home" href="/" className="hover:opacity-75">
              <MobileLogo
                data-testid="mobile-site-logo"
                alt="Site mobile logo"
                height={40}
                width={40}
                className="navbar-mobile-logo"
              />
              <Logo data-testid="navbar-logo" alt="Site logo" height={32} width={200} className="navbar-logo" />
            </a>
          </Link>
        </div>

        <div className="flex">
          <ul className="hidden lg:flex">
            {items.map((item: NavBarItem) => (
              <NavLink
                key={item.route}
                href={item.route}
                title={item.title as string}
                data-testid={`navbar-item-${item.title}`}
              >
                {item.name}
              </NavLink>
            ))}
          </ul>
          <div className="flex items-center justify-center">
            <div className="noscript-hidden lg:block">
              <ThemeSwitch data-testid="header-theme-switcher" className="mr-4" />
            </div>
            <div className="block lg:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                className="focus:border-primary hover:border-primary border-secondary text-primary inline-flex h-14 w-14 items-center justify-center rounded-full border-2 p-1 transition focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.rect
                    animate={isMobileMenuOpen ? 'open' : 'closed'}
                    variants={{
                      open: {rotate: 45, y: 7},
                      closed: {rotate: 0, y: 0},
                    }}
                    transition={transition}
                    x="6"
                    y="9"
                    width="20"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  />
                  <motion.rect
                    animate={isMobileMenuOpen ? 'open' : 'closed'}
                    variants={{
                      open: {opacity: 0},
                      closed: {opacity: 1},
                    }}
                    transition={transition}
                    x="6"
                    y="15"
                    width="20"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  />
                  <motion.rect
                    animate={isMobileMenuOpen ? 'open' : 'closed'}
                    variants={{
                      open: {rotate: -45, y: -5},
                      closed: {rotate: 0, y: 0},
                    }}
                    transition={transition}
                    x="6"
                    y="21"
                    width="20"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </button>
              {/* Mobile menu */}
              {isMobileMenuOpen && (
                <div className="fixed top-[136px] left-0 right-0 bottom-0 bg-background-main z-50">
                  <AnimatePresence>
                    <motion.div
                      className="absolute left-0 right-0 h-screen"
                      initial={{opacity: 0, y: 50}}
                      animate={{opacity: 1, y: 0}}
                      exit={{opacity: 0, y: 50}}
                    >
                      <ul className="py-4">
                        {items.map((item: NavBarItem) => (
                          <MobileNavLink
                            key={item.route}
                            href={item.route}
                            title={item.title as string}
                            onClick={toggleMobileMenu}
                            data-testid={`navbar-item-${item.title}`}
                          >
                            {item.name}
                          </MobileNavLink>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
