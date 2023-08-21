/**
 * MIT License
 *
 * Copyright (c) 2022, Brion Mario.
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
import type {PolymorphicComponent, PolymorphicRef, TestableComponent} from '@brionmario/ui';
import {cx} from '@emotion/css';
import {css, SerializedStyles} from '@emotion/react';

/**
 * Type definition for the polymorphic Avatar component that renders an avatar.
 */
type PolymorphicAvatarComponent = <T extends ElementType = 'img'>(props: AvatarProps<T>) => ReactElement | null;

/**
 * The `AvatarProps` interface represents the props accepted by the `Avatar` component.
 */
export type AvatarProps<T extends ElementType> = PolymorphicComponent<T> & TestableComponent;

/**
 * CSS for the `Avatar` component.
 */
const avatarCss: SerializedStyles = css`
  /* Custom styles go here */
`;

/**
 * `Avatar` is a React component designed to portrait a person.
 *
 * @remarks This component is also Polymorphic.
 *
 * Usage:
 *
 *     ```jsx
 *       <Avatar src="https://brionmario.com/logo.png" />;
 *     ```
 *
 * @param props - Props for the component.
 * @returns Avatar as a React Component.
 */
const Avatar: PolymorphicAvatarComponent = forwardRef(
  <T extends ElementType>(
    {as, children, className, key, ...rest}: AvatarProps<T>,
    ref: PolymorphicRef<T>,
  ): ReactElement => {
    const Element: T | ElementType = as || 'img';

    return (
      <Element
        ref={ref}
        key={key}
        css={avatarCss}
        className={cx('bmui-avatar', 'w-6 h-6 rounded-full border-2 border-white dark:border-gray-800', className)}
        width={20}
        height={20}
        {...rest}
      >
        {children}
      </Element>
    );
  },
);

export default Avatar;
