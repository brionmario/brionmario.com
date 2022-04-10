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

/** @jsxImportSource @emotion/react */
import { ClassNames } from "@emotion/react";
import { Page, PageProps } from "@geist-ui/core";
import { FunctionComponent, HTMLAttributes, PropsWithChildren, ReactElement } from "react";
import { TestableComponent } from "../models";

interface Props extends PageProps, TestableComponent {
  fluid?: boolean;
  footer: ReactElement;
  header: ReactElement;
}

type NativeAttrs = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>;

export type SiteLayoutProps = Props & typeof defaultProps & NativeAttrs;

export const SiteLayout: FunctionComponent<PropsWithChildren<SiteLayoutProps>> = (
  props: PropsWithChildren<SiteLayoutProps>
): ReactElement  => {

  const {
    className,
    fluid,
    footer,
    children,
    header
  } = props;

  return (
    <ClassNames>
      { ({ css, cx }) => (
        <Page css={ css`${ _css }` } className={ cx({ "--fluid": fluid }, "site-layout", className) }>
          <Page.Header>
            { header }
          </Page.Header>
          <Page.Content>
            { children }
          </Page.Content>
          <Page.Footer className="site-layout__footer-wrapper">
            { footer }
          </Page.Footer>
        </Page>
      ) }
    </ClassNames>
  );
};

const _css = `
  &.--fluid {
    padding: 0;
    width: unset;
  }
  .site-layout__footer-wrapper {
    position: unset;
  }
`;

const defaultProps = {
  fluid: false
};

SiteLayout.defaultProps = defaultProps;
