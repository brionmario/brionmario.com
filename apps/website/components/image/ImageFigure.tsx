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

import Image from 'next/future/image';
import React from 'react';

type ImageProps = Parameters<typeof Image>[0];

export type ImageFigureProps = ImageProps & {
  caption?: string;
  margin?: number;
  captionSpacing?: number;
  shadow?: boolean;
  borderRadius?: boolean;
};

export function ImageFigure(props: ImageFigureProps): React.ReactNode {
  // TODO: Fix types
  // eslint-disable-next-line no-unused-vars
  const {caption, margin = 40, captionSpacing = null, shadow = false, borderRadius = false, ...rest} = props;

  return (
    <figure className="block text-center" style={{margin: `${margin}px 0`}}>
      <div className="relative inline-block w-full max-w-full overflow-hidden border-box text-[0px]">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image {...rest} />
      </div>
      {caption && (
        <figcaption
          className="m-0 text-xs text-center text-gray-500"
          style={captionSpacing ? {marginTop: captionSpacing} : {}}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
