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

/** @jsxImportSource @emotion/react */
import {TestableComponent} from '@brionmario/ui';
import Image from 'next/future/image';
import type {FC, HTMLAttributes, ReactElement} from 'react';
import {Project, ProjectContributor} from '../../models';
import Avatar from '../avatar';
import GitHubProjectIcon from '../icons/github-project-icon';

type Props = {
  project: Project;
} & TestableComponent;

type NativeAttrs = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>;

export type BlogCardProps = Props & NativeAttrs;

/**
 * `ProjectCard` is a React component designed to showcase GitHub or any other OSS
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
const ProjectCard: FC<BlogCardProps> = (props: BlogCardProps): ReactElement => {
  const {project, ...rest} = props;
  const {full_name: fullName, description, language, contributors} = project;

  return (
    <div
      className="box-border relative flex flex-col gap-5 p-0 overflow-hidden text-black no-underline border dark:text-white rounded-md w-full dark:border-neutral-800 dark:bg-black hover:border-neutral-500 dark:hover:border-neutral-100 hover:cursor-pointer"
      {...rest}
    >
      <div className="flex flex-col gap-2 h-full justify-between">
        <div className="flex flex-row items-center mt-3 px-3">
          <GitHubProjectIcon className="mt-1 mr-1" />
          <p className="m-0 font-medium leading-5 text-gray-900 dark:text-white">{fullName}</p>
        </div>

        <div className="flex flex-col gap-2 dark:bg-black">
          <p className="m-0 leading-6 opacity-70 px-3 pt-5 h-24 line-clamp-3 font-space-grotesk">{description}</p>
          <div className="flex flex-row items-center justify-between p-3 border-t dark:border-neutral-800">
            <div className="flex -space-x-4 hover:-space-x-0">
              {contributors.map((contributor: ProjectContributor) => (
                <Avatar
                  className="transition-all ease-in-out"
                  key={contributor.id}
                  as={Image}
                  data-testid="project-avatar-contributor"
                  src={contributor.avatar_url}
                  width={20}
                  height={20}
                  alt={`${fullName} Contributor ${contributor.login}`}
                />
              ))}
            </div>
            <div className="text-xs opacity-70">{language}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
