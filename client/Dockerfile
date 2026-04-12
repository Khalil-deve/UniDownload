# ─────────────────────────────────────────────────────────────
#  Frontend (Vite/React → Nginx)
#  Multi-stage build:
#    Stage 1 (builder) — Node.js compiles the React app
#    Stage 2 (runner)  — Nginx serves the static output
#  Final image has ZERO Node.js — tiny and secure!
# ─────────────────────────────────────────────────────────────

# ── Stage 1: Build ───────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (layer cache optimisation)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Vite automatically uses .env.production during build
# VITE_SERVER_URL and VITE_WS_URL will be baked into the bundle
RUN npm run build
# Output is in /app/dist

# ── Stage 2: Serve ───────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Copy the built React app from Stage 1 into Nginx's serve dir
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP
EXPOSE 80

# Nginx foreground mode (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
