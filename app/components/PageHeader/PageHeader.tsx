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
import {css, SerializedStyles} from '@emotion/react';
import type {TestableComponent} from '../../models/dom';
import type {PolymorphicComponent, PolymorphicRef} from '../../models/component';

/**
 * Type definition for the polymorphic `PageHeader` component.
 */
type PolymorphicPageHeaderComponent = <T extends ElementType = 'h2'>(props: PageHeaderProps<T>) => ReactElement | null;

/**
 * Props for the `PageHeader` component.
 */
export type PageHeaderProps<T extends ElementType = 'h2'> = PolymorphicComponent<T> & TestableComponent;

/**
 * CSS for the `PageHeader` component.
 */
const pageHeaderCss: SerializedStyles = css`
  /* Custom styles go here */
`;

/**
 * A component that represents a page header.
 *
 * @remarks This component is also Polymorphic.
 *
 * Usage:
 *
 *     ```jsx
 *       <PageHeader as="h2" className="custom-style">Page Title</PageHeader>
 *     ```
 *
 * @param props - Props for the component.
 * @returns A component displaying a page header.
 */
const PageHeader: PolymorphicPageHeaderComponent = forwardRef(
  <T extends ElementType>({as, children, className, ...rest}: PageHeaderProps<T>, ref: PolymorphicRef<T>) => {
    const Element = as || 'h2';

    return (
      <Element
        ref={ref}
        className={cx(
          'bmui-page-header',
          'font-bold tracking-[-0.01em] pb-1 text-[32px] md:text-4xl lg:text-[40px] max-w-sm md:max-w-md lg:max-w-2xl text-center dark:text-white',
          className,
        )}
        css={pageHeaderCss}
        {...rest}
      >
        {children}
      </Element>
    );
  },
);

export default PageHeader;
