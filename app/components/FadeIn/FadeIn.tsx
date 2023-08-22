/**
 * MIT License
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

import {cx} from '@emotion/css';
import {Variants, motion, useInView} from 'framer-motion';
import {MutableRefObject, useRef, ReactNode} from 'react';
import {TestableComponent} from '../../models/dom';

/**
 * The `FadeInProps` interface represents the props accepted by the `FadeIn` component.
 */
export type FadeInProps = TestableComponent & {
  /**
   * The children elements to be animated.
   */
  children: ReactNode;
  /**
   * Additional CSS class to be applied to the container element.
   */
  className?: string;
  /**
   * Delay in milliseconds before the animation starts.
   */
  delay?: number;
  /**
   * Specifies if vertical animation should be disabled.
   */
  noVertical?: boolean;
  /**
   * Specifies if the animation should trigger before or after the element enters view.
   */
  viewTriggerOffset?: boolean;
};

/**
 * A component that provides fade-in animation to its children elements when they come into view.
 *
 * @param children - The children elements to be animated.
 * @param className - Additional CSS class to be applied to the container element.
 * @param noVertical- Specifies if vertical animation should be disabled.
 * @param delay - Delay in milliseconds before the animation starts.
 * @param viewTriggerOffset - Specifies if the animation should trigger before or after the element enters view.
 * @returns A component providing fade-in animation.
 */
const FadeIn = ({
  children,
  className,
  noVertical = false,
  delay = 0,
  viewTriggerOffset = false,
  ...rest
}: FadeInProps) => {
  const ref: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const inView: boolean = useInView(ref, {
    once: true,
    margin: viewTriggerOffset ? '-128px' : '0px',
  });

  const fadeUpVariants: Variants = {
    initial: {
      opacity: 0,
      y: noVertical ? 0 : 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={inView ? 'animate' : 'initial'}
      variants={fadeUpVariants}
      className={cx('bmui-fade-in', className)}
      initial={false}
      transition={{
        duration: 1,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
