/* * MIT License
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
import React, {ReactElement, ReactNode} from 'react';

const THEMES = {
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

export default function Callout({
  children,
  type = 'default',
  icon,
}: {
  children: ReactNode;
  type: keyof typeof THEMES;
  icon: ReactElement;
}) {
  return (
    <div className={`${THEMES[type].classes} flex rounded-lg callout mt-6`}>
      <div
        className="py-2 pl-3 pr-2 text-xl select-none"
        style={{
          fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        }}
      >
        {icon || THEMES[type].icon}
      </div>
      <div className="py-2 pr-4 overflow-auto">{children}</div>
    </div>
  );
}
