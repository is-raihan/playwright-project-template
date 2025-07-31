# Docker Setup Guide

This guide explains how to set up and run the Playwright project using Docker.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (usually included with Docker Desktop)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/is-raihan/playwright-project-template.git
cd playwright-project-template
```

### 2. Run Tests with Docker

```bash
# Run all tests in headless mode
docker-compose up --build

# Run tests in headed mode (visible browser)
docker-compose -f docker-compose.yml -f docker-compose.headed.yml up --build

# Use the convenience script
./scripts/docker-setup.sh
```

## Docker Configuration

### Dockerfile

The project uses a multi-stage Dockerfile based on the official Playwright image:

```dockerfile
FROM mcr.microsoft.com/playwright:v1.54.1-focal
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx playwright install --with-deps
CMD ["npm", "test"]
```

### Docker Compose

The `docker-compose.yml` file defines the services:

```yaml
version: '3.8'
services:
  playwright:
    build: .
    volumes:
      - ./test-results:/app/test-results
      - ./report-db:/app/report-db
      - ./allure-results:/app/allure-results
    ports:
      - "2004:2004"  # Ortoni report
      - "55125:55125"  # Allure report
```

## Usage Examples

### Basic Commands

```bash
# Build and run tests
docker-compose up --build

# Run tests in background
docker-compose up -d --build

# Stop containers
docker-compose down

# View logs
docker-compose logs -f
```

### Running Specific Tests

```bash
# Run a specific test file
docker-compose run --rm playwright npx playwright test tests/e2e/example.spec.ts

# Run tests with specific environment
docker-compose run --rm -e NODE_ENV=stage playwright npm run test:stage

# Run tests in debug mode
docker-compose run --rm playwright npm run test:debug
```

### Using the Convenience Script

```bash
# Make script executable (first time only)
chmod +x scripts/docker-setup.sh

# Run tests in headless mode
./scripts/docker-setup.sh

# Run tests in headed mode
./scripts/docker-setup.sh headed

# Run specific test
./scripts/docker-setup.sh specific tests/e2e/example.spec.ts

# Show report URLs
./scripts/docker-setup.sh reports

# Clean up Docker resources
./scripts/docker-setup.sh cleanup

# Show help
./scripts/docker-setup.sh help
```

## Headed Mode Setup

### Linux

For Linux systems, headed mode works out of the box:

```bash
docker-compose -f docker-compose.yml -f docker-compose.headed.yml up --build
```

### macOS

For macOS, you need to install XQuartz and set up X11 forwarding:

1. Install XQuartz:
```bash
brew install --cask xquartz
```

2. Start XQuartz and allow connections:
```bash
open -a XQuartz
```

3. In XQuartz preferences, go to Security and check "Allow connections from network clients"

4. Restart XQuartz

5. Run tests in headed mode:
```bash
./scripts/docker-setup.sh headed
```

### Windows

For Windows, you need to install an X11 server like VcXsrv:

1. Download and install VcXsrv
2. Start XLaunch and configure it to allow connections
3. Set the DISPLAY environment variable:
```bash
set DISPLAY=host.docker.internal:0
```

4. Run tests in headed mode:
```bash
./scripts/docker-setup.sh headed
```

## Environment Configuration

### Environment Variables

You can override environment variables when running Docker:

```bash
# Set environment
docker-compose run --rm -e NODE_ENV=stage playwright npm run test:stage

# Set multiple variables
docker-compose run --rm \
  -e NODE_ENV=prod \
  -e BASE_URL=https://production.example.com \
  playwright npm run test:prod
```

### Environment Files

The Docker setup mounts the `env/` directory, so you can modify environment files:

```bash
# Edit environment file
vim env/dev.env

# Rebuild and run
docker-compose up --build
```

## Reporting

### Viewing Reports

After tests complete, reports are available at:

- **Ortoni Report**: http://localhost:2004
- **Allure Report**: http://localhost:55125

### Accessing Reports

```bash
# Open reports in browser
open http://localhost:2004
open http://localhost:55125

# Or use the script
./scripts/docker-setup.sh reports
```

### Report Persistence

Reports are persisted in the following directories:

- `test-results/` - Test artifacts (screenshots, videos, traces)
- `report-db/` - Ortoni reports
- `allure-results/` - Allure reports

## Troubleshooting

### Common Issues

1. **Docker not running**:
   ```bash
   # Start Docker Desktop
   open -a Docker
   ```

2. **Permission denied**:
   ```bash
   # Make script executable
   chmod +x scripts/docker-setup.sh
   ```

3. **Port already in use**:
   ```bash
   # Stop existing containers
   docker-compose down
   
   # Or use different ports
   docker-compose up -p 3000:2004 -p 3001:55125
   ```

4. **Headless mode not working**:
   ```bash
   # Check X11 setup
   echo $DISPLAY
   
   # For macOS, ensure XQuartz is running
   ps aux | grep XQuartz
   ```

### Debug Mode

```bash
# Run in debug mode
docker-compose run --rm playwright npm run test:debug

# Run with Playwright Inspector
docker-compose run --rm playwright npm run test:debug:ui
```

### Cleaning Up

```bash
# Remove containers and images
docker-compose down --rmi all --volumes --remove-orphans

# Clean up all Docker resources
docker system prune -a

# Use the convenience script
./scripts/docker-setup.sh cleanup
```

## Performance Optimization

### Multi-stage Build

The Dockerfile uses multi-stage builds to optimize image size:

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Runtime stage
FROM mcr.microsoft.com/playwright:v1.54.1-focal
COPY --from=builder /app/node_modules ./node_modules
COPY . .
```

### Caching

To improve build times, Docker layers are optimized:

1. Copy package files first
2. Install dependencies
3. Copy source code
4. Install Playwright browsers

### Resource Limits

You can set resource limits in docker-compose.yml:

```yaml
services:
  playwright:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '2'
```

## CI/CD Integration

### GitHub Actions

The project includes a GitHub Actions workflow that uses Docker:

```yaml
- name: Build and run tests in Docker
  run: |
    docker-compose build
    docker-compose up --abort-on-container-exit
```

### Local CI

You can run the same CI process locally:

```bash
# Run CI pipeline
docker-compose -f docker-compose.yml -f docker-compose.ci.yml up --build
```

## Best Practices

1. **Use .dockerignore**: Exclude unnecessary files from the build context
2. **Pin versions**: Use specific versions for reproducible builds
3. **Multi-stage builds**: Optimize image size
4. **Volume mounts**: Persist test results and reports
5. **Environment variables**: Use environment variables for configuration
6. **Health checks**: Add health checks for long-running containers
7. **Resource limits**: Set appropriate resource limits
8. **Cleanup**: Regularly clean up unused Docker resources

## Support

For issues and questions:

1. Check the troubleshooting section above
2. Review the main README.md file
3. Check the selector system documentation
4. Open an issue on GitHub

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Playwright Docker Images](https://playwright.dev/docs/docker)
- [XQuartz for macOS](https://www.xquartz.org/)
- [VcXsrv for Windows](https://sourceforge.net/projects/vcxsrv/) 