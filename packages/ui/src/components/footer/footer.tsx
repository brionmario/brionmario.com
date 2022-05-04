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

import { GeistUIThemes, useTheme } from "@geist-ui/core";
import { FC, HTMLAttributes, NamedExoticComponent, PropsWithChildren, ReactNode, memo } from "react";
import FooterColumn from "./footer-column";
import { FooterContext } from "./footer-context";
import FooterGroup from "./footer-group";
import FooterLink from "./footer-link";

interface Props {
  reverse?: boolean
  subFooter?: string | ReactNode
  ariaLabel?: string
  maxWidth?: string
  breakPoint?: string
}

const defaultProps = {
  ariaLabel: "Footer Links",
  breakPoint: "960px",
  maxWidth: "1000px",
  reverse: false
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type FooterProps = Props & typeof defaultProps & NativeAttrs;

const Footer: FC<PropsWithChildren<FooterProps>> = (props: FooterProps) => {

  const {
    reverse,
    ariaLabel,
    children,
    subFooter,
    maxWidth,
    breakPoint,
    ...rest
  } = props;

  const theme: GeistUIThemes = useTheme();
  const bgColor = reverse ? `${theme.palette.background}` : `${theme.palette.accents_1}`;

  return (
    <FooterContext.Provider value={ { breakPoint, maxWidth } }>
      <footer {...rest}>
        <nav role="navigation" aria-label={ariaLabel}>
          {children}
        </nav>
        {subFooter && <section>{subFooter}</section>}
        <style jsx>{`
          footer {
            font-size: 0.875rem;
            background: ${bgColor};
            border-top: 1px solid ${theme.palette.accents_2};
            padding: calc(1.5 * ${theme.layout.gap}) ${theme.layout.gap}
              ${theme.layout.gap};
            flex: 1;
            justify-content: flex-start;
            align-items: strech;
          }
          footer nav {
            max-width: ${maxWidth};
            margin: 0 auto;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
          }
          @media screen and (max-width: ${breakPoint}) {
            footer nav {
              flex-direction: column;
            }
          }
          section {
            max-width: ${maxWidth};
            margin: 0 auto;
            margin-top: ${theme.layout.gap};
          }
        `}</style>
      </footer>
    </FooterContext.Provider>
  );
};

type MemoFooterComponent<P = {}> = NamedExoticComponent<P> & {
  Group: typeof FooterGroup
  Link: typeof FooterLink
  Column: typeof FooterColumn
}

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

Footer.defaultProps = defaultProps;

export default memo(Footer) as MemoFooterComponent<ComponentProps>;
