/* * MIT License
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

import Image from 'next/image';

// TODO: Fix Types
function TweetLink({href, children}: any) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block text-[#35ACDF]">
      {children}
    </a>
  );
}

// TODO: Fix Types
export function Mention({children}: any) {
  return <TweetLink href={`https://twitter.com/${children.replace('@', '')}`}>{children}</TweetLink>;
}

// TODO: Fix Types
export default function Tweet({username, name, avatar, date, children}: any) {
  return (
    <div className="flex p-4 bg-white rounded-md shadow-xl dark:bg-opacity-10">
      <div className="flex-shrink-0 mr-4">
        <Image className="w-12 h-12 rounded-full" width={42} height={42} src={avatar} alt={`${name} twitter avatar`} />
      </div>
      <div>
        <div className="flex items-center space-x-1 text-sm">
          <h4 className="font-medium dark:text-white">{name}</h4>
          <div className="truncate dark:text-gray-400">@{username}</div>
          <div className="dark:text-gray-500 md:hidden xl:block">• {date}</div>
        </div>
        <div className="mt-1 text-sm dark:text-gray-200">{children}</div>
      </div>
    </div>
  );
}
