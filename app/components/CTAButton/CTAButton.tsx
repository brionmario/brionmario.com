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

import {ElementType, forwardRef, ReactElement} from 'react';
import {cx} from '@emotion/css';
import {SerializedStyles, css} from '@emotion/react';
import type {TestableComponent} from '../../models/dom';
import type {PolymorphicComponent, PolymorphicRef} from '../../models/component';

/**
 * Type definition for the polymorphic CTAButton component that renders a call-to-action button.
 */
type PolymorphicCTAButtonComponent = <T extends ElementType = 'button'>(
  props: CTAButtonProps<T>,
) => ReactElement | null;

/**
 * The `CTAButtonProps` interface represents the props accepted by the `CTAButton` component.
 */
export type CTAButtonProps<T extends ElementType> = PolymorphicComponent<T> &
  TestableComponent & {
    monospace?: boolean;
    outline?: boolean;
  };

/**
 * CSS for the `CTAButton` component.
 */
const ctaButtonCss: SerializedStyles = css`
  .translating-glow {
    background: linear-gradient(32deg, #2a8af6 0%, #a853ba 50%, #e92a67 100%);
    background-size: 200% 200%;
    animation: translateGlow 7s linear infinite;
    will-change: filter;
  }
`;

/**
 * `CTAButton` is a React component designed to render a call-to-action button.
 *
 * @remarks This component is also Polymorphic.
 *
 * Usage:
 *
 *     ```jsx
 *       <CTAButton onClick={handleClick}>Click me</CTAButton>;
 *     ```
 *
 * @param props - Props for the component.
 * @returns CTAButton as a React Component.
 */
const CTAButton: PolymorphicCTAButtonComponent = forwardRef(
  <T extends ElementType>(
    {as, children, className, key, monospace, onClick, outline, ...rest}: CTAButtonProps<T>,
    ref: PolymorphicRef<T>,
  ): ReactElement => {
    const Element: T | ElementType = as || 'button';
    const outlineClasses: string =
      'border dark:border-neutral-400 dark:text-neutral-200 dark:hover:border-white dark:hover:text-white border-[#EAEAEA] text-neutral-800 hover:border-black hover:text-black';
    const filledClasses: string = 'dark:text-black text-white border-transparent bg-black dark:bg-white';

    return (
      <div className="relative w-full group" css={ctaButtonCss}>
        {/* eslint-disable-next-line react/button-has-type */}
        <Element
          ref={ref}
          key={key}
          onClick={onClick}
          className={`w-full min-w-[120px] text-base font-medium no-underline ${
            outline ? outlineClasses : filledClasses
          } rounded md:leading-6 transition-all duration-300 ${monospace ? 'font-mono' : ''} ${className}`}
          {...rest}
        >
          {children}
        </Element>
        {!outline && (
          <div
            className={cx(
              'absolute bg-red-100 w-full h-full top-0 -z-10 rounded-full transition-all duration-300 blur-xl group-hover:opacity-70 opacity-0',
              'translating-glow',
            )}
          />
        )}
      </div>
    );
  },
);

export default CTAButton;
