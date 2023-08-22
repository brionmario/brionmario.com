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
import FadeIn from './FadeIn';
import gradients from './gradients.module.css';

export const GradientSectionBorder = ({children}: {children: React.ReactNode}) => (
  <section className={cx('relative overflow-hidden')}>
    <FadeIn noVertical viewTriggerOffset>
      <span className={cx('w-full absolute white h-[1px] top-0 opacity-25', gradients.gradientSectionBorderDivider)} />
      <span
        className={cx(
          gradients.gradientSectionBorder,
          gradients.gradientSectionBorderLeft,
          'dark:opacity-35 opacity-[0.15]',
        )}
      />
      <span
        className={cx(
          gradients.gradientSectionBorder,
          gradients.gradientSectionBorderRight,
          'dark:opacity-35 opacity-[0.15]',
        )}
      />
    </FadeIn>
    {children}
  </section>
);
