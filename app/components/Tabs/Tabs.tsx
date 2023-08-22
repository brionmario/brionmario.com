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

import {Tabs as NextraTabs, Tab} from 'nextra-theme-docs';
import {ElementType, ReactElement, forwardRef} from 'react';
import useSWR from 'swr';
import {cx} from '@emotion/css';
import {css, SerializedStyles} from '@emotion/react';
import type {TestableComponent} from '../../models/dom';
import type {PolymorphicComponent, PolymorphicRef} from '../../models/component';

/**
 * Type definition for the polymorphic `Tabs` component that represents a tabbed interface.
 */
type PolymorphicTabsComponent = <T extends ElementType = 'div'>(props: TabsProps<T>) => ReactElement | null;

/**
 * The `TabsProps` interface represents the props accepted by the `Tabs` component.
 */
export type TabsProps<T extends ElementType> = PolymorphicComponent<T> &
  TestableComponent & {
    /**
     * The items to be displayed as tabs.
     */
    items: string[];
    /**
     * The storage key to sync tab states across components.
     */
    storageKey?: string;
  };

/**
 * CSS styles for the `Tabs` component.
 */
const tabsCss: SerializedStyles = css`
  /* Custom styles go here */
`;

/**
 * `Tabs` is a React component that represents a tabbed interface.
 *
 * This component displays tabs with the ability to persist and sync the selected tab state.
 *
 * @example
 * ```jsx
 * <Tabs items={['pnpm', 'npm', 'yarn']}>
 *   <Tab>**pnpm**: Fast, disk space efficient package manager.</Tab>
 *  <Tab>**npm** is a package manager for the JavaScript programming language.</Tab>
 *  <Tab>**Yarn** is a software packaging system.</Tab>
 * </Tabs>
 * ```
 *
 * @param props - Props for the component.
 * @returns Tabs as a React component.
 */
const Tabs: PolymorphicTabsComponent = forwardRef(
  <T extends ElementType>(
    {as, children, items, storageKey = 'tab-index', className, key, ...rest}: TabsProps<T>,
    ref: PolymorphicRef<T>,
  ): ReactElement => {
    const Element: T | ElementType = as || NextraTabs;

    // Use SWR to synchronize tab states
    const {data, mutate} = useSWR(storageKey, fetcherKey => {
      try {
        return JSON.parse(localStorage.getItem(fetcherKey));
      } catch (e) {
        return null;
      }
    });

    const selectedIndex = items.indexOf(data);

    return (
      <Element
        ref={ref}
        key={key}
        css={tabsCss}
        className={cx('bmui-tabs', className)}
        onChange={index => {
          localStorage.setItem(storageKey, JSON.stringify(items[index]));
          mutate(items[index], false);
        }}
        selectedIndex={selectedIndex === -1 ? undefined : selectedIndex}
        items={items}
        {...rest}
      >
        {children}
      </Element>
    );
  },
);

export {Tab};
export default Tabs;
