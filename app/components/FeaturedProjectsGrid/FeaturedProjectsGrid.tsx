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

import {FC, HTMLAttributes, ReactElement, ReactNode} from 'react';
import {cx} from '@emotion/css';
import type {TestableComponent} from '../../models/dom';
import {useProjects} from '../../api/projects';
import type {Project} from '../../models/projects';
import ProjectCard from '../ProjectCard';
import FadeIn from '../FadeIn/FadeIn';
import {SectionHeader, SectionSubtext} from '../pages/home-shared/Headings';

/**
 * The `FeaturedProjectsGridProps` interface represents the props accepted by the `FeaturedProjectsGrid` component.
 */
export interface FeaturedProjectsGridProps extends HTMLAttributes<HTMLDivElement>, TestableComponent {
  /**
   * The description of the featured projects grid.
   */
  description: ReactNode;
  /**
   * The heading of the featured projects grid.
   */
  heading: ReactNode;
  /**
   * The maximum number of blogs to be displayed.
   */
  limit?: number;
}

const FEATURED_PROJECTS_DEFAULT_MAX_LIMIT: number = 6;

/**
 * `FeaturedProjectsGrid` is a React component that displays a grid of featured project cards.
 *
 * @remarks
 * This component fetches the featured projects using the `useProjects` hook from the `api` module.
 *
 * Usage:
 *
 * ```jsx
 * <FeaturedProjectsGrid
 *   heading="Featured Projects"
 *   description="Check out some of our featured projects."
 *   className="my-4"
 * />
 * ```
 *
 * @param props - Props for the component.
 * @returns FeaturedProjectsGrid as a React component.
 */
const FeaturedProjectsGrid: FC<FeaturedProjectsGridProps> = ({
  heading,
  description,
  className,
  limit = FEATURED_PROJECTS_DEFAULT_MAX_LIMIT,
  ...rest
}: FeaturedProjectsGridProps): ReactElement => {
  const {data} = useProjects({limit});

  /**
   * Handles the navigation to a project page.
   *
   * @param path - The URL of the project page to navigate to.
   */
  const handleProjectNavigate = (path: string): void => {
    window.open(path, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      className={cx(
        'bmui-featured-projects-grid',
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
        {data.featured.map((project: Project) => (
          <FadeIn className="flex" key={`${project.id}-wrapper`}>
            <ProjectCard
              key={project.id}
              data-testid={`featured-project-${project.id}`}
              project={project}
              onClick={(): void => handleProjectNavigate(project.html_url)}
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjectsGrid;
