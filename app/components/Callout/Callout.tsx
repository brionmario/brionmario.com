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

import {ExclamationCircleIcon, ExclamationIcon, InformationCircleIcon, LightBulbIcon} from '@heroicons/react/solid';
import {ElementType, ReactElement, ReactNode, forwardRef} from 'react';
import {cx} from '@emotion/css';
import {css, SerializedStyles} from '@emotion/react';
import type {TestableComponent} from '../../models/dom';
import type {PolymorphicComponent, PolymorphicRef} from '../../models/component';
import {AvatarProps} from '../Avatar';

/**
 * Type definition for the polymorphic `Callout` component that renders a callout message.
 */
type PolymorphicCalloutComponent = <T extends ElementType = 'div'>(props: AvatarProps<T>) => ReactElement | null;

/**
 * The `CalloutProps` interface represents the props accepted by the `Callout` component.
 */
export type CalloutProps<T extends ElementType> = PolymorphicComponent<T> &
  TestableComponent & {
    icon?: ReactElement;
    type: keyof typeof CalloutTypes;
  };

/**
 * CSS for the `Callout` component.
 */
const calloutStyles: SerializedStyles = css`
  /* Custom styles go here */
`;

const CalloutTypes: {
  [key: string]: {
    classes: string;
    icon: ReactNode;
  };
} = {
  info: {
    classes: 'bg-blue-100 text-blue-800 dark:text-blue-300 dark:bg-blue-200 dark:bg-opacity-10',
    icon: <InformationCircleIcon className="w-5 h-5 mt-1" />,
  },
  idea: {
    classes: 'bg-gray-100 text-gray-800 dark:text-gray-300 dark:bg-gray-200 dark:bg-opacity-10',
    icon: <LightBulbIcon className="w-5 h-5 mt-1" />,
  },
  error: {
    classes: 'bg-red-200 text-red-900 dark:text-red-200 dark:bg-red-600 dark:bg-opacity-30',
    icon: <ExclamationCircleIcon className="w-5 h-5 mt-1" />,
  },
  default: {
    classes: 'bg-orange-100 text-orange-800 dark:text-orange-300 dark:bg-orange-200 dark:bg-opacity-10',
    icon: <ExclamationIcon className="w-5 h-5 mt-1" />,
  },
};

/**
 * `Callout` is a React component designed to display callout messages.
 *
 * @remarks This component is also Polymorphic.
 *
 * Usage:
 *
 *     ```jsx
 *       <Callout icon={ <Icon /> } />;
 *     ```
 *
 * @param props - Props for the component.
 * @returns Callout as a React Component.
 */
const Callout: PolymorphicCalloutComponent = forwardRef(
  <T extends ElementType>(
    {as, children, className, key, icon, type = 'default', ...rest}: CalloutProps<T>,
    ref: PolymorphicRef<T>,
  ): ReactElement => {
    const Element: T | ElementType = as || 'div';

    return (
      <Element
        ref={ref}
        key={key}
        className={cx('brionmario-callout', `${CalloutTypes[type].classes} flex rounded-lg callout mt-6`, className)}
        css={calloutStyles}
        {...rest}
      >
        <div
          className="py-2 pl-3 pr-2 text-xl select-none"
          style={{
            fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          }}
        >
          {icon || CalloutTypes[type].icon}
        </div>
        <div className="py-2 pr-4 overflow-auto">{children}</div>
      </Element>
    );
  },
);

export default Callout;
