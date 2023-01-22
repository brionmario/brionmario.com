<p align="center" style="color: #343a40">
  <h1 align="center">
  <img
    src="https://user-images.githubusercontent.com/25959096/213896633-b38050dd-3ad9-46d5-a4b5-9608766adf81.jpg" alt="README cover of brionmario.com source-code" width="auto"
  >
</p>

## What's inside?

This repo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `apps`
  - `website`: Main website app writtem in [Next.js](https://nextjs.org/) app
- `packages`
  - `ui`: A stub React component library.
  - `tsconfig`: `Typescript` configurations.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```bash
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```bash
pnpm run dev
```
