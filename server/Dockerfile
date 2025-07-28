# Use Node.js with Python pre-installed
FROM node:18-bullseye

# Install dependencies: Python, pip, ffmpeg
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg && \
    apt-get clean

# Create app directory
WORKDIR /app

# Install backend dependencies
COPY package*.json ./
RUN npm install

# Copy app files (including yt-dlp.py)
COPY . .

# App listens on port 5000
EXPOSE 5000

# Run the backend
CMD ["node", "server.js"]
