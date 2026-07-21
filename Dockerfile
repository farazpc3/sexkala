# ---------- Base image ----------
FROM node:24-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat openssl

# ---------- Dependencies ----------
FROM base AS deps

RUN corepack enable && corepack prepare pnpm@latest --activate

# COPY CORRECT PATHS (your repo is nested!)
COPY sexkala/package.json ./package.json
COPY sexkala/pnpm-lock.yaml ./pnpm-lock.yaml

# Approve native builds BEFORE install
RUN pnpm approve-builds

# Install dependencies with scripts enabled
RUN pnpm install --frozen-lockfile

# ---------- Build ----------
FROM base AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY sexkala/ .

RUN pnpm prisma generate
RUN pnpm build

# ---------- Runtime ----------
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN apk add --no-cache openssl

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "server.js"]
