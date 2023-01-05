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

import cn from 'classnames';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {ThemeSwitch} from 'nextra-theme-docs';
import {ReactElement, ReactNode, useState} from 'react';
import Logo from './logos/logo';

function FooterLink({href, children}: {href: string; children: ReactNode}) {
  const classes =
    'text-sm text-[#666666] dark:text-[#888888] no-underline betterhover:hover:text-gray-700 betterhover:hover:dark:text-white transition';
  if (href.startsWith('http')) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href}>
      <a className={classes}>{children}</a>
    </Link>
  );
}

function FooterHeader({children}: {children: ReactNode}) {
  return <h3 className="text-sm text-black dark:text-white">{children}</h3>;
}

const navigation = {
  general: [
    {name: 'Blog', href: '/blog'},
    {name: 'Releases', href: 'https://github.com/vercel/turbo/releases'},
  ],
  repo: [
    {name: 'Documentation', href: '/repo/docs'},
    {
      name: 'API Reference',
      href: '/repo/docs/reference/command-line-reference',
    },
    {name: 'FAQ', href: '/repo/docs/faq'},
  ],
  pack: [
    {name: 'Documentation', href: '/pack/docs'},
    {name: 'Features', href: '/pack/docs/features'},
  ],
  support: [
    {
      name: 'GitHub',
      href: 'https://github.com/vercel/turbo',
    },
    {
      name: 'Discord',
      href: 'https://turbo.build/discord',
    },
  ],
  company: [
    {name: 'Vercel', href: 'https://vercel.com'},
    {
      name: 'Open Source Software',
      href: 'https://vercel.com/oss?utm_source=turbo.build&utm_medium=referral&utm_campaign=footer-ossLink',
    },
    {
      name: 'Contact Sales',
      href: 'https://vercel.com/contact/turborepo?utm_source=turbo.build&utm_medium=referral&utm_campaign=footer-enterpriseLink',
    },
    {name: 'Twitter', href: 'https://twitter.com/vercel'},
  ],
  legal: [
    {name: 'Privacy Policy', href: '/privacy'},
    {name: 'Terms of Service', href: '/terms'},
  ],
};

export function FooterContent() {
  return (
    <div className="w-full" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="w-full py-8 mx-auto">
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="flex">
            <div>
              <Logo alt="logo" width={150} />
              <p className="mt-1 text-xs text-gray-500 dark:text-[#888888]">
                &copy; {new Date().getFullYear()} brionmario.com. All rights reserved.
              </p>
            </div>
          </div>
          {/* <div className="grid grid-cols-1 gap-8 xl:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 md:gap-8">
              <div className="mt-12 md:!mt-0">
                <FooterHeader>Resources</FooterHeader>
                <ul role="list" className="mt-4 space-y-1.5 list-none ml-0">
                  {navigation.general.map(item => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:!mt-0">
                <FooterHeader>Turborepo</FooterHeader>
                <ul role="list" className="mt-4 space-y-1.5 list-none ml-0">
                  {navigation.repo.map(item => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:!mt-0">
                <FooterHeader>Turbopack</FooterHeader>
                <ul role="list" className="mt-4 space-y-1.5 list-none ml-0">
                  {navigation.pack.map(item => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:!mt-0">
                <FooterHeader>Company</FooterHeader>
                <ul role="list" className="mt-4 space-y-1.5 list-none ml-0">
                  {navigation.company.map(item => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:!mt-0">
                <FooterHeader>Legal</FooterHeader>
                <ul role="list" className="mt-4 space-y-1.5 list-none ml-0">
                  {navigation.legal.map(item => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:!mt-0">
                <FooterHeader>Support</FooterHeader>
                <ul role="list" className="mt-4 space-y-1.5 list-none ml-0">
                  {navigation.support.map(item => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 xl:!mt-0">
            <FooterHeader>Subscribe to our newsletter</FooterHeader>
            <p className="mt-4 text-sm text-gray-600 dark:text-[#888888]">
              Subscribe to the Turbo newsletter and stay updated on new releases and features, guides, and case studies.
            </p>
            <SubmitForm />
          </div>*/}
        </div>

        {/* <div className="pt-8 mt-8 sm:flex sm:items-center sm:justify-between">
          <div>
            <a
              className="text-current"
              target="_blank"
              rel="noopener noreferrer"
              title="vercel.com homepage"
              href="https://vercel.com?utm_source=turbo.build&utm_medium=referral&utm_campaign=footer-logoLink"
            >
              <Logo alt="logo" width={150} />
            </a>
            <p className="mt-1 text-xs text-gray-500 dark:text-[#888888]">
              &copy; {new Date().getFullYear()} brionmario.com. All rights reserved.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function SubmitForm() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  return (
    <form
      className="mt-4 sm:flex sm:max-w-md"
      onSubmit={e => {
        fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email}),
        })
          .then(res => res.json())
          .then(() => {
            return router.push('/confirm');
          });
        e.preventDefault();
      }}
    >
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        name="email-address"
        id="email-address"
        autoComplete="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border-[#666666] dark:border-[#888888] w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border rounded-md appearance-none dark:text-white sm:text-sm dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:border-white focus:placeholder-gray-400"
        placeholder="you@example.com"
      />
      <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
        <button
          type="submit"
          className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-black border border-transparent rounded-md dark:bg-white dark:text-black sm:text-sm betterhover:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-white dark:betterhover:hover:bg-gray-300"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}

export function Footer({menu}: {menu?: boolean}): ReactElement {
  return (
    <footer className="bg-[#FAFAFA] pb-[env(safe-area-inset-bottom)] relative dark:bg-[#111111]">
      <hr className="dark:border-neutral-800" />
      <div
        className={cn(
          'mx-auto max-w-[90rem] py-12 flex justify-center md:justify-center text-black dark:text-white',
          'pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]',
        )}
      >
        <FooterContent />
      </div>
    </footer>
  );
}
