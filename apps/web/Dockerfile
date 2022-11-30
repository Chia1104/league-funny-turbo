FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo@1.6.3
COPY . .
RUN turbo prune --scope=web --docker

FROM node:18-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN yarn global add pnpm && \
    pnpm add sharp --filter web && \
    pnpm i

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo run build --filter=web...

FROM node:18-alpine AS runner
WORKDIR /app

ARG \
  NEXTAUTH_SECRET \
  API_URL \
  FACEBOOK_ID \
  FACEBOOK_SECRET \
  TWITCH_CLIENT_ID \
  TWITCH_CLIENT_SECRET \
  TOKEN_EXPIRE \
  NEXT_PUBLIC_FROALA_KEY \
  NEXT_PUBLIC_BASE_URL \
  NEXT_PUBLIC_HOST \
  NEXTAUTH_URL

ENV \
  NODE_ENV=production \
  API_URL=$API_URL \
  NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
  FACEBOOK_ID=$FACEBOOK_ID \
  FACEBOOK_SECRET=$FACEBOOK_SECRET \
  TWITCH_CLIENT_ID=$TWITCH_CLIENT_ID \
  TWITCH_CLIENT_SECRET=$TWITCH_CLIENT_SECRET \
  TOKEN_EXPIRE=$TOKEN_EXPIRE \
  NEXT_PUBLIC_FROALA_KEY=$NEXT_PUBLIC_FROALA_KEY \
  NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
  NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST \
  NEXTAUTH_URL=$NEXTAUTH_URL

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.mjs .
COPY --from=installer /app/apps/web/package.json .
COPY --from=installer /app/apps/web/public ./public

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 8080

ENV PORT 8080

CMD node apps/web/server.js
