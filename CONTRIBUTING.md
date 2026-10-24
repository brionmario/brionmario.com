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

You'll need [Node](https://nodejs.org) 20 or newer and [pnpm](https://pnpm.io) 9.

```bash
pnpm install
pnpm dev
```

The site runs at <http://localhost:3000>.

Before you open a pull request:

```bash
pnpm lint
pnpm typecheck
pnpm format
```

## Two generated things

Some files are produced by tooling, and hand-edits to them get overwritten:

- **Blog posts** under `apps/web/content/blog/` come from a Medium export, converted by
  [Medmark](https://github.com/brionmario/medmark). To fix a typo in a post, fix it on
  Medium — or open an issue and I'll do it on the next import.
- **`apps/web/lib/data/autogen/`** is written by `pnpm dataseed`, which reads public
  repos tagged `featured-project` or `portfolio`.

## Pull requests

Keep them focused — one fix per pull request is much easier to review than five. Say
what the change does and, if it's a visual one, include a before and after.

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org):
`fix:`, `feat:`, `docs:`, `chore:` and so on.

## Reporting something privately

If you find a security issue, or anything involving personal data, please don't open a
public issue — reach out through one of the links on
[brionmario.com/about](https://brionmario.com/about) instead.
