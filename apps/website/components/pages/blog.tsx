/**
 * MIT License
 *
 * Copyright (c) 2023, Brion Mario.
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
import {getPagesUnderRoute} from 'nextra/context';
import {ReactElement} from 'react';
import BlogCard from '../cards/blog-card';
import {FadeIn} from './home-shared/FadeIn';

const BlogPage = (): ReactElement => {
  const router: NextRouter = useRouter();

  const handleBlogNavigate = (path: string): void => {
    router.push(path);
  };

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6">
      {getPagesUnderRoute('/blog').map((page: Page & any) => (
        <FadeIn className="flex" key={page.route.replace(/\s+/g, '-').toLowerCase()}>
          <BlogCard
            data-testid={`${page.route}-blog`}
            frontMatter={page.children[0].frontMatter}
            onClick={(): void => handleBlogNavigate(page.route)}
          />
        </FadeIn>
      ))}
    </div>
  );
};

export default BlogPage;