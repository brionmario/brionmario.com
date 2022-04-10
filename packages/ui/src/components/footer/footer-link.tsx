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

import { useTheme } from "@geist-ui/core";
import {
  AnchorHTMLAttributes,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  isValidElement,
  memo
} from "react";

interface Props {
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"]
  href: string
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type FooterLinkProps = Props & NativeAttrs;

const FooterLink: FC<PropsWithChildren<FooterLinkProps>> = (props: FooterLinkProps) => {

  const {
    href,
    children,
    target,
    ...rest
  } = props;

  const theme = useTheme();

  let footerLinkElement: ReactElement | null = null;

  if (isValidElement(children)) {
    footerLinkElement = cloneElement(children, {
      className: "footer-text"
    });
  }

  return (
    <li {...rest }>
      {footerLinkElement || (
        <a className="footer-link" href={href} target={target || "_self"}>
          {children}
        </a>
      )}
      <style jsx>{`
        li:before {
          content: '';
        }
        li :global(.footer-link) {
          color: ${theme.palette.accents_5};
          transition: color 0.1s ease;
        }
        li :global(.footer-link):hover {
          color: ${theme.palette.foreground};
        }
        li {
          color: ${theme.palette.accents_5};
          padding: ${theme.layout.gapQuarter} 0;
        }
      `}</style>
    </li>
  );
};

const MemoFooterLink = memo(FooterLink);

export default MemoFooterLink;
