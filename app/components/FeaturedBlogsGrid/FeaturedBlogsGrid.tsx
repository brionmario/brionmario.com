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

import {NextRouter, useRouter} from 'next/router';
import {Page} from 'nextra';
import {FC, HTMLAttributes, ReactElement, ReactNode} from 'react';
import {cx} from '@emotion/css';
import {css, SerializedStyles} from '@emotion/react';
import type {TestableComponent} from '../../models/dom';
import useBlogs from '../../hooks/use-blogs';
import BlogCard from '../BlogCard/BlogCard';
import {FadeIn} from '../pages/home-shared/FadeIn';
import {SectionHeader, SectionSubtext} from '../pages/home-shared/Headings';
import {Blogs} from '../../models/blog';

/**
 * The `FeaturedBlogsGridProps` interface represents the props accepted by the `FeaturedBlogsGrid` component.
 */
export interface FeaturedBlogsGridProps extends HTMLAttributes<HTMLDivElement>, TestableComponent {
  /**
   * The description of the featured blogs grid.
   */
  description: ReactNode;
  /**
   * The heading of the featured blogs grid.
   */
  heading: ReactNode;
  /**
   * The maximum number of blogs to be displayed.
   */
  limit?: number;
}

const BLOG_RECOMMENDATIONS_DEFAULT_MAX_LIMIT: number = 6;

/**
 * CSS for the `FeaturedBlogGrid` component.
 */
const featuredBlogsGridCss: SerializedStyles = css`
  /* Custom styles go here */
`;

/**
 * `FeaturedBlogsGrid` is a React component that displays a grid of featured blog cards.
 *
 * @remarks
 * This component fetches the blogs using the `useBlogs` hook from the `hooks` module.
 *
 * Usage:
 *
 * ```jsx
 * <FeaturedBlogsGrid
 *   heading="Featured Blogs"
 *   description="Explore our featured blog posts."
 *   className="my-4"
 * />
 * ```
 *
 * @param props - Props for the component.
 * @returns FeaturedBlogsGrid as a React component.
 */
const FeaturedBlogsGrid: FC<FeaturedBlogsGridProps> = ({
  heading,
  description,
  className,
  limit = BLOG_RECOMMENDATIONS_DEFAULT_MAX_LIMIT,
  ...rest
}: FeaturedBlogsGridProps): ReactElement => {
  const router: NextRouter = useRouter();
  const {blogs}: Blogs = useBlogs({limit});

  /**
   * Handles the navigation to a blog page.
   *
   * @param path - The path of the blog page to navigate to.
   */
  const handleBlogNavigate = (path: string): void => {
    router.push(path);
  };

  return (
    <section
      css={featuredBlogsGridCss}
      className={cx(
        'bmui-featured-blogs-grid',
        'relative flex flex-col items-center px-6 pb-16 md:pb-24 lg:pb-32 gap-9 lg:gap-14',
        className,
      )}
      {...rest}
    >
      <FadeIn className="flex flex-col items-center gap-5 md:gap-6">
        <SectionHeader>{heading}</SectionHeader>
        <SectionSubtext>{description}</SectionSubtext>
      </FadeIn>
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6 max-w-[1200px]">
        {blogs.map((page: Page & any) => (
          <FadeIn className="flex" key={`${page.route.replace(/\s+/g, '-').toLowerCase()}-wrapper`}>
            <BlogCard
              key={page.route.replace(/\s+/g, '-').toLowerCase()}
              data-testid={`blog-${page.route}`}
              frontMatter={page.children[0].frontMatter}
              onClick={(): void => handleBlogNavigate(page.route)}
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBlogsGrid;
