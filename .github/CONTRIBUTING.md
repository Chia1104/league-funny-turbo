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

### Environment Variables

Set the environment variables in `.env` file and your own `docker-compose.yml` file.

```bash
# exp-web
NEXTAUTH_SECRET=<any string>
FACEBOOK_ID=<FACEBOOK_ID>
FACEBOOK_SECRET=<FACEBOOK_SECRET>
TWITCH_CLIENT_ID=<TWITCH_CLIENT_ID>
TWITCH_CLIENT_SECRET=<TWITCH_CLIENT_SECRET>
API_URL=<localhost:8000>
```
