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

import GitHubProjects from '../data/autogen/gh_projects.json';
import {Project, RequestResultInterface} from '../models';

/**
 * Hook to retrieve the Projects index.
 *
 * @param options - Set of options.
 * @returns Projects.
 */
export const useProjects = <Data = {featured: Project[]; projects: Project[]}, Error = unknown>(options?: {
  limit: number;
}): RequestResultInterface<Data> => {
  const FEATURED_TOPICS: string[] = ['featured-project'];

  const filterFeatured = (): Project[] =>
    GitHubProjects.filter((project: Project) =>
      project.topics.some((topic: string) => FEATURED_TOPICS.includes(topic)),
    );

  let sortedProjects: Project[] = filterFeatured();

  if (options?.limit) {
    sortedProjects = sortedProjects.slice(0, options.limit);
  }

  return {
    data: {
      featured: sortedProjects,
      projects: GitHubProjects,
    } as Data,
    error: null as Error,
    isLoading: false,
  };
};
