# ---------- Base image ----------
FROM node:24-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat openssl

# ---------- Dependencies ----------
FROM base AS deps

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# ⭐ APPROVE BUILD SCRIPTS BEFORE COPYING package.json
RUN pnpm approve-builds prisma @prisma/engines esbuild sharp bcrypt

# Now copy package.json + lockfile
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# ---------- Build ----------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

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
COPY --from=builder /app/app/generated ./app/generated

EXPOSE 3000
CMD ["node", "server.js"]
