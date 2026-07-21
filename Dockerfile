# ---------- Base image ----------
FROM node:22-slim AS base
WORKDIR /app
ENV NODE_ENV=production

# ---------- Dependencies ----------
FROM base AS deps

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Approve native builds BEFORE install
RUN pnpm approve-builds

# Install dependencies
RUN pnpm install --frozen-lockfile

# ---------- Build ----------
FROM base AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm prisma generate
RUN pnpm build

# ---------- Runtime ----------
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "server.js"]
