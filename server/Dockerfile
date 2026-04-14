# ─────────────────────────────────────────────────────────────
#  Backend (Node.js + Python + yt-dlp)
#  Base: node:20-slim  (smaller than full debian, has apt)
# ─────────────────────────────────────────────────────────────
FROM node:20-slim

# Install system dependencies:
#   python3 + pip  → runs yt-dlp
#   ffmpeg         → merges video+audio streams (required for 1080p+)
#   ca-certificates → fixes SSL cert errors
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        python3 \
        python3-pip \
        python3-venv \
        ffmpeg \
        ca-certificates && \
    # Install yt-dlp and certifi via pip
    pip3 install --break-system-packages --no-cache-dir yt-dlp certifi && \
    # Clean up apt cache to keep image small
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files first (Docker layer caching — only re-runs
# npm install if package.json actually changes)
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --production

# Copy the rest of the server code
# (node_modules is excluded via .dockerignore)
COPY . .

# Create temp folder for downloaded videos
RUN mkdir -p temp

# ── Security: run as non-root user ──────────────────────────
# node:20-slim already has a 'node' user built in
RUN chown -R node:node /app
USER node

# Expose the API port
EXPOSE 5000

# Health check — Docker will mark container unhealthy if it fails
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000', r => process.exit(r.statusCode ? 0 : 1)).on('error', () => process.exit(1))"

# Start the server
CMD ["node", "server.js"]
