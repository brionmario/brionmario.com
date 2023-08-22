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
import Link from 'next/link';
import {ReactElement} from 'react';
import FeaturedProjectsGrid from '../FeaturedProjectsGrid';
import FeaturedBlogsGrid from '../FeaturedBlogsGrid';
import Hero from '../Hero';
import {CTAButton} from './home-shared/CTAButton';
import {FadeIn} from './home-shared/FadeIn';

const HomePage = (): ReactElement => (
  <main className="relative">
    <Hero data-testid="home-page-hero" />
    <section className={cx('relative overflow-hidden')}>
      <FadeIn className="py-16 md:py-24 lg:py-32">
        <FeaturedProjectsGrid
          heading="Opensource Projects"
          description="Here are some of the noteworthy projects I've contributed over the years."
          data-testid="featured-projects-grid"
        />
        <FadeIn noVertical className="relative flex justify-center w-full">
          <div className="max-w-[180px] w-full">
            <CTAButton outline>
              <Link href="/projects">
                <span className="block py-3">Show More</span>
              </Link>
            </CTAButton>
          </div>
        </FadeIn>
      </FadeIn>
    </section>
    <section className={cx('relative overflow-hidden')}>
      <FadeIn className="py-16 md:py-24 lg:py-32">
        <FeaturedBlogsGrid
          heading="Blog Recommendations"
          description="Here are some of my latest writing curated specially for you."
          data-testid="featured-blogs-grid"
        />
        <FadeIn noVertical className="relative flex justify-center w-full">
          <div className="max-w-[180px] w-full">
            <CTAButton outline>
              <Link href="/blog">
                <span className="block py-3">Show More</span>
              </Link>
            </CTAButton>
          </div>
        </FadeIn>
      </FadeIn>
    </section>
  </main>
);

export default HomePage;
