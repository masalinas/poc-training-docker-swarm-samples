FROM node:18-alpine

# File Author / Maintainer
LABEL maintainer="Miguel Salinas Gancedo"

# Create app directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY ./src .

# Expose port
EXPOSE 3000

# Use non-root user for security
USER node

# Start the app
CMD ["node", "index.js"]