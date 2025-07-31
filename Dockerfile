# Use the official Playwright Docker image as base
FROM mcr.microsoft.com/playwright:v1.39.0-focal

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies with npm
RUN npm config set fetch-timeout 300000 \
    && npm config set fetch-retry-mintimeout 60000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm ci \
    && npm cache clean --force

# Copy project files
COPY . .

# Install Playwright browsers with retry mechanism
RUN for i in 1 2 3; do npx playwright install --with-deps && break || sleep 15; done

# Default command
CMD ["npm", "test"]