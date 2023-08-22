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

/**
 * Author Schema.
 */
export interface Author {
  /**
   * Short bio about the author.
   */
  bio: string;
  /**
   * uuid of the author.
   */
  id: string;
  /**
   * Avatar image.
   */
  image: string;
  /**
   * Author's display name.
   */
  name: string;
  /**
   * Author's twitter handle.
   */
  twitterScreenName: string;
  /**
   * Author's username.
   */
  username: string;
}

/**
 * Blog Post frontmatter schema.
 */
export interface BlogPostFrontMatter {
  /**
   * Post Authors.
   */
  authors: Author[];
  /**
   * Post banner image.
   */
  bannerImage: string;
  /**
   * Post published date.
   * @example "2021-08-13"
   */
  date: string;
  /**
   * Post description.
   */
  description: string;
  /**
   * Is the post a draft.
   */
  draft: boolean;
  /**
   * Images for the post.
   */
  images: string[];
  /**
   * Reading time of the post.
   * @example "3 min read"
   */
  readingTime: string;
  /**
   * Slug for the post.
   * @example "/posts/create-react-app-vs-gatsby-vs-next-js/"
   */
  slug: string;
  /**
   * Tags for the post.
   * @example ["create-react-app", "gatsby", "nextjs"]
   */
  tags: string[];
  /**
   * Title of the post.
   * @example "Create React App vs Gatsby vs Next.js"
   */
  title: string;
}

/**
 * Blogs response schema.
 */
export interface Blogs {
  /**
   * List of blogs.
   */
  blogs?: (Page & any)[];
}
