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
    .hero__logo {
      width: 100%;

      .logo-text.mario {
        fill: var(--brionmario-palette-primary-main);
      }

      .logo-text.brion {
        fill: var(--brionmario-palette-current-main);
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

      &__wave {
        font-size: 2em;
        margin-right: 10px;
      }
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
      mask-image: linear-gradient(var(--brionmario-palette-background-main), transparent);
      -webkit-mask-image: linear-gradient(var(--brionmario-palette-background-main), transparent);
      filter: grayscale(1);
      mix-blend-mode: lighten;
      z-index: -1;
    }
  `,
  cx,
});

export default useStyles;
