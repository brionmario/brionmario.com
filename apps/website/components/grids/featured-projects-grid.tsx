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

import {TestableComponent} from '@brionmario/ui';
import {FC, ReactElement, ReactNode} from 'react';
import {useProjects} from '../../api';
import {Project} from '../../models';
import ProjectCard from '../cards/project-card';
import {FadeIn} from '../pages/home-shared/FadeIn';
import {SectionHeader, SectionSubtext} from '../pages/home-shared/Headings';

export interface FeaturedProjectsGridProps extends TestableComponent {
  description: ReactNode;
  heading: ReactNode;
}

export const FeaturedProjectsGrid: FC<FeaturedProjectsGridProps> = (props: FeaturedProjectsGridProps): ReactElement => {
  const {heading, description} = props;
  const {data} = useProjects();

  const handleProjectNavigate = (path: string): void => {
    window.open(path, '_blank', 'noopener, noreferrer');
  };

  return (
    <section className="relative flex flex-col items-center px-6 pb-16 md:pb-24 lg:pb-32 gap-9 lg:gap-14">
      <FadeIn className="flex flex-col items-center gap-5 md:gap-6">
        <SectionHeader>{heading}</SectionHeader>
        <SectionSubtext>{description}</SectionSubtext>
      </FadeIn>
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6 max-w-[1200px]">
        {data.featured.map((project: Project) => (
          <FadeIn className="flex" key={project.id}>
            <ProjectCard
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
