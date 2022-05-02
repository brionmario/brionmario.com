/**
 * MIT License
 *
 * Copyright (c) 2022 Brion Mario
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

import Head from "next/head";
import { FC, ReactElement } from "react";

export interface SEOProps {
  /**
   * Page Title.
   */
  title: string;
  /**
   * Page Description.
   */
  description: string;
}

/**
 * SEO component to be added for pages.
 *
 * @param props - SEO component properties.
 * @returns A ReactElement wrapped with `Head` from `next/head`.
 */
export const SEO: FC<SEOProps> = (props: SEOProps): ReactElement => {

  const {
    description,
    title
  } = props;

  return (
    <Head>
      <title>{ title }</title>
      <meta name="description" content={ description } />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>
  );
};

const defaultProps: Partial<SEOProps> = {
  description: "Hi, I'm Brion Mario. I write software and love to share what i learn with the world.",
  title: "Brion Mario"
};

SEO.defaultProps = defaultProps;
