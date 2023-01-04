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

import {css, SerializedStyles} from '@emotion/react';
import cx from 'clsx';

const useStyles = (): {
  classes: {
    root: string;
  };
  css: SerializedStyles;
  cx: typeof cx;
} => ({
  classes: {
    root: 'bm-Hero-root w-auto pb-16 pt-[48px] md:pb-24 lg:pb-32 md:pt-16 lg:pt-40 flex justify-between gap-8 items-center flex-col relative z-0',
  },
  css: css`
    .bm-Hero-root {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMiAzMicgd2lkdGg9JzMyJyBoZWlnaHQ9JzMyJyBmaWxsPSdub25lJyBzdHJva2U9J3JnYigyNTUgMjU1IDI1NS8gMC4wMTUpJz48cGF0aCBkPSdNMCAuNUgzMS41VjMyJy8+PC9zdmc+);
    }
    .hero__title {
      &:first-of-type {
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-animation: hue 10s infinite linear;
        background-image: linear-gradient(90deg, #007cf0, #00dfd8);
      }
    }
    @-webkit-keyframes hue {
      from {
        -webkit-filter: hue-rotate(0deg);
      }
      to {
        -webkit-filter: hue-rotate(360deg);
      }
    }
    .hero__greeting {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      align-items: center;
    }
    .hero__greeting__wave {
      font-size: 2em;
      margin-right: 10px;
    }
    .hero__caption {
      max-width: 400px;
    }
    .hero__greeting__caption__employment__wso2 {
      position: absolute;
      margin-top: 4px;
      margin-left: 5px;
    }
    .mask {
      mask-image: linear-gradient(black, transparent);
      -webkit-mask-image: linear-gradient(black, transparent);
      filter: grayscale(1);
      mix-blend-mode: lighten;
      z-index: -1;
    }
  `,
  cx,
});

export default useStyles;
