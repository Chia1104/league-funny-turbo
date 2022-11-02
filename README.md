# League Funny

League Funny(遊戲大亂鬥) refactor project.

Current website: [https://league-funny.com](https://league-funny.com)

## Demo

### Current Candidate

- [Vercel - NextJS](https://league-funny.vercel.app)

## Project Structure

### Apps

- `apps/web` - Website with `NextJS` `pages` folder structure.
- `apps/exp-web` - Website with `NextJS` `apps` folder structure.

### Packages

- `packages/db` - Database / Prisma
- `packages/trpc-api` - API / tRPC
- `packages/eslint-config-{base,nextjs}` - ESLint config
- `packages/tailwind-config` - Tailwind config
- `packages/tsconfig` - TypeScript config
- `packages/types` - Typescript types
- `packages/utils` - Utils
- `packages/ui` - React components

## Development

This project is using [Turborepo](https://turborepo.org/) to manage the monorepo.

And using [pnpm](https://pnpm.io/) as the package manager.

> ### 📌 **Important: Please use `pnpm` to install the dependencies.**
>
> Run the following command:
>
> ```bash
> pnpm install
> ```

### Scripts

Run the following command or add `--filter` to filter the packages.

Just like `pnpm dev --filter web` or `pnpm dev --filter web...`.

The second one will start the `web` and other included packages.

#### Other scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the project
- `pnpm lint` - Check ESLint
- `pnpm format` - Format the code
- `pnpm test` - Run unit tests
- `pnpm test:watch` - Run unit tests in watch mode
- `pnpm e2e:chrome` - Run e2e tests in Chrome
- `pnpm e2e:edge` - Run e2e tests in Edge

### Docker

Run the following command to build the docker image.

```bash
docker build -f .\apps\web\Dockerfile -t web:latest . # Build the web image
docker build -f .\apps\exp-web\Dockerfile -t exp-web:latest . # Build the exp-web image
```

### License

Under [MIT](LICENSE)
