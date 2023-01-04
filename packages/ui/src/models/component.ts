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

import {ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType} from 'react';

/**
 * Interface to be extended to make a component polymorphic.
 * i.e A polymorphic component is a component that can be rendered with a different container element / node.
 *
 * @example
 * ```jsx
 * <Avatar as='a' />
 * ```
 * In here, `Avatar` container will be an anchor element rather than the usual `div`.
 */
export type PolymorphicComponent<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: T;
};

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];
