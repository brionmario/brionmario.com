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

/** @jsxImportSource @emotion/react */
import {TestableComponent} from '@brionmario/ui';
import Image from 'next/future/image';
import type {FC, HTMLAttributes, ReactElement} from 'react';
import dayjs from 'dayjs';
import Avatar from '../avatar';
import {Author, BlogPostFrontMatter} from '../../models';

type Props = {
  frontMatter: BlogPostFrontMatter;
} & TestableComponent;

type NativeAttrs = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>;

export type BlogCardProps = Props & NativeAttrs;

/**
 * `BlogCard` is a React component designed to showcase GitHub or any other OSS
 * projects that adhere to the `Project` schema.
 *
 * Usage:
 *
 * ```jsx
 * <ProjectCard className="gh-project-card" project={OSSProject} />;
 * ```
 *
 * @param props - Props for the component.
 * @returns Project Card as a React Component.
 */
const BlogCard: FC<BlogCardProps> = (props: BlogCardProps): ReactElement => {
  const {frontMatter, ...rest} = props;
  const {bannerImage, date, title, description, authors, readingTime} = frontMatter;

  return (
    <div
      className="flex flex-col gap-2 h-full justify-between bg-white border border-gray-200 hover:border-transparent rounded-md text-black no-underline dark:text-white dark:border-neutral-800 hover:dark:border-transparent dark:bg-background-surface focus-ring hover:cursor-pointer"
      {...rest}
    >
      <div className="relative h-52">
        <Image
          className="absolute h-full w-full object-cover rounded-tr-md rounded-tl-md"
          src={bannerImage}
          alt=""
          width={300}
          height={100}
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">{title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">{description}</p>
      </div>
      <div className="p-5">
        <div className="flex flex-row items-center justify-between">
          <div className="text-xs opacity-70">{readingTime}</div>
          <div className="flex flex-space-x-4 items-center">
            <div className="text-xs opacity-70 mr-2">{dayjs(date).format('MMM DD, YYYY')}</div>
            {authors.map((author: Author) => (
              <Avatar
                as={Image}
                data-testid="blog-author-avatar"
                src={author.image}
                width={20}
                height={20}
                alt={`${author.name}'s Avatar`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
