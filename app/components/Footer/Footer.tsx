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

import {PolymorphicComponent, PolymorphicRef, TestableComponent} from '@brionmario/ui';
import {ElementType, ReactElement, forwardRef} from 'react';
import {cx} from '@emotion/css';
import {css, SerializedStyles} from '@emotion/react';
import Logo from '../Logo';

/**
 * Type definition for the polymorphic `Footer` component that renders a Footer section.
 */
type PolymorphicFooterComponent = <T extends ElementType = 'footer'>(props: FooterProps<T>) => ReactElement | null;

/**
 * The `FooterProps` interface represents the props accepted by the `Footer` component.
 */
export type FooterProps<T extends ElementType> = PolymorphicComponent<T> & TestableComponent;

/**
 * CSS styles for the `Footer` component.
 */
const footerCss: SerializedStyles = css`
  /* Custom styles go here */
`;

/**
 * `Footer` is a React component that represents the Footer section of the website.
 *
 * @remarks This component displays a greeting, a logo, and some additional information about the user.
 *
 * @example
 * ```jsx
 * <Footer className="my-footer" />
 * ```
 *
 * @param props - Props for the component.
 * @returns Footer as a React component.
 */
const Footer: PolymorphicFooterComponent = forwardRef(
  <T extends ElementType>(
    {as, children, className, key, ...rest}: FooterProps<T>,
    ref: PolymorphicRef<T>,
  ): ReactElement => {
    const Element: T | ElementType = as || 'footer';

    return (
      <Element
        ref={ref}
        key={key}
        css={footerCss}
        className={cx('bmui-footer', 'bg-background-main pb-[env(safe-area-inset-bottom)] relative')}
        {...rest}
      >
        <hr className="dark:border-neutral-800" />
        <div
          className={cx(
            'mx-auto max-w-[90rem] py-12 flex justify-center md:justify-center text-black dark:text-white',
            'pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]',
          )}
        >
          <div className="w-full" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
              Footer
            </h2>
            <div className="w-full py-8 mx-auto">
              <div className="xl:grid xl:grid-cols-2 xl:gap-8">
                <div className="flex">
                  <div>
                    <Logo data-testid="footer-site-logo" alt="logo" width={150} />
                    <p className="mt-1 text-xs text-gray-500 dark:text-[#888888]">
                      &copy; {new Date().getFullYear()} brionmario.com. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Element>
    );
  },
);

export default Footer;
