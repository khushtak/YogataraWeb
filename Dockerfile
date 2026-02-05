# Build-only image for Vite frontend
FROM node:20-alpine

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build production static files
RUN npm run build

# Output will be in /app/dist
