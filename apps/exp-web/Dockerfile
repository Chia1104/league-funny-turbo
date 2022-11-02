FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo@1.6.2
COPY . .
RUN turbo prune --scope=exp-web --docker

FROM node:18-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN yarn global add pnpm && \
    pnpm i

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
COPY .prettierrc .prettierrc

ARG \
  PORT \
  NEXTAUTH_SECRET \
  FACEBOOK_ID \
  FACEBOOK_SECRET \
  TWITCH_CLIENT_ID \
  TWITCH_CLIENT_SECRET
ENV \
  NODE_ENV=production \
  PORT=$PORT \
  NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
  FACEBOOK_ID=$FACEBOOK_ID \
  FACEBOOK_SECRET=$FACEBOOK_SECRET \
  TWITCH_CLIENT_ID=$TWITCH_CLIENT_ID \
  TWITCH_CLIENT_SECRET=$TWITCH_CLIENT_SECRET

RUN yarn turbo run build --filter=exp-web...

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/exp-web/next.config.mjs .
COPY --from=installer /app/apps/exp-web/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/exp-web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/exp-web/.next/static ./apps/web/.next/static

CMD node apps/web/server.js
