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

import cx from 'clsx';
import {ReactElement, SVGProps} from 'react';

/**
 * `TriangleExclamationIcon` is a React wrapper on a Triangle exclamation icon SVG.
 *
 * Usage:
 *
 * ```jsx
 * <TriangleExclamationIcon className="triangle-exclamation-icon" height={20} width={20} />;
 * ```
 *
 * @param props - Props for the component.
 * @returns Triangle exclamation icon as a React Component.
 */
const TriangleExclamationIcon = ({
  className,
  width = 16,
  height = 16,
  ...rest
}: SVGProps<SVGSVGElement>): ReactElement => (
  <svg
    aria-hidden="true"
    version="1.1"
    height={height}
    width={width}
    viewBox="0 0 512 512"
    fill="currentColor"
    className={cx('bmui-icon', 'triangle-exclamation-icon', 'svg', className)}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
  </svg>
);

export default TriangleExclamationIcon;
