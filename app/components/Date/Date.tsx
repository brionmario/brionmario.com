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

import {ElementType, forwardRef, ReactElement} from 'react';
import {cx} from '@emotion/css';
import {css, SerializedStyles} from '@emotion/react';
import type {PolymorphicComponent, PolymorphicRef} from '../../models/component';
import type {TestableComponent} from '../../models/dom';

/**
 * Type definition for the polymorphic component that renders a date.
 */
type PolymorphicDateComponent = <T extends ElementType = 'div'>(props: DateProps<T>) => ReactElement | null;

/**
 * The `DateProps` interface represents the props accepted by the `Date` component.
 */
export type DateProps<T extends ElementType> = PolymorphicComponent<T> & TestableComponent;

/**
 * CSS for the `Date` component.
 */
const dateCss: SerializedStyles = css`
  /* Custom styles go here */
`;

/**
 * `Date` is a React component designed to display dates.
 *
 * @remarks This component is also Polymorphic.
 *
 * Usage:
 *
 *     ```jsx
 *       <Date>27 Dec, 2022</Date>;
 *     ```
 *
 * @param props - Props for the component.
 * @returns Date as a React Component.
 */
const Date: PolymorphicDateComponent = forwardRef(
  <T extends ElementType>({as, children, className, ...rest}: DateProps<T>, ref: PolymorphicRef<T>): ReactElement => {
    const Element: T | ElementType = as || 'div';

    return (
      <Element
        ref={ref}
        css={dateCss}
        className={cx(
          'brionmario-date',
          'text-sm mt-2 text-center text-gray-500 dark:text-gray-400 font-space-grotesk',
          className,
        )}
        width={20}
        height={20}
        {...rest}
      >
        {children}
      </Element>
    );
  },
);

export default Date;
