# ---------- Base image ----------
FROM node:24-slim AS base
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat openssl

# ---------- Dependencies ----------
FROM base AS deps

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./

# ⭐ Step 1 — Dummy install (scripts blocked)
RUN pnpm install --ignore-scripts --frozen-lockfile

# ⭐ Step 2 — Approve build scripts (now pnpm knows which packages exist)
RUN pnpm approve-builds prisma @prisma/engines esbuild sharp bcrypt

# ⭐ Step 3 — Real install (scripts allowed)
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

RUN apk add --no-cache openssl

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/app/generated ./app/generated

EXPOSE 3000
CMD ["node", "server.js"]
