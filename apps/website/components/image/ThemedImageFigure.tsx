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

import cn from 'classnames';
import React from 'react';
import {ImageFigureProps} from './ImageFigure';
import {ThemedImage, ThemedImageProps} from './ThemedImage';
export type ThemedImageFigureProps = Omit<ImageFigureProps, 'src'> & ThemedImageProps;

export function ThemedImageFigure(props: ThemedImageFigureProps): React.ReactNode {
  // TODO: Fix types
  // eslint-disable-next-line no-unused-vars
  const {caption, margin = 40, captionSpacing = null, shadow = false, borderRadius = false, ...rest} = props;

  return (
    <figure
      className="block -mx-4 text-center sm:-mx-4 md:-mx-7 lg:-mx-12"
      style={{marginTop: `${margin}px`, marginBottom: `${margin}px`}}
    >
      <div
        className={cn('relative inline-block max-w-full overflow-hidden border-box text-[0px]', {
          'rounded-md': borderRadius,
        })}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <ThemedImage {...rest} />
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
