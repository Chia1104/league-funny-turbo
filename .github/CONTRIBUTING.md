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
