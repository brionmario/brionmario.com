/**
 * MIT License
 *
 * Copyright (c) 2022, Brion Mario
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

import Image from 'next/future/image';
import Link from 'next/link';
import {useTheme} from 'nextra-theme-docs';
import {ElementType, ReactElement, forwardRef} from 'react';
import {cx} from '@emotion/css';
import {css, SerializedStyles} from '@emotion/react';
import type {PolymorphicComponent, PolymorphicRef} from '../../models/component';
import {ThemeTypes} from '../../models/theme';
import type {TestableComponent} from '../../models/dom';
import Logo from '../Logo';
import {CTAButton} from '../pages/home-shared/CTAButton';
import {FadeIn} from '../pages/home-shared/FadeIn';
import {HeroText, SectionSubtext} from '../pages/home-shared/Headings';
import DownloadIcon from '../Icons/DownloadIcon';

/**
 * Type definition for the polymorphic `Hero` component that renders a hero section.
 */
type PolymorphicHeroComponent = <T extends ElementType = 'div'>(props: HeroProps<T>) => ReactElement | null;

/**
 * The `HeroProps` interface represents the props accepted by the `Hero` component.
 */
export type HeroProps<T extends ElementType> = PolymorphicComponent<T> & TestableComponent;

/**
 * CSS styles for the `Hero` component.
 */
const heroCss: SerializedStyles = css`
  .hero__logo {
    width: 100%;

    .logo-text.mario {
      fill: var(--brionmario-palette-primary-main);
    }

    .logo-text.brion {
      fill: var(--brionmario-palette-current-main);
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
  .hero__greeting {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;

    &__wave {
      font-size: 2em;
      margin-right: 10px;
    }
  }
  .hero__caption {
    max-width: 400px;
  }
  .hero__greeting__caption__employment {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .hero__greeting__caption__employment__wso2 {
    margin-top: 4px;
    margin-left: 5px;
  }
  .mask {
    mask-image: linear-gradient(var(--brionmario-palette-background-main), transparent);
    -webkit-mask-image: linear-gradient(var(--brionmario-palette-background-main), transparent);
    filter: grayscale(1);
    mix-blend-mode: lighten;
    z-index: -1;
  }
`;

/**
 * `Hero` is a React component that represents the hero section of the website.
 *
 * @remarks This component displays a greeting, a logo, and some additional information about the user.
 *
 * @example
 * ```jsx
 * <Hero className="my-hero" />
 * ```
 *
 * @param props - Props for the component.
 * @returns Hero as a React component.
 */
const Hero: PolymorphicHeroComponent = forwardRef(
  <T extends ElementType>(
    {as, children, className, key, ...rest}: HeroProps<T>,
    ref: PolymorphicRef<T>,
  ): ReactElement => {
    const Element: T | ElementType = as || 'div';

    const {resolvedTheme: theme} = useTheme();

    /**
     * Gets the URL for the WSO2 logo based on the current theme.
     *
     * @returns The URL of the WSO2 logo.
     */
    const getWSO2LogoURL = (): string => {
      if (theme === ThemeTypes.DARK) {
        return '/images/logos/white/wso2.svg';
      }

      return '/images/logos/black/wso2.svg';
    };

    /**
     * Handles the resume download action.
     * TODO: Extract this to a hook.
     */
    const onResumeDownload = () => {
      const a = document.createElement('a');

      a.style.display = 'none';
      a.href = `/assets/resume/resume.pdf`;
      a.download = 'Brion Mario - Resume.pdf';
      document.body.appendChild(a);
      a.click();
    };

    return (
      <Element ref={ref} key={key} css={heroCss} {...rest}>
        <FadeIn
          noVertical
          className={cx(
            'bmui-hero',
            'w-auto pb-16 pt-[48px] md:pb-24 lg:pb-32 md:pt-16 lg:pt-40 flex justify-between gap-8 items-center flex-col relative z-0',
            className,
          )}
        >
          <FadeIn
            delay={0.15}
            className="z-50 flex flex-col items-center justify-center gap-5 px-6 text-center lg:gap-6"
          >
            <SectionSubtext hero data-testid="hero-greeting-wrapper" className="hero__greeting">
              <span className="hero__greeting">
                <span className="hero__greeting__wave">👋</span>
                Hi there! I&apos;m
              </span>
            </SectionSubtext>
            <HeroText h1>
              <Logo
                alt="Hero section Logo"
                width={500}
                height={85}
                className="hero__logo"
                data-testid="hero-section-logo"
              />
            </HeroText>
            <SectionSubtext hero>
              <div>A front-end enthusiast based in Sri Lanka 🇱🇰</div>
              <div className="hero__greeting__caption__employment">
                Currently working as a Senior Software Engineer at
                <Link href="https://wso2.com" target="_blank" rel="noopener noreferrer">
                  <span className="hero__greeting__caption__employment__wso2">
                    <Image alt="wso2 logo" src={getWSO2LogoURL()} width={50} height={15} className="block" />
                  </span>
                </Link>
              </div>
            </SectionSubtext>
          </FadeIn>
          <FadeIn delay={0.3} className="z-50 flex flex-col items-center w-full max-w-md gap-5 px-6 md:max-w-lg">
            <div className="flex flex-col w-116 gap-3 md:!flex-row">
              <CTAButton>
                <Link href="/blog">
                  <span className="block py-3">Read the blog</span>
                </Link>
              </CTAButton>
              <CTAButton outline onClick={() => onResumeDownload()}>
                <div className="flex flex-row content-center align-middle justify-center items-center">
                  <span className="block py-3 px-3">Download Resume</span>
                  <DownloadIcon height={20} />
                </div>
              </CTAButton>
            </div>
          </FadeIn>
          <FadeIn delay={0.45} className="mask">
            <Image alt="" src="/images/people/brion-headshot-transparent-001.png" width={400} height={800} />
          </FadeIn>
        </FadeIn>
      </Element>
    );
  },
);

export default Hero;
