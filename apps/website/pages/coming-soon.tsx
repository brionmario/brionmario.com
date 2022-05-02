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
import { Divider, Grid, Image, Link, Spacer, Text } from "@geist-ui/core";
import { FC } from "react";
import { SEO } from "../components";
import { NewsletterSubscribe } from "../components/newsletter-subscribe";
import { Social } from "../components/social";

export type ComingSoonPageProps = {};

const ComingSoonPage: FC<ComingSoonPageProps> = () => {

  const _css: string = getCSS();

  return (
    <ClassNames>
      { ({ css }) => (
        <div>
          <SEO
            title="Coming Soon | Brion Mario"
            description="I'm currently working on some new imrovements on the website. Check back soon!"
          />
          <Grid.Container
            gap={2}
            css={ css(_css) }
            justify="center"
          >
            <Grid className="coming_soon__section">
              <div className="coming_soon__gradient_patch"></div>
              <Image
                src="assets/images/memoji/brion-coding-memoji.png"
                alt="Brion Coding Memoji"
                draggable={ false }
                height="100px"
              />
              <Text className="coming_soon__title" data-testid="coming-soon-heading" h1>
                Coming Soon
              </Text>
              <Text
                mb={ 0.5 }
                font="18px"
                type="secondary"
                data-testid="coming-soon-description-1"
                className="coming_soon__description"
              >
                Thanks for stopping by, I&apos;m currently working
                on some new imrovements on the website.
              </Text>
              <Text
                mt={ 0 }
                font="18px"
                type="secondary"
                data-testid="coming-soon-description-2"
                className="coming_soon__description"
              >
                Curious about what&apos;s coming 👀 ? Check out the
                <Link
                  ml={ 0.5 }
                  icon
                  color
                  target="_blank"
                  href="https://dev.brionmario.com"
                >
                  DEV Environment.
                </Link>
              </Text>

              <Spacer h={ 3 } />

              <Text
                h4
                data-testid="newsletter-subscription-heading"
              >
                Subscribe to the Newsletter
              </Text>
              <Text
                mt={ 0 }
                font="14px"
                type="secondary"
                data-testid="coming-soon-description"
                className="coming_soon__description"
              >
                If you wish to be notified when the site is up and running, consider subscribing to the newsletter.
              </Text>
              <Spacer h={ 1 } />
              <NewsletterSubscribe data-testid="newsletter-subscriion" />
              <Divider w={ 30 } type="lite" mt={ 4} mb={ 4 } />
              <Social data-testid="social-connections" />
            </Grid>
          </Grid.Container>
        </div>
      ) }
    </ClassNames>
  );
};

const getCSS = (): string => `
  .coming_soon__section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
  .coming_soon__title {
    display: block;
    font-size: 6rem;
    font-weight: 800;
    letter-spacing: -.01em;

    &:first-of-type {
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-animation: hue 10s infinite linear;
      background-image: linear-gradient(90deg,#007CF0,#00DFD8);
    }
  }
  @-webkit-keyframes hue {
    from {
      -webkit-filter: hue-rotate(0deg);
    }
    to {
      -webkit-filter: hue-rotate(360deg);
    }
  }
  .coming_soon__gradient_patch {
    height: 200px;
    width: 200px;
    position: absolute;
    background-image: linear-gradient(to bottom right, #79c0ff, #84edc1, rgba(121,192,255,0));
    filter: blur(12rem);
    margin-top: -190px;
  }
  .coming_soon__description {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
`;

export default ComingSoonPage;
