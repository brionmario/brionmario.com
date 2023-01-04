/* * MIT License
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

import React from 'react';
import Feature from './Feature';
import {LEGACY_REPO_DOCS_FEATURES, LEGACY_REPO_HOME_FEATURES} from '../content/legacy-features';

export function HomeFeatures() {
  return (
    <DetailedFeaturesGrid>
      {LEGACY_REPO_HOME_FEATURES.map(feature => (
        <Feature key={feature.name.split(' ').join('-')} feature={feature} detailed />
      ))}
    </DetailedFeaturesGrid>
  );
}

export function DocsFeatures({detailed = true}: {detailed?: boolean}) {
  return (
    <div className="grid grid-cols-2 gap-6 my-12 sm:grid-cols-3 ">
      {LEGACY_REPO_DOCS_FEATURES.map(feature => (
        <Feature key={feature.name.split(' ').join('-')} feature={feature} detailed={detailed} />
      ))}
    </div>
  );
}

export function DetailedFeaturesGrid({children}: {children?: React.ReactNode}) {
  return (
    <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
      {children}
    </div>
  );
}
