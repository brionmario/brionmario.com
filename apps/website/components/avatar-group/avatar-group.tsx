/**
 * MIT License
 *
 * Copyright (c) 2023, Brion Mario.
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

import {ElementType, forwardRef, ReactElement, ReactNode} from 'react';
import type {PolymorphicComponent, PolymorphicRef, TestableComponent} from '@brionmario/ui';
import useStyles from './avatar-group.styles';

type PolymorphicAvatarGroupComponent = <T extends ElementType = 'div'>(
  props: AvatarGroupProps<T>,
) => ReactElement | null;

export type AvatarGroupProps<T extends ElementType> = PolymorphicComponent<T> &
  TestableComponent & {
    max: number;
    stack?: boolean;
  };

/**
 * `AvatarGroup` is a React component designed to portrait a set of Avatars.
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
 * @returns Avatar Group as a React Component.
 */
const AvatarGroup: PolymorphicAvatarGroupComponent = forwardRef(
  <T extends ElementType>(props: AvatarGroupProps<T>, ref: PolymorphicRef<T>) => {
    const {as, children, className, key, max, stack, ...rest} = props;

    const {classes, css, cx} = useStyles();

    const Element: T | ElementType = as || 'div';

    const moderateChildren = (): ReactNode[] => {
      let childrenClone: ReactNode[] = [...children];

      if (children.length > max) {
        childrenClone = childrenClone.splice(0, max);
        childrenClone.push(<div className={classes.extra}>+{children.length - max}</div>);
      }

      return childrenClone;
    };

    return (
      <Element
        ref={ref}
        key={key}
        css={css}
        className={cx(classes.root, {[classes.stack]: stack}, className)}
        {...rest}
      >
        {moderateChildren()}
      </Element>
    );
  },
);

export default AvatarGroup;
