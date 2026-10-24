<div align="center">

![brionmario.com](.github/banner.png)

**[Home](https://brionmario.com)** ·
**[Blog](https://brionmario.com/blog)** ·
**[Projects](https://brionmario.com/projects)** ·
**[Community](https://brionmario.com/community)** ·
**[Research](https://brionmario.com/research)** ·
**[About](https://brionmario.com/about)**

</div>

---

## What's here

This is my corner of the internet — the code behind [brionmario.com](https://brionmario.com).

It's where I write things down, keep a record of what I've built, and collect the talks
and workshops I've given along the way. There's a page about me, a map of the places
I've been, and the papers I've published. Nothing here is behind a login or a paywall.

[![Content Powered By Medmark](https://img.shields.io/badge/Content_Powered_By-Medmark-yellow?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iNTUiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA1NSA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE4MzZfMikiPgo8cGF0aCBkPSJNNDMuODUgMzYuNTVDNDMuODUgMzcuMDUgNDQuMDE2NyAzNy40NSA0NC4zNSAzNy43NUw0Ny42NSA0MC45VjQxSDMxVjQwLjlMMzQuMzUgMzcuNzVDMzQuNjUgMzcuNDUgMzQuOCAzNy4wNSAzNC44IDM2LjU1VjE2LjQ1QzM0LjggMTUuNDUgMzQuODUgMTQuNDUgMzQuOTUgMTMuNDVMMjMuNjUgNDEuNEgyMy41NUwxMS44NSAxNS43QzExLjM1IDE0LjY2NjcgMTEuMDMzMyAxMy45MzMzIDEwLjkgMTMuNVYzMi42QzEwLjkgMzMuMSAxMS4xMTY3IDMzLjY1IDExLjU1IDM0LjI1TDE2LjYgNDAuOVY0MUg0LjE1VjQwLjlMOS4yIDM0LjI1QzkuNjMzMzMgMzMuNjUgOS44NSAzMy4xIDkuODUgMzIuNlYxMi44QzkuODUgMTIuMiA5LjcgMTEuNzE2NyA5LjQgMTEuMzVMNS4zIDUuOTVWNS44NUgxNy4yNUwyNy43IDI4LjY1TDM2LjkgNS44NUg0Ny42NVY1Ljk1TDQ0LjM1IDkuNkM0NC4wMTY3IDkuOTMzMzMgNDMuODUgMTAuMzUgNDMuODUgMTAuODVWMzYuNTVaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c%2BCjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE4MzZfMiI%2BCjxyZWN0IHdpZHRoPSI1NSIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K)](https://github.com/brionmario/medmark)

I write on [Medium](https://medium.com/@brionmario) and treat it as the source of truth
for my posts. Rather than copy them over by hand, I run my Medium export through
[Medmark](https://github.com/brionmario/medmark) — a tool I built for exactly this — and
it turns the whole archive into the posts you see on the blog.

## Want to make your own?

Go for it. Clone it, strip my content out, put yours in. That's a perfectly reasonable
way to get a site going, and I'd rather you start from something that works than from a
blank folder.

You'll need [Node](https://nodejs.org) 20 or newer and [pnpm](https://pnpm.io) 9.

```bash
git clone https://github.com/brionmario/brionmario.com.git
cd brionmario.com
pnpm install
pnpm dev
```

That puts the site on <http://localhost:3000>.

From there, the things you'll want to change:

| What                               | Where                                   |
| ---------------------------------- | --------------------------------------- |
| Blog posts                         | `apps/web/content/blog/<slug>/index.md` |
| Projects, talks, research, the map | `apps/web/lib/data/`                    |
| Photos and images                  | `apps/web/public/images/`               |
| Colours, fonts, shared components  | `packages/ui/`                          |

A few other useful commands: `pnpm build` for a production build, `pnpm lint`,
`pnpm typecheck` and `pnpm format`.

Two things that will trip you up if you don't know about them. The projects list is
generated — `pnpm dataseed` from inside `apps/web` pulls in public repos tagged
`featured-project` or `portfolio`, so edit the tags on GitHub rather than the generated
file. And the blog posts are generated too, by Medmark from a Medium export, so if you
hand-edit one it'll be overwritten the next time that runs.

One ask: swap out the photos, the writing and the name. Those are mine. The code is the
part worth reusing.

## Contributing

Found a bug, or something that reads wrong? Issues and pull requests are welcome — see
[CONTRIBUTING.md](CONTRIBUTING.md) for how to get set up and what to expect.

## License

There's no license file here yet, which means default copyright applies and all rights
are reserved. I'm happy for people to learn from the code and build their own site from
it — if you want that in writing before you rely on it, open an issue and I'll sort out
a proper license.

Either way, the writing, photographs and brand assets aren't part of any code license.
