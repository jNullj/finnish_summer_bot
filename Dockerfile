# Stage 1: Builder
FROM node:23.10.0 AS builder

WORKDIR /app

# Install application dependencies
COPY package.json ./
RUN npm install --production

# Copy application source code
COPY . .

# Stage 2: Final image
FROM node:23.10.0-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Copy only the built application from the builder stage
COPY --from=builder /app /app

ENTRYPOINT ["./docker.startup.sh"]
