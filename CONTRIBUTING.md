# Contributing

Thanks for taking a look. This is a personal site, so the scope is narrower than a
typical open source project — but fixes and improvements are genuinely welcome.

## What's useful

- **Bugs.** Something broken, a layout that falls apart at a particular width, a page
  that errors, a link that goes nowhere.
- **Accessibility problems.** Missing labels, poor contrast, anything that doesn't work
  with a keyboard or a screen reader. These are always worth raising.
- **Typos and wording** in the writing, including old blog posts.
- **Performance and build issues.**

## What probably isn't

- Redesigns, or changes to the look and feel. The design is a personal preference rather
  than a problem to be solved.
- New sections or features. Open an issue first — I'd rather talk it through than have
  you spend an evening on something I won't merge.
- Edits to the opinions in the posts. Corrections of fact, yes; disagreements, better as
  a comment on the post itself.

## Getting set up

You'll need [Node](https://nodejs.org) 20 or newer and [pnpm](https://pnpm.io) 9 — the
exact version is pinned in `package.json`, so pnpm will switch to it for you.

If you have Node but not pnpm, `corepack enable pnpm` is the quickest route, though it
symlinks into Node's bin directory and needs `sudo` when that's root-owned. Installing
pnpm directly, via [its own instructions](https://pnpm.io/installation), avoids that.

```bash
git clone https://github.com/brionmario/brionmario.com.git
cd brionmario.com
pnpm install
pnpm dev
```

That starts the dev server at <http://localhost:3000>. It hot-reloads, so leave it
running while you work. `Ctrl-C` stops it.

If port 3000 is busy, `pnpm --filter web dev --port 3001` will move it. Note there's no
`--` before the flag; add one and it gets passed to Next as a directory argument.

## The commands

| Command          | What it does                            |
| ---------------- | --------------------------------------- |
| `pnpm dev`       | Dev server with hot reload              |
| `pnpm build`     | Production build — run this before a PR |
| `pnpm lint`      | ESLint across the workspace             |
| `pnpm typecheck` | `tsc --noEmit` across the workspace     |
| `pnpm format`    | Prettier, writes in place               |

Before you open a pull request, all four of these should pass:

```bash
pnpm lint && pnpm typecheck && pnpm format && pnpm build
```

## Where things live

This is a monorepo. The site itself is `apps/web`; everything shared sits in `packages/`.

| What                               | Where                                   |
| ---------------------------------- | --------------------------------------- |
| Pages and routes                   | `apps/web/app/`                         |
| Blog posts                         | `apps/web/content/blog/<slug>/index.md` |
| Projects, talks, research, the map | `apps/web/lib/data/`                    |
| Photos and images                  | `apps/web/public/images/`               |
| Colours, fonts, shared components  | `packages/ui/`                          |

If you're cloning this to build your own site, those last four rows are the ones to
gut — and please swap out the photos, the writing and the name. Those are mine. The
code is the part worth reusing.

## Two generated things

Some files are produced by tooling, and hand-edits to them get overwritten:

- **Blog posts** under `apps/web/content/blog/` come from a Medium export, converted by
  [Medmark](https://github.com/brionmario/medmark). To fix a typo in a post, fix it on
  Medium — or open an issue and I'll do it on the next import.
- **`apps/web/lib/data/autogen/`** is written by `pnpm dataseed`, run from inside
  `apps/web`. It reads public repos tagged `featured-project` or `portfolio`, so to add
  a project, tag the repo on GitHub and re-run it rather than editing the output.

## Pull requests

Keep them focused — one fix per pull request is much easier to review than five. Say
what the change does and, if it's a visual one, include a before and after.

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org):
`fix:`, `feat:`, `docs:`, `chore:` and so on.

## Reporting something privately

If you find a security issue, or anything involving personal data, please don't open a
public issue — reach out through one of the links on
[brionmario.com/about](https://brionmario.com/about) instead.
