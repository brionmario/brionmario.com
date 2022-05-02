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

import { TestableComponent } from "@brionmario/ui";
import { Link, Spacer, Tooltip } from "@geist-ui/core";
import Facebook from "@geist-ui/icons/facebook";
import Github from "@geist-ui/icons/github";
import Instagram from "@geist-ui/icons/instagram";
import LinkedIn from "@geist-ui/icons/linkedin";
import Twitter from "@geist-ui/icons/twitter";
import Youtube from "@geist-ui/icons/youtube";
import capitalize from "lodash-es/capitalize";
import { FC, Fragment, ReactElement } from "react";
import SiteConfig from "../site.config";

export type SocialProps = TestableComponent;

/**
 * Social Connections showcase component.
 *
 * @param props - Social component properties.
 * @returns A ReactElement.
 */
export const Social: FC<SocialProps> = (props: SocialProps): ReactElement => {

  const {
    "data-testid": testId,
    ...rest
  } = props;

  if (!SiteConfig.externalLinks.social) {
    return null;
  }

  /**
   * Dynamically generates the social links.
   * @returns Set of social links as a component.
   */
  const generateSocialLinks = (): ReactElement[] => {

    const socialLinks: Record<string, string> = SiteConfig.externalLinks.social;

    /**
     * FIXME: Next breaks the following dynamic import logic logic.
     * const Icon: FC<IconProps> = dynamic(() => import(`@geist-ui/icons/${ key }`));
     * @param platform The social platform.
     * @returns A Social Icon.
     */
    const resolveSocialIcon = (platform: string): FC<{
      color?: string;
      size?: number | string;
    }> => {

      switch (platform) {
        case "facebook":
          return Facebook;
        case "twitter":
          return Twitter;
        case "github":
          return Github;
        case "linkedIn":
          return LinkedIn;
        case "instagram":
          return Instagram;
        case "youtube":
          return Youtube;
        default:
          return null;
      }
    };

    return Object.keys(socialLinks)
      .map((key: string): ReactElement => {

        const link: string = socialLinks[key];
        const Icon: FC<{
          color?: string;
          size?: number | string;
        }> = resolveSocialIcon(key);

        if (!Icon) {
          return null;
        }

        return (
          <Fragment key={ key }>
            <Link
              href={ link }
              target="_blank"
              data-testid={ `social-link-${ key }` }
              rel="noopener noreferrer"
            >
              <Tooltip text={ capitalize(key) }>
                <Icon size={ 16 } />
              </Tooltip>
              <Spacer inline w={ 2 } />
            </Link>
          </Fragment>
        );
      });
  };

  return (
    <div data-testid={ testId } { ...rest }>
      { generateSocialLinks() }
    </div>
  );
};

const defaultProps: Partial<SocialProps> = {};

Social.defaultProps = defaultProps;
