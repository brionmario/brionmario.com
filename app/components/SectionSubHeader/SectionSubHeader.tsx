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

import {CSSProperties, ElementType, forwardRef, ReactElement} from 'react';
import {cx} from '@emotion/css';
import {css, SerializedStyles} from '@emotion/react';
import type {TestableComponent} from '../../models/dom';
import type {PolymorphicComponent, PolymorphicRef} from '../../models/component';

/**
 * Type definition for the polymorphic SectionHeader component.
 */
type PolymorphicSectionSubHeaderComponent = <T extends ElementType = 'h2'>(
  props: SectionSubHeaderProps<T>,
) => ReactElement | null;

/**
 * Props for the `SectionSubHeader` component.
 */
export type SectionSubHeaderProps<T extends ElementType = 'p'> = PolymorphicComponent<T> &
  TestableComponent & {
    /**
     * Should the sub header be rendered as a Hero sub header.
     */
    hero?: boolean;
    /**
     * Text alignment for the section sub header.
     */
    textAlign?: CSSProperties['textAlign'];
  };

/**
 * CSS for the `SectionSubHeader` component.
 */
const sectionSubHeaderCss: SerializedStyles = css`
  /* Custom styles go here */
`;

/**
 * A component that represents a section sub header.
 *
 * @remarks This component is also Polymorphic.
 *
 * Usage:
 *
 *     ```jsx
 *       <SectionSubHeader as="h2" className="custom-style">Section Title</SectionSubHeader>
 *     ```
 *
 * @param props - Props for the component.
 * @returns A component displaying a section sub header.
 */
const SectionSubHeader: PolymorphicSectionSubHeaderComponent = forwardRef(
  <T extends ElementType>(
    {as, children, className, textAlign, hero, ...rest}: SectionSubHeaderProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const Element = as || 'p';

    const textClasses: string = hero ? 'text-[20px] lg:text-xl' : 'text-[16px] lg:text-[20px]';

    return (
      <Element
        ref={ref}
        className={cx(
          'bmui-section-sub-header',
          `font-space-grotesk leading-snug dark:text-[#FFFFFFB2] text-[#00000080] ${textClasses} max-w-md md:max-w-xl lg:max-w-[640px] text-${textAlign}`,
          className,
        )}
        css={sectionSubHeaderCss}
        {...rest}
      >
        {children}
      </Element>
    );
  },
);

export default SectionSubHeader;
