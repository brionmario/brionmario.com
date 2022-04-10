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
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  memo,
  useState
} from "react";
import { useFooterContext } from "./footer-context";
import { TestableComponent } from "../../models";

interface Props extends TestableComponent {
  title: string | ReactNode;
}

const defaultProps = {
  title: ""
};

type NativeAttrs = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>

export type FooterGroupProps = Props & typeof defaultProps & NativeAttrs;

const FooterGroup: FC<PropsWithChildren<FooterGroupProps>> = (props: FooterGroupProps) => {

  const {
    title,
    children,
    ...rest
  } = props;

  const theme = useTheme();

  const { breakPoint } = useFooterContext();

  const [ expand, setExpand ] = useState(false);

  let titleProps: ReactElement | null = null;

  if (isValidElement(title)) {
    titleProps = cloneElement(title, {
      className: "footer-text",
      onClick: () => setExpand(!expand)
    });
  }

  return (
    <div {...rest }>
      {titleProps || (
        <p onClick={() => setExpand(!expand)} className="footer-text">
          {title}
        </p>
      )}
      <ul>{children}</ul>

      <style jsx>{`
        div{
          margin-bottom:20px;
        }
        :global(.footer-text) {
          font-weight: 400;
          font-size: 0.875rem;
          margin: ${theme.layout.gap} 0;
        }
        ul {
          margin: 0;
        }
        @media screen and (max-width: ${breakPoint}) {
          div{
            border-bottom: 1px solid ${theme.palette.accents_2};
          }
          .footer-text {
            cursor:pointer;
          }
          .footer-text :after {
            content: '${expand ? "-" : "+"}';
            float: right;
            transition: transform .15s ease;
          }
          ul{
            display: ${expand ? "block" : "none"};
          }
        }
        }
      `}</style>
    </div>
  );
};

const MemoFooterGroup = memo(FooterGroup);

export default MemoFooterGroup;
