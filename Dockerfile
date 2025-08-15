# Multi-stage Dockerfile for VoxFoundry
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY turbo.json ./
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application using local turbo
RUN ./node_modules/.bin/turbo run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 voxfoundry

# Copy built application
COPY --from=builder --chown=voxfoundry:nodejs /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder --chown=voxfoundry:nodejs /app/package*.json ./
COPY --from=builder --chown=voxfoundry:nodejs /app/turbo.json ./

USER voxfoundry

EXPOSE 3000

ENV PORT=3000

# This is a placeholder - adjust based on actual application entry point
CMD ["echo", "VoxFoundry application ready - configure actual start command"]