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
import { Grid, Image, ImageProps, Text } from "@geist-ui/core";
import { FC, HTMLAttributes, ReactElement, ReactNode } from "react";
import { Theme, useTheme } from "../../hooks";
import { TestableComponent } from "../../models";

interface Props extends TestableComponent {
  caption: ReactNode;
  tagline: ReactNode;
  image: string | ImageProps;
  greeting: ReactNode;
  title: ReactNode | ReactNode[];
}

type NativeAttrs = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>;

export type HeroProps = Props & typeof defaultProps & NativeAttrs;

export const Hero: FC<HeroProps> = (props: HeroProps): ReactElement => {

  const {
    caption,
    className,
    greeting,
    image,
    title,
    tagline,
    "data-testid": testId,
    ...rest
  } = props;

  const theme: Theme = useTheme();

  const _css = getCSS(theme);

  return (
    <ClassNames>
      { ({ css, cx }) => (
        <Grid.Container
          gap={2}
          justify="center"
          height="100%"
          data-testid={ testId }
          className={ cx("hero", className) }
          css={ css(_css) }
          { ...rest }
        >
          <Grid>
            <Image
              src={ typeof image === "string" ? image : image.src }
              alt={ typeof image === "string" ? "Hero Image" : image?.alt }
              draggable={ false }
              height="600px"
              { ...(typeof image === "string" ? {} : { ...image }) }
            />
          </Grid>
          <Grid>
            <Text data-testid="hero-greeting-wrapper" h6 className="hero__greeting">{ greeting }</Text>
            <Text data-testid="hero-title-wrapper" h1>
              {
                Array.isArray(title)
                  ? title.map((t, i) => (
                    <span data-testid="hero-title-partial-wrapper" className="hero__title" key={ i }>{ t }</span>
                  ))
                  : <span data-testid="hero-title-partial-wrapper" className="hero__title">{ title }</span>
              }
            </Text>
            { caption && <Text data-testid="hero-caption-wrapper">{ caption }</Text> }
            { tagline && (
              typeof tagline === "string"
                ? <Text b data-testid="hero-tagline-wrapper" className="hero__tagline">{ tagline }</Text>
                : tagline
            ) }
          </Grid>
        </Grid.Container>
      ) }
    </ClassNames>
  );
};

const getCSS = (theme: Theme): string => `
.hero__greeting {
  letter-spacing: 2px !important;
  margin-bottom: 0;
}
.hero__title {
  display: block;
  font-size: 8rem;
  line-height: 0.9;
  font-weight: 800;
  letter-spacing: -.01em;
  padding-right: 8px;

  @media (min-width: 1200px) {
    font-size: 10rem;
  }
  @media (max-width: 720px) {
    font-size: 23vw;
  }
}
.hero__tagline {
  color: ${ theme.palette.cyan }
}
`;

const defaultProps = {};

Hero.defaultProps = defaultProps;
