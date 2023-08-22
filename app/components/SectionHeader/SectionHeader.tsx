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
 * Type definition for the polymorphic SectionHeader component.
 */
type PolymorphicSectionHeaderComponent = <T extends ElementType = 'h2'>(
  props: SectionHeaderProps<T>,
) => ReactElement | null;

/**
 * Props for the `SectionHeader` component.
 */
export type SectionHeaderProps<T extends ElementType = 'h2'> = PolymorphicComponent<T> &
  TestableComponent & {
    /**
     * The HTML tag or custom component to be rendered.
     */
    as?: T;
    /**
     * The content of the section header.
     */
    children: React.ReactNode;
    /**
     * Additional CSS classes for styling.
     */
    className?: string;
  };

/**
 * CSS for the `SectionHeader` component.
 */
const sectionHeaderCss: SerializedStyles = css`
  /* Custom styles go here */
`;

/**
 * A component that represents a section header.
 *
 * @remarks This component is also Polymorphic.
 *
 * Usage:
 *
 *     ```jsx
 *       <SectionHeader as="h2" className="custom-style">Section Title</SectionHeader>
 *     ```
 *
 * @param props - Props for the component.
 * @returns A component displaying a section header.
 */
const SectionHeader: PolymorphicSectionHeaderComponent = forwardRef(
  <T extends ElementType>({as, children, className, ...rest}: SectionHeaderProps<T>, ref: PolymorphicRef<T>) => {
    const Element = as || 'h2';

    return (
      <Element
        ref={ref}
        className={cx(
          'bmui-section-header',
          'font-bold tracking-[-0.01em] pb-1 text-[32px] md:text-4xl lg:text-[40px] max-w-sm md:max-w-md lg:max-w-2xl text-center dark:text-white',
          className,
        )}
        css={sectionHeaderCss}
        {...rest}
      >
        {children}
      </Element>
    );
  },
);

export default SectionHeader;
