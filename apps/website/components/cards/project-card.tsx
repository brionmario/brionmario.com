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

import type {TestableComponent} from '@brionmario/ui';
import Image from 'next/future/image';
import type {HTMLAttributes} from 'react';
import {Project} from '../../models';
import GitHubProjectIcon from '../icons/github-project-icon';

type Props = {
  project: Project;
} & TestableComponent;

type NativeAttrs = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>;

export type BlogCardProps = Props & NativeAttrs;

export function ProjectCard(props: BlogCardProps) {
  const {project, ...rest} = props;
  const {full_name, description, language} = project;

  return (
    <div
      className="box-border relative flex flex-col gap-5 p-0 overflow-hidden text-black no-underline border dark:text-white rounded-md dark:border-neutral-800 w-full dark:bg-bunker"
      {...rest}
    >
      <div className="flex flex-col gap-2 h-full justify-between">
        <div className="flex flex-row items-center mt-3 px-3">
          <GitHubProjectIcon className="mt-1 mr-1" />
          <h3 className="m-0 font-medium leading-5 text-gray-900 dark:text-white">{full_name}</h3>
        </div>

        <div className="flex flex-col gap-2 dark:bg-black">
          <p className="m-0 leading-6 opacity-70 px-3 pt-5 h-24 line-clamp-3 font-space-grotesk">{description}</p>
          <div className="flex flex-row items-center justify-between p-3 border-t dark:border-neutral-800">
            <div className="flex -space-x-4">
              <Image
                className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                width={20}
                height={20}
                alt=""
              />
              <Image
                className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                width={20}
                height={20}
                alt=""
              />
              <Image
                className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                width={20}
                height={20}
                alt=""
              />
              <a
                className="flex justify-center items-center w-6 h-6 text-xs font-medium text-white bg-gray-700 rounded-full border-2 border-white hover:bg-gray-600 dark:border-gray-800"
                href="#"
              >
                +99
              </a>
            </div>
            <div className="text-xs opacity-70">{language}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
