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
import {
  Badge,
  Image,
  ImageProps,
  Link
} from "@geist-ui/core";
import { FC, HTMLAttributes, ReactElement, ReactNode, isValidElement } from "react";
import { UIException } from "../../exceptions";
import { TestableComponent } from "../../models";

interface Props extends TestableComponent {
  badge?: ReactNode;
  displayName?: string;
  logo?: ImageProps;
}

const defaultProps = {
  displayName: "Brand"
};

type NativeAttrs = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>;

export type BrandProps = Props & typeof defaultProps & NativeAttrs;

export const Brand: FC<BrandProps> = (props: BrandProps): ReactElement => {

  const {
    badge,
    className,
    children,
    displayName,
    logo,
    "data-testid": testId,
    ...rest
  } = props;

  const _css: string = getCSS();

  const renderContent = (): ReactNode => {

    if (children) {
      return children;
    }

    // If Brand Logo and Brand Displayname are not defined, throw...
    if (!logo && !displayName) {
      throw new UIException("A Brand Logo or a Brand Displayname is not defined. Atleast one of these are required.");
    }

    const resolveBadge = (): ReactNode => {

      if (!badge) {
        return null;
      }

      if (typeof badge === "string") {
        return (
          <Badge
            className="brand__badge"
            scale={ 0.1 }
            type="error"
          >
            { badge }
          </Badge>
        );
      }

      if (isValidElement(badge)) {
        return badge;
      }

      return null;
    };

    if (logo) {
      const {
        src,
        ...logoRest
      } = logo;

      return (
        <Badge.Anchor>
          { resolveBadge() }
          <Image
            alt={ logo.alt || "Logo" }
            width="40px"
            height="40px"
            src={ src }
            { ...logoRest }
          />
        </Badge.Anchor>
      );
    }

    return (
      <Badge.Anchor>
        { resolveBadge() }
        <Link>{ displayName }</Link>
      </Badge.Anchor>
    );
  };

  return (
    <ClassNames>
      { ({ css, cx }) => (
        <div
          css={ css(_css) }
          className={ cx("brand", className) }
          data-testid={ testId }
          { ...rest }
        >
          { renderContent() }
        </div>
      ) }
    </ClassNames>
  );
};

const getCSS = (): string => `
  .brand__badge {
    margin-right: 24px !important;
    margin-top: -8px !important;
  }
`;

Brand.defaultProps = defaultProps;
