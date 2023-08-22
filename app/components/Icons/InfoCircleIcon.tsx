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

import {cx} from '@emotion/css';
import {ReactElement, SVGProps} from 'react';

/**
 * `InfoCircleIcon` is a React wrapper on a info circle icon SVG.
 *
 * Usage:
 *
 * ```jsx
 * <InfoCircleIcon className="info-circle-icon" height={20} width={20} />;
 * ```
 *
 * @param props - Props for the component.
 * @returns Info circle icon as a React Component.
 */
const InfoCircleIcon = ({className, width = 16, height = 16, ...rest}: SVGProps<SVGSVGElement>): ReactElement => (
  <svg
    aria-hidden="true"
    version="1.1"
    height={height}
    width={width}
    viewBox="0 0 512 512"
    fill="currentColor"
    className={cx('bmui-icon', 'info-circle-icon', 'svg', className)}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
  </svg>
);

export default InfoCircleIcon;
