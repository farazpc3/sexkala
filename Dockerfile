# ---------- Base image ----------
FROM node:24-slim AS base
WORKDIR /app
ENV NODE_ENV=production

# Debian-based → use apt-get
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Enable pnpm globally for all stages inheriting from base
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---------- Dependencies ----------
FROM base AS deps

COPY package.json pnpm-lock.yaml* ./

# Dummy install (scripts blocked)
RUN pnpm install --ignore-scripts --frozen-lockfile

# Approve build scripts
RUN pnpm approve-builds prisma @prisma/engines esbuild sharp bcrypt

# Real install (scripts allowed)
RUN pnpm rebuild

# ---------- Build ----------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# pnpm is available because builder inherits from base
RUN pnpm prisma generate
RUN pnpm build

# ---------- Runtime ----------
FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Runtime dependencies (openssl only)
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy standalone Next.js output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/app/generated ./app/generated

EXPOSE 3000
CMD ["node", "server.js"]
