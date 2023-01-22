#!/usr/bin/env node
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

/**
 * @fileoverview Data Seeder Script for the Website.
 * Call this script like follows.
 *     node dataseedr.js --token=<YOUR GITHUB PAT>
 */

const yargs = require('yargs');
const {hideBin} = require('yargs/helpers');
const fetch = require('node-fetch');
const fs = require('fs-extra');
const path = require('path');

const {argv} = yargs(hideBin(process.argv));

// Constants.
const Logger = Object.freeze({
  /* eslint-disable no-console */
  debug: console.log,
  error: console.error,
  info: console.log,
  warn: console.warn,
  /* eslint-enable no-console */
});
const SUPPORTED_CLI_ARGS = Object.freeze({
  TOKEN: 'token',
  SITE_NAME: 'site-name',
  GH_REPO_OWNER: 'gh-repo-owner',
});
const CLI_ARG_DEFAULTS = Object.freeze({
  SITE_NAME: 'brionmario.com',
  GH_REPO_OWNER: 'brionmario',
});
const GH_PER_PAGE_DEFAULT_COUNT = 100;
const GH_PROJECTS_OUTPUT_PATH = path.join(__dirname, '..', 'data', 'autogen', 'gh_projects.json');

// Resolved CLI args.
const GH_ACCESS_TOKEN = argv[SUPPORTED_CLI_ARGS.TOKEN];
const SITE_NAME = argv[SUPPORTED_CLI_ARGS.SITE_NAME] || CLI_ARG_DEFAULTS.SITE_NAME;
const GH_REPO_OWNER = argv[SUPPORTED_CLI_ARGS.GH_REPO_OWNER] || CLI_ARG_DEFAULTS.GH_REPO_OWNER;

// Field level variables.
let CHECKPOINTS_COUNTER = 1;
let GH_AUTHORIZATION = '';

const setGhAuthorization = () => {
  if (!GH_ACCESS_TOKEN) {
    Logger.info('🔐 No access token supplied.');
    Logger.info('\n    → Access Token should be supplied as the first argument for this script.');
    Logger.info('    → Falling back to default no-authorization mode...');

    return;
  }

  GH_AUTHORIZATION = `Bearer ${GH_ACCESS_TOKEN}`;
};

const announceCheckpoint = checkpoint => {
  Logger.info('\n=================================================================================================');
  Logger.info(`# ${CHECKPOINTS_COUNTER} ${checkpoint}`);
  Logger.info('=================================================================================================\n');
  CHECKPOINTS_COUNTER += 1;
};

const generateGhProjects = async () => {
  announceCheckpoint('🐱 Generating GitHub Project list.');

  const TOPICS_TO_MATCH = ['featured-project', 'portfolio'];
  // Override if necessary.
  const authorization = GH_AUTHORIZATION;
  const repoOwner = GH_REPO_OWNER;
  const perPage = GH_PER_PAGE_DEFAULT_COUNT;

  let page = 1;
  let hasNextPage = false;
  let projects = [];

  do {
    Logger.info(`\n🤘 PAGE ${page} - Fetching repo list.`);

    // FIXME: This could be added to an array of promises and resolved later.
    // eslint-disable-next-line no-await-in-loop
    const projectResponse = await fetch(
      `https://api.github.com/users/${repoOwner}/repos?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: authorization,
        },
      },
    );
    // eslint-disable-next-line no-await-in-loop
    const originalProjects = await projectResponse.json();

    // We don't want private projects and also projects that are not meant for the site.
    // REMARK: This is done via setting any of topics defined in `TOPICS_TO_MATCH` array in the repository.
    const filteredProjects = originalProjects.filter(
      project => project.topics.some(topic => TOPICS_TO_MATCH.includes(topic)) && project.private === false,
    );

    if (originalProjects.length !== 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const project of filteredProjects) {
        if (!project.contributors_url) {
          // eslint-disable-next-line no-continue
          continue;
        }

        try {
          // eslint-disable-next-line no-await-in-loop
          const contributorsResponse = await fetch(project.contributors_url, {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: authorization,
            },
          });
          // eslint-disable-next-line no-await-in-loop
          const contributors = await contributorsResponse.json();

          // Append the contributors to the projects object.
          project.contributors = contributors;
          Logger.info(`\n    → 👩‍🚀 Contributors were successfully fetched for '${project.name}' GitHub project.`);
        } catch (e) {
          Logger.error(`\n❌ Could not fetch the contributors for '${project.name}' GitHub project.`);
          Logger.error('\n    → The following error occurred.');
          Logger.error(`\n    → ${e.toString()}\n`);
        }
      }

      projects = [...projects, ...filteredProjects];
      page += 1;
      hasNextPage = true;
    } else {
      Logger.info(`\n⛔️ PAGE ${page} - Response is empty. Treating the situation as end of pagination...`);
      hasNextPage = false;
    }
  } while (hasNextPage);

  try {
    fs.writeFileSync(GH_PROJECTS_OUTPUT_PATH, JSON.stringify(projects, null, 2));
    Logger.info('\n✅ GitHub projects were written to the JSON at the following location.');
    Logger.info(`\n    → ${GH_PROJECTS_OUTPUT_PATH}\n`);
  } catch (e) {
    Logger.error('\n❌ Could not write the GitHub projects to the JSON.');
    Logger.error('\n    → The following error occurred.');
    Logger.error(`\n    → ${e.toString()}\n`);
  }
};

/* ====================================================================================== */
/* Execution starts from here                                                             */
/* ====================================================================================== */

Logger.info(`\n=======================  💥 Welcome to the ${SITE_NAME} Data Seeder 💥  =======================\n`);

setGhAuthorization();
generateGhProjects();
