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

import {ElementType, ReactElement, forwardRef} from 'react';
import {cx} from '@emotion/css';
import {css, SerializedStyles} from '@emotion/react';
import Image from 'next/future/image';
import type {PolymorphicComponent, PolymorphicRef} from '../../models/component';
import type {TestableComponent} from '../../models/dom';
import Avatar from '../Avatar';
import AvatarGroup from '../AvatarGroup';
import GitHubProjectIcon from '../Icons/GithubProjectIcon';
import type {Project, ProjectContributor} from '../../models/projects';

/**
 * Interface for the polymorphic Project Card component that renders a div by default.
 */
type PolymorphicProjectCardComponent = <T extends ElementType = 'div'>(
  props: ProjectCardProps<T>,
) => ReactElement | null;

/**
 * The `ProjectCardProps` type represents the props accepted by the `ProjectCard` component.
 * It is a generic type that extends `PolymorphicComponent<T>` and `TestableComponent`.
 */
export type ProjectCardProps<T extends ElementType> = PolymorphicComponent<T> &
  TestableComponent & {
    /**
     * The project associated with the card.
     */
    project: Project;
  };

/**
 * CSS styles for the `ProjectCard` component.
 */
const projectCardCss: SerializedStyles = css`
  /* Custom styles go here */
`;

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
 * @returns Project Card as a React component.
 */
const ProjectCard: PolymorphicProjectCardComponent = forwardRef(
  <T extends ElementType>(
    {as, className, project, ...rest}: ProjectCardProps<T>,
    ref: PolymorphicRef<T>,
  ): ReactElement => {
    const {full_name: fullName, description, language, contributors} = project;

    const Element: T | ElementType = as || 'div';

    return (
      <Element
        ref={ref}
        css={projectCardCss}
        className={cx(
          'brionmario-project-card',
          'relative flex flex-col gap-5 p-0 overflow-hidden bg-white text-black no-underline border border-gray-200 hover:border-transparent dark:text-white rounded-md w-full dark:border-neutral-800 hover:dark:border-transparent dark:bg-background-surface hover:shadow-lg focus-ring hover:cursor-pointer',
          className,
        )}
        {...rest}
      >
        <div className="flex flex-col gap-2 h-full justify-between">
          <div className="flex flex-row items-center mt-3 px-3">
            <GitHubProjectIcon className="mt-1 mr-1" />
            <p className="m-0 font-medium leading-5 text-gray-900 dark:text-white">{fullName}</p>
          </div>

          <div className="flex flex-col gap-2 dark:bg-background-surface">
            <p className="m-0 leading-6 opacity-70 px-3 pt-5 h-24 line-clamp-3 font-space-grotesk">{description}</p>
            <div className="flex flex-row items-center justify-between p-3 border-t dark:border-neutral-800">
              <AvatarGroup data-testid="project-avatar-contributors" max={4}>
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
              </AvatarGroup>
              <div className="text-xs opacity-70">{language}</div>
            </div>
          </div>
        </div>
      </Element>
    );
  },
);

export default ProjectCard;
