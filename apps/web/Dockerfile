FROM node:18-alpine AS builder
RUN apk update && \
    apk add --no-cache \
    libc6-compat

WORKDIR /app
RUN yarn global add turbo@1.7.0
COPY . .
RUN turbo prune --scope=web --docker

FROM node:18-alpine AS installer
RUN apk update && \
    apk add --no-cache \
    libc6-compat \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN yarn global add pnpm && \
    pnpm i

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG \
  NEXT_PUBLIC_API_URL

ENV \
  NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN yarn turbo run build --filter=web...

FROM node:18-alpine AS runner
WORKDIR /app

ARG \
  NEXTAUTH_SECRET \
  NEXT_PUBLIC_API_URL \
  FACEBOOK_ID \
  FACEBOOK_SECRET \
  TWITCH_CLIENT_ID \
  TWITCH_CLIENT_SECRET \
  TOKEN_EXPIRE \
  NEXT_PUBLIC_FROALA_KEY \
  NEXT_PUBLIC_BASE_URL \
  NEXT_PUBLIC_HOST \
  NEXTAUTH_URL \
  S3_UPLOAD_KEY \
  S3_UPLOAD_SECRET \
  S3_UPLOAD_BUCKET \
  S3_UPLOAD_REGION

ENV \
  NODE_ENV=production \
  NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
  NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
  FACEBOOK_ID=$FACEBOOK_ID \
  FACEBOOK_SECRET=$FACEBOOK_SECRET \
  TWITCH_CLIENT_ID=$TWITCH_CLIENT_ID \
  TWITCH_CLIENT_SECRET=$TWITCH_CLIENT_SECRET \
  TOKEN_EXPIRE=$TOKEN_EXPIRE \
  NEXT_PUBLIC_FROALA_KEY=$NEXT_PUBLIC_FROALA_KEY \
  NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
  NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST \
  NEXTAUTH_URL=$NEXTAUTH_URL \
  S3_UPLOAD_KEY=$S3_UPLOAD_KEY \
  S3_UPLOAD_SECRET=$S3_UPLOAD_SECRET \
  S3_UPLOAD_BUCKET=$S3_UPLOAD_BUCKET \
  S3_UPLOAD_REGION=$S3_UPLOAD_REGION

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.mjs .
COPY --from=installer /app/apps/web/package.json .
COPY --from=installer /app/apps/web/public ./apps/web/public

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 8080

ENV PORT 8080

CMD node apps/web/server.js
