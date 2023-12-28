/**
 * MIT License
 *
 * Copyright (c) 2023, Brion Mario
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

import Image from 'next/image';
import {ElementType, ReactElement, forwardRef, PropsWithChildren} from 'react';
import {cx} from '@emotion/css';
import {css, SerializedStyles} from '@emotion/react';
import type {TestableComponent} from '../../models/dom';
import type {PolymorphicComponent, PolymorphicRef} from '../../models/component';

/**
 * Type definition for the polymorphic `Tweet` component that represents a tweet.
 */
type PolymorphicTweetComponent = <T extends ElementType = 'div'>(props: TweetProps<T>) => ReactElement | null;

/**
 * The `TweetProps` interface represents the props accepted by the `Tweet` component.
 */
export type TweetProps<T extends ElementType> = PolymorphicComponent<T> &
  TestableComponent & {
    /**
     * The avatar of the twitter user.
     */
    avatar: string;
    /**
     * The date of the tweet.
     */
    date: string;
    /**
     * The name of the twitter user.
     */
    name: string;
    /**
     * The username of the twitter user.
     */
    username: string;
  };

/**
 * CSS styles for the `Tweet` component.
 */
const tweetCss: SerializedStyles = css`
  /* Custom styles go here */
`;

/**
 * `Tweet` is a React component that represents a tweet.
 *
 * This component displays a user's tweet along with their avatar, username, and date.
 *
 * @example
 * ```jsx
 * <Tweet username="john_doe" name="John Doe" avatar="/path/to/avatar.png" date="2023-05-10">
 *   Content of the tweet goes here.
 * </Tweet>
 * ```
 *
 * @param props - Props for the component.
 * @returns Tweet as a React component.
 */
const Tweet: PolymorphicTweetComponent = forwardRef(
  <T extends ElementType>(
    {as, children, username, name, avatar, date, className, key, ...rest}: TweetProps<T>,
    ref: PolymorphicRef<T>,
  ): ReactElement => {
    const Element: T | ElementType = as || 'div';

    return (
      <Element
        ref={ref}
        key={key}
        css={tweetCss}
        className={cx('brionmario-tweet', 'flex p-4 bg-white rounded-md shadow-xl dark:bg-opacity-10')}
        {...rest}
      >
        <div className="flex-shrink-0 mr-4">
          <Image
            className="w-12 h-12 rounded-full"
            width={42}
            height={42}
            src={avatar}
            alt={`${name} twitter avatar`}
          />
        </div>
        <div>
          <div className="flex items-center space-x-1 text-sm">
            <h4 className="font-medium dark:text-white">{name}</h4>
            <div className="truncate dark:text-gray-400">@{username}</div>
            <div className="dark:text-gray-500 md:hidden xl:block">• {date}</div>
          </div>
          <div className="mt-1 text-sm dark:text-gray-200">{children}</div>
        </div>
      </Element>
    );
  },
);

/**
 * Type definition for the `TweetLink` component that represents a link within a tweet.
 */
type TweetLinkProps = PropsWithChildren<{
  href: string;
}>;

/**
 * `TweetLink` is a React component that represents a link within a tweet.
 *
 * @param props - Props for the component.
 * @returns TweetLink as a React component.
 */
const TweetLink = ({href, children}: TweetLinkProps): ReactElement => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block text-[#35ACDF]">
    {children}
  </a>
);

/**
 * `TweetMention` is a React component that represents a Twitter mention (user tag) within a tweet.
 *
 * @param props - Props for the component.
 * @returns TweetMention as a React component.
 */
export const TweetMention = ({children}: PropsWithChildren<string>): ReactElement => (
  <TweetLink href={`https://twitter.com/${(children as string).replace('@', '')}`}>{children}</TweetLink>
);

export default Tweet;
