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

import {PolymorphicComponent, PolymorphicRef, TestableComponent} from '@brionmario/ui';
import {ElementType, ReactElement, ReactNode, forwardRef} from 'react';
import {cx} from '@emotion/css';
import {css, SerializedStyles} from '@emotion/react';
import Link from 'next/link';
import {NextRouter, useRouter} from 'next/router';

/**
 * Type definition for the polymorphic `NavLink` component that represents a navigation link.
 */
type PolymorphicNavLinkComponent = <T extends ElementType = 'a'>(props: NavLinkProps<T>) => ReactElement | null;

/**
 * The `NavLinkProps` interface represents the props accepted by the `NavLink` component.
 */
export type NavLinkProps<T extends ElementType> = PolymorphicComponent<T> &
  TestableComponent & {
    /**
     * The URL the link points to.
     */
    href: string;
    /**
     * The content of the link.
     */
    title?: ReactNode;
  };

/**
 * CSS styles for the `NavLink` component.
 */
const navLinkCss: SerializedStyles = css`
  /* Custom styles go here */
`;

/**
 * `NavLink` is a React component that represents a navigation link.
 *
 * @example
 * ```jsx
 * <NavLink href="/about" title="About Us" />
 * ```
 *
 * @param props - Props for the component.
 * @returns NavLink as a React component.
 */
const NavLink: PolymorphicNavLinkComponent = forwardRef(
  <T extends ElementType>(
    {as, href, title, className, key, ...rest}: NavLinkProps<T>,
    ref: PolymorphicRef<T>,
  ): ReactElement => {
    const router: NextRouter = useRouter();
    const isSelected: boolean = router.pathname === href;

    const Element: T | ElementType = as || 'li';

    return (
      <Element
        ref={ref}
        key={key}
        css={navLinkCss}
        className={cx('bmui-navlink', 'px-5 py-2 flex items-center font-sans', className)}
        href={href}
        {...rest}
      >
        <Link href={href} {...rest} legacyBehavior>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className={cx(
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
      </Element>
    );
  },
);

/**
 * Type definition for the polymorphic `MobileNavLink` component that represents a mobile navigation link.
 */
type PolymorphicMobileNavLinkComponent = <T extends ElementType = 'a'>(
  props: MobileNavLinkProps<T>,
) => ReactElement | null;

/**
 * The `MobileNavLinkProps` interface represents the props accepted by the `MobileNavLink` component.
 */
export type MobileNavLinkProps<T extends ElementType> = PolymorphicComponent<T> &
  TestableComponent & {
    /**
     * The URL the link points to.
     */
    href: string;
    /**
     * The content of the link.
     */
    title?: ReactNode;
  };

/**
 * CSS styles for the `MobileNavLink` component.
 */
const mobileNavLinkCss: SerializedStyles = css`
  /* Custom styles go here */
`;

/**
 * `MobileNavLink` is a React component that represents a mobile navigation link.
 *
 * @example
 * ```jsx
 * <MobileNavLink href="/about" title="About Us" />
 * ```
 *
 * @param props - Props for the component.
 * @returns MobileNavLink as a React component.
 */
export const MobileNavLink: PolymorphicMobileNavLinkComponent = forwardRef(
  <T extends ElementType>(
    {as, href, title, className, key, onClick, ...rest}: MobileNavLinkProps<T>,
    ref: PolymorphicRef<T>,
  ): ReactElement => {
    const router: NextRouter = useRouter();
    const isSelected: boolean = router.pathname === href;

    const Element: T | ElementType = as || 'li';

    return (
      <Element
        ref={ref}
        key={key}
        css={mobileNavLinkCss}
        className={cx(
          'bmui-mobile-navlink',
          'm-5 rounded-md border border-gray-200 hover:border-transparent bg-gray-100 dark:border-neutral-800 hover:dark:border-transparent dark:bg-background-surface hover:shadow-lg focus-ring hover:cursor-pointer text-primary font-sans',
          className,
        )}
        href={href}
        {...rest}
      >
        <Link href={href} {...rest} legacyBehavior>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className={cx(
              'px-5vw py-9 block whitespace-nowrap text-lg font-medium hover:text-primary focus:text-primary focus:outline-none',
              {
                'active text-current': isSelected,
                'text-secondary': !isSelected,
              },
            )}
          >
            {title}
          </a>
        </Link>
      </Element>
    );
  },
);

export default NavLink;
