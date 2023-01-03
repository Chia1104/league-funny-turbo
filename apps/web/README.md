# NextJS Website

> ### 👷 Work in progress
>
> Current candidate for the website with NextJS.

## Demo

- [Vercel - NextJS](https://league-funny.vercel.app)

## Development

Run the following command to generate the `.env` file:

```bash
cp apps\web\.env.example apps\web\.env
```

Then, run the following command to start the development server:

```bash
pnpm dev --filter web...
```
### Environment Variables

Set the environment variables in `.env` file and your own `docker-compose.yml` file.

```bash
NEXTAUTH_SECRET=<any string>
NEXT_PUBLIC_FROALA_KEY=<FROALA_KEY>
FACEBOOK_ID=<FACEBOOK_ID>
FACEBOOK_SECRET=<FACEBOOK_SECRET>
TWITCH_CLIENT_ID=<TWITCH_CLIENT_ID>
TWITCH_CLIENT_SECRET=<TWITCH_CLIENT_SECRET>
NEXT_PUBLIC_API_URL=<localhost:8000>
NEXT_PUBLIC_HOST=<localhost> ## Optional
S3_UPLOAD_KEY=<S3_UPLOAD_KEY>
S3_UPLOAD_SECRET=<S3_UPLOAD_SECRET>
S3_UPLOAD_BUCKET=<S3_UPLOAD_BUCKET>
S3_UPLOAD_REGION=<S3_UPLOAD_REGION>
```
