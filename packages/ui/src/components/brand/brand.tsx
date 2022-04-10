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

import { Image as GeistImage, ImageProps as GeistImageProps, Text as GiestText } from "@geist-ui/core";
import { FunctionComponent, HTMLAttributes, ReactElement, ReactNode } from "react";
import { TestableComponent } from "../../models";

interface Props extends TestableComponent {
  displayName?: string;
  logo?: GeistImageProps;
}

const defaultProps = {
  displayName: "Brand"
};

type NativeAttrs = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>;
 
export type BrandProps = Props & typeof defaultProps & NativeAttrs;

export const Brand: FunctionComponent<BrandProps> = (props: BrandProps): ReactElement => {

  const {
    children,
    displayName,
    logo,
    "data-testid": testId,
    ...rest
  } = props;

  const renderContent = (): ReactNode => {
    
    if (children) {
      return children;
    }

    if (logo) {
      const {
        src,
        ...logoRest
      } = logo;

      return (
        <GeistImage
          width="40px"
          height="40px"
          src={ src }
          { ...logoRest }
        />
      );
    }

    return (
      <div>{ displayName }</div>
    );
  };

  return (
    <div data-testid={ testId } { ...rest }>
      { renderContent() }
    </div>
  );
};

Brand.defaultProps = defaultProps;
