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
 * `DownloadIcon` is a React wrapper on a download icon SVG.
 *
 * Usage:
 *
 * ```jsx
 * <DownloadIcon className="download-icon" height={20} width={20} />;
 * ```
 *
 * @param props - Props for the component.
 * @returns Download icon as a React Component.
 */
const DownloadIcon = ({className, width = 16, height = 16, ...rest}: SVGProps<SVGSVGElement>): ReactElement => (
  <svg
    aria-hidden="true"
    height={width}
    viewBox={`0 0 ${height} ${width}`}
    version="1.1"
    width={width}
    fill="currentColor"
    className={cx('bmui-icon', 'download-icon', 'svg', className)}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M12.5 4V17M12.5 17L7 12.2105M12.5 17L18 12.2105"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6 21H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default DownloadIcon;
