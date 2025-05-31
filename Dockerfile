# Stage 1: Builder
FROM node:24.1.0 AS builder

WORKDIR /app

# Install application dependencies
COPY package.json ./
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Stage 2: Final image
FROM node:24.1.0-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache ffmpeg

# Copy only the built application from the builder stage
COPY --from=builder /app /app

ENTRYPOINT ["./docker.startup.sh"]
