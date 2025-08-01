# 🎭 Playwright E2E Testing Project

A comprehensive end-to-end testing suite using Playwright with TypeScript, featuring Allure reporting, GitHub Actions integration, and automated deployments.

## ✨ Features

- **Test Framework:**
  - Playwright with TypeScript
  - Multi-browser testing (Chrome, Firefox, Safari, Edge)
  - Mobile viewport testing and device emulation
  - Page Object Model architecture
  - Parallel test execution
  - Automatic retries for flaky tests
- **Reporting:**
  - Allure Report integration
  - Automatic deployment to GitHub Pages
  - Slack notifications for test results
- **CI/CD:**
  - GitHub Actions workflow
  - Multi-environment support (dev/stage/prod)
  - Artifact preservation
- **Development:**
  - TypeScript support
  - Environment-based configuration
  - Docker support
  - Centralized selector management

## Project Structure

```plaintext
playwright-project-template/
├── docs/                   # Documentation
│   └── SELECTOR_SYSTEM.md  # Selector system documentation
├── env/                    # Environment configuration files
│   ├── dev.env
│   ├── stage.env
│   └── prod.env
├── fixtures/               # Test data and fixtures
│   ├── dev.json
│   ├── stage.json
│   └── prod.json
├── pages/                  # Page Object Models
│   ├── base.page.ts
│   ├── login/
│   ├── deals/
│   ├── adminpanel/
│   └── budgets/
├── tests/                  # Test files
│   ├── e2e/
│   └── setup/
├── utils/                  # Utilities and helpers
│   ├── selectors.csv       # Centralized selectors
│   ├── selectors.ts        # Selector utilities
│   └── env.ts
├── docker-compose.yml      # Docker configuration
├── Dockerfile              # Docker image
└── playwright.config.ts    # Playwright configuration
```

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm (v7 or higher)
- Git

### 🚀 Quick Start

1. **Clone the repository:**

```bash
git clone https://github.com/is-raihan/playwright-project-template.git
cd playwright-project-template
```

2. **Install dependencies:**

```bash
npm ci
```

3. **Install Playwright browsers:**

```bash
npx playwright install --with-deps
```

4. **Setup environment variables:**
   Create appropriate `.env` file in the `env` directory:

```bash
# .env.dev, .env.stage, or .env.prod
BASE_URL=https://your-app-url.com
HOME_URL=https://your-app-url.com
```

5. **Run tests:**

```bash
# Run with Allure reporting
npm run test:with-allure

# Run in headed mode
npm run test:headed

# Run in debug mode
npm run test:debug
```

### 🐳 Docker Support

#### Prerequisites

- Docker
- Docker Compose

#### Running with Docker:

1. **Run tests in headless mode:**

```bash
docker-compose up
```

2. **Run tests in headed mode:**

```bash
docker-compose -f docker-compose.headed.yml up
```

## 📊 Reporting

### Allure Reports

The project automatically generates and deploys Allure reports:

1. **Local Report:**

```bash
# Generate and open report
npm run allure:serve

# Generate report only
npm run allure:generate
```

2. **CI/CD Report:**

- Automatically deployed to GitHub Pages
- URL available in GitHub Actions summary
- Slack notification sent with report link

### GitHub Actions Integration

Our workflow (`playwright-unified.yml`) provides:

1. **Automated Testing:**

   - Runs on every push to main
   - Runs on pull requests
   - Manual trigger available

2. **Environment Management:**

   - Automatic environment selection (prod/stage)
   - Configurable Node.js version
   - Caching for faster runs

3. **Reporting & Notifications:**

   - Allure report generation
   - GitHub Pages deployment
   - Slack notifications
   - Test artifacts preservation

4. **Test Artifacts:**
   - Test results preserved
   - Screenshots and videos available
   - Traces for debugging

## 🔧 Configuration

### Environment Variables

Create environment-specific files in `env/`:

- `.env.dev` - Development
- `.env.stage` - Staging
- `.env.prod` - Production

Example configuration:

```env
BASE_URL=https://your-app-url.com
HOME_URL=https://your-app-url.com
```

### Playwright Config

Key configurations in `playwright.config.ts`:

- Retry settings
- Timeout values
- Browser settings
- Reporter configuration

#### Browser and Device Configuration

The project supports multiple browsers and devices through the Playwright configuration:

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "msedge",
      use: { ...devices["Desktop Edge"] },
    },
    // Mobile browser testing
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
  // Common viewport settings
  use: {
    viewport: { width: 1280, height: 720 },
    // Enable mobile device emulation features
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  },
});
```

You can run tests on specific devices using the built-in device presets:

- iPhone 12
- Pixel 5
- iPad Pro
- Galaxy Tab
- And many more...

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository.

```bash
# Run all tests
docker-compose up --build

# Run tests in headed mode
docker-compose -f docker-compose.yml -f docker-compose.headed.yml up --build

# Run specific test file
docker-compose run --rm playwright npx playwright test tests/e2e/example.spec.ts
```

## Selector Management System

This project uses a centralized selector management system that stores all selectors in CSV files for easy maintenance and updates.

### Key Features

- **Centralized Storage**: All selectors stored in `utils/selectors.csv`
- **Type Safety**: TypeScript ensures correct selector keys
- **Easy Maintenance**: Update selectors without touching page objects
- **Documentation**: Comments provide context for each selector

### Usage Example

```typescript
import { getSelector, SelectorKeys } from "../../utils/selectors";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    // Use selectors from CSV file
    this.usernameInput = page.locator(getSelector(SelectorKeys.USERNAME_INPUT));
    this.passwordInput = page.locator(getSelector(SelectorKeys.PASSWORD_INPUT));
    this.loginButton = page.locator(getSelector(SelectorKeys.LOGIN_BUTTON));
  }
}
```

### Adding New Selectors

1. Add to `utils/selectors.csv`:

```csv
newElementKey,#new-element-id,button,New element description
```

2. Add to `utils/selectors.ts`:

```typescript
export const SelectorKeys = {
  // ... existing keys
  NEW_ELEMENT_KEY: "newElementKey",
} as const;
```

3. Use in page object:

```typescript
this.newElement = page.locator(getSelector(SelectorKeys.NEW_ELEMENT_KEY));
```

For detailed documentation, see [docs/SELECTOR_SYSTEM.md](docs/SELECTOR_SYSTEM.md).

## Running Tests

### Basic Test Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Environment-specific Tests

```bash
# Development environment
npm run test:dev

# Staging environment
npm run test:stage

# Production environment
npm run test:prod
```

### Browser-specific Tests

```bash
# Run tests in all browsers
npm run test

# Run tests in specific browsers
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project=msedge

# Run tests on mobile viewports
npx playwright test --project=mobile-chrome
npx playwright test --project=mobile-safari

# Run tests on specific devices
npx playwright test --device="iPhone 12"
npx playwright test --device="Pixel 5"
```

### Docker Commands

```bash
# Run all tests in Docker
docker-compose up --build

# Run tests in headed mode with Docker
docker-compose -f docker-compose.yml -f docker-compose.headed.yml up --build

# Run specific test file
docker-compose run --rm playwright npx playwright test tests/e2e/example.spec.ts

# Run tests with specific environment
docker-compose run --rm -e NODE_ENV=stage playwright npm run test:stage
```

## Reporting

### Ortoni Report

Reports are automatically generated in `report-db/index.html` and served at `http://localhost:2004`.

```bash
# View Ortoni report
npm run test:report
```

### Allure Report

```bash
# Run tests with Allure reporting
npm run test:with-allure

# Generate and view Allure report
npm run allure:generate
npm run allure:serve

# Clear Allure results
npm run allure:clear
```

### Docker Reporting

```bash
# Run tests and generate reports in Docker
docker-compose up --build

# View reports (after tests complete)
open report-db/index.html
```

## Environment Configuration

The project supports multiple environments through configuration files:

- `env/dev.env` - Development environment
- `env/stage.env` - Staging environment
- `env/prod.env` - Production environment

### Environment Variables

```bash
BASE_URL=https://demo.playwright.dev
HOME_URL=https://demo.playwright.dev
NODE_ENV=dev
```

## Test Structure

### Page Object Model

The project uses the Page Object Model pattern for maintainable tests:

```typescript
// pages/login/login.page.ts
export class LoginPage extends BasePage {
  // Page elements and methods
}

// tests/e2e/login.spec.ts
test("should login successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();
});
```

### Test Organization

```plaintext
tests/
├── e2e/                    # End-to-end test files
│   ├── example.spec.ts     # Basic example tests
│   ├── selector-test.spec.ts # Selector system tests
│   ├── deals/              # Deal-related tests
│   └── adminpanel/         # Admin panel tests
├── setup/                  # Test setup files
│   └── auth.setup.ts       # Authentication setup
└── fixtures/               # Test data
```

## Docker Configuration

### Dockerfile

The project includes a multi-stage Dockerfile optimized for Playwright testing:

```dockerfile
FROM mcr.microsoft.com/playwright:v1.54.1-focal

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx playwright install --with-deps

CMD ["npm", "test"]
```

### Docker Compose

```yaml
version: "3.8"
services:
  playwright:
    build: .
    volumes:
      - ./test-results:/app/test-results
      - ./report-db:/app/report-db
      - ./allure-results:/app/allure-results
    environment:
      - NODE_ENV=dev
```

## CI/CD Integration

### GitHub Actions

The project includes GitHub Actions workflows for automated testing:

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
```

## Troubleshooting

### Common Issues

1. **Selector not found**: Check `utils/selectors.csv` and ensure the key exists
2. **Browser installation issues**: Run `npx playwright install --with-deps`
3. **Docker permission issues**: Use `sudo` or add user to docker group
4. **Allure report not generating**: Ensure Java is installed

### Debug Mode

```bash
# Run tests in debug mode
npm run test:debug

# Run with Playwright Inspector
npm run test:debug:ui
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your selectors to `utils/selectors.csv`
4. Update `utils/selectors.ts` with new keys
5. Write tests using the selector system
6. Submit a pull request

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Selector System Documentation](docs/SELECTOR_SYSTEM.md)
- [Docker Documentation](https://docs.docker.com/)
- [Allure Framework](https://docs.qameta.io/allure/)

## License

This project is licensed under the ISC License.
