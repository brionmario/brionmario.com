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

import {Page} from 'nextra';
import {getPagesUnderRoute} from 'nextra/context';
import {useMemo} from 'react';
import {Blogs} from '../models/blog';

/**
 * Hook to retrieve the Blog index.
 *
 * @param options - Set of options.
 * @returns Blogs.
 */
const useBlogs = (options?: {limit: number}): Blogs => {
  let sortedBlogs: (Page & any)[] = useMemo(
    () =>
      getPagesUnderRoute('/blog').sort((a: Page & any, b: Page & any) =>
        b.children[0].frontMatter.date.localeCompare(a.children[0].frontMatter.date),
      ),
    [getPagesUnderRoute('/blog')],
  );

  if (options?.limit) {
    sortedBlogs = sortedBlogs.slice(0, options.limit);
  }

  return {
    blogs: sortedBlogs,
  };
};

export default useBlogs;
