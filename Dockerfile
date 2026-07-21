# ---------- Base image ----------
FROM node:24-slim AS base
WORKDIR /app
ENV NODE_ENV=production

# Debian-based → use apt-get
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    libc6 \
    && rm -rf /var/lib/apt/lists/*

# ---------- Dependencies ----------
FROM base AS deps

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./

# Dummy install
RUN pnpm install --ignore-scripts --frozen-lockfile

# Approve build scripts
RUN pnpm approve-builds prisma @prisma/engines esbuild sharp bcrypt

# Real install
RUN pnpm rebuild

# ---------- Build ----------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm prisma generate
RUN pnpm build

# ---------- Runtime ----------
FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Debian-based → use apt-get
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    libc6 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/app/generated ./app/generated

EXPOSE 3000
CMD ["node", "server.js"]
