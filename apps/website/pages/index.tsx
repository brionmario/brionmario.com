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
import { Hero, Keyboard, SiteLayout , Text , Theme, useTheme } from "@brionmario/ui";
import { ClassNames } from "@emotion/react";
import Head from "next/head";
import Image from "next/image";
import { FC } from "react";
import { AppFooter, AppHeader } from "../components";
import { ThemeTypes } from "../models";

export type HomePageProps = {};

const HomePage: FC<HomePageProps> = () => {

  const theme: Theme = useTheme();

  const _css: string = getCSS();

  const getWSO2LogoURL = (theme: ThemeTypes | string): string => {

    if (theme === ThemeTypes.DARK) {
      return "/assets/images/wso2-logo-white.svg";
    }

    return "/assets/images/wso2-logo-black.svg";
  };

  return (
    <ClassNames>
      { ({ css, cx }) => (
        <SiteLayout
          fluid
          css={ css(_css) }
          className={ cx(_css, "home-page") }
          header={ <AppHeader data-testid="app-header" /> }
          footer={ <AppFooter data-testid="app-footer" /> }
          data-testid="site-layout"
        >
          <div>
            <Head>
              <title>Geist UI with NextJS</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Hero
              data-testid="hero"
              greeting={ (
                <span className="hero__greeting">
                  <span className="hero__greeting__wave">👋</span>
                HI THERE! I&apos;M
                </span>
              ) }
              title={ [
                "Brion",
                "Mario"
              ] }
              tagline={ (
                <Text b data-testid="hero-tagline" className="hero__tagline">
                  &#123;
                  { " " }
                  <Keyboard className="hero__tagline__eat" data-testid="hero-tagline-eat">EAT</Keyboard>
                  { " " }.{ " " }
                  <Keyboard className="hero__tagline__code" data-testid="hero-tagline-code">CODE</Keyboard>
                  { " " }.{ " " }
                  <Keyboard className="hero__tagline__sleep" data-testid="hero-tagline-sleep">SLEEP</Keyboard>
                  { " " }.{ " " }
                  <Keyboard className="hero__tagline__repeat" data-testid="hero-tagline-repeat">REPEAT</Keyboard>
                  { " " }
                  &#125;
                </Text>
              ) }
              caption={
                <Text data-testid="hero-caption" className="hero__greeting__caption" type="secondary">
                  <div>A front-end enthusiast based in Sri Lanka 🇱🇰.</div>
                  <div className="hero__greeting__caption__employment">
                    Currently working as a Senior Software Engineer at
                    <a
                      href="https://wso2.com"
                      className="hero__greeting__caption__employment__wso2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        alt="wso2 logo"
                        src={ getWSO2LogoURL(theme.type) }
                        width="50px"
                        height="15px"
                      />
                    </a>
                  </div>
                </Text>
              }
              image="https://i1.wp.com/hypebeast.com/image/2020/07/apple-memoji-update-headwear-masks-hairstyles-3.png?w=1600"
            />
          </div>
        </SiteLayout>
      ) }
    </ClassNames>
  );
};

const getCSS = (): string => `
  .hero__greeting {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      align-items: center;
  }
  .hero__greeting__wave {
    font-size: 2em;
    margin-right: 10px;
  }
  .hero__caption {
    max-width: 400px;
  }
  .hero__caption__employment {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
  }
  .hero__greeting__caption__employment__wso2 {
    position: absolute;
    margin-top: 4px;
  }
`;

export default HomePage;
