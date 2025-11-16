# Stage 1: Builder
FROM node:25.2.0-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production

# Install application dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Stage 2: Final image
FROM node:25.2.0-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache ffmpeg

ENV NODE_ENV=production

# Copy only the built application from the builder stage
COPY --from=builder /app /app

# Add a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# For entrypoint script
RUN chown appuser:appgroup /app/botinfo.js

USER appuser

ENTRYPOINT ["./docker.startup.sh"]
