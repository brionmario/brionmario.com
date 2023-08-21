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

import {ReactElement} from 'react';
import {useProjects} from '../../api';
import type {Project} from '../../models/projects';
import ProjectCard from '../ProjectCard';
import {FadeIn} from './home-shared/FadeIn';

const ProjectsPage = (): ReactElement => {
  const {data} = useProjects();

  const handleProjectNavigate = (path: string): void => {
    window.open(path, '_blank', 'noopener, noreferrer');
  };

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6">
      {data.projects.map((project: Project) => (
        <FadeIn className="flex" key={project.id}>
          <ProjectCard
            data-testid="featured-project"
            project={project}
            onClick={(): void => handleProjectNavigate(project.html_url)}
          />
        </FadeIn>
      ))}
    </div>
  );
};

export default ProjectsPage;
