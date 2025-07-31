# Selector System Documentation

## Overview

The Playwright project uses a centralized selector management system that stores all selectors in a CSV file (`utils/selectors.csv`) and provides type-safe access through TypeScript utilities.

## File Structure

```
utils/
├── selectors.csv          # Central selector storage
├── selectors.ts           # TypeScript utilities for selector access
└── env.ts                 # Environment configuration

pages/
├── login/
│   └── login.page.ts      # Uses selectors from CSV
├── deals/
│   └── deals.page.ts      # Uses selectors from CSV
├── adminpanel/
│   └── admin.page.ts      # Uses selectors from CSV
└── budgets/
    └── budget.page.ts     # Uses selectors from CSV
```

## CSV Format

The `selectors.csv` file uses the following format:

```csv
# key,selector,type,comments
loginButton,.btn-login,button,Login button selector
usernameInput,#username,input,Username input field
passwordInput,#password,input,Password input field
```

### Columns:
- **key**: Unique identifier for the selector
- **selector**: The actual CSS selector or Playwright locator
- **type**: Element type (optional, for documentation)
- **comments**: Description of the element (optional)

## Usage in Page Objects

### 1. Import the Selector Utilities

```typescript
import { getSelector, SelectorKeys } from '../../utils/selectors';
```

### 2. Use Selectors in Page Object Constructor

```typescript
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

### 3. Available Selector Keys

The `SelectorKeys` object provides type-safe access to all selectors:

```typescript
export const SelectorKeys = {
  // Login selectors
  LOGIN_BUTTON: 'loginButton',
  USERNAME_INPUT: 'usernameInput',
  PASSWORD_INPUT: 'passwordInput',
  SUBMIT_BUTTON: 'submitButton',
  
  // Deals selectors
  DEALS_MENU_ITEM: 'dealsMenuItem',
  REPOSITORY_SUBMENU: 'repositorySubmenu',
  // ... more selectors
} as const;
```

## Adding New Selectors

### 1. Add to CSV File

Add your new selector to `utils/selectors.csv`:

```csv
newElementKey,#new-element-id,button,New element description
```

### 2. Add to SelectorKeys

Add the key to `utils/selectors.ts`:

```typescript
export const SelectorKeys = {
  // ... existing keys
  NEW_ELEMENT_KEY: 'newElementKey'
} as const;
```

### 3. Use in Page Object

```typescript
this.newElement = page.locator(getSelector(SelectorKeys.NEW_ELEMENT_KEY));
```

## Benefits

1. **Centralized Management**: All selectors in one place
2. **Type Safety**: TypeScript ensures correct selector keys
3. **Easy Maintenance**: Update selectors without touching page objects
4. **Documentation**: Comments provide context for each selector
5. **Consistency**: Standardized approach across all page objects

## Error Handling

The system provides helpful error messages when selectors are not found:

```typescript
// This will throw: "Selector with key 'nonExistentSelector' not found in selectors.csv"
getSelector('nonExistentSelector');
```

## Testing the Selector System

Run the selector system tests:

```bash
npx playwright test tests/e2e/selector-test.spec.ts
```

## Best Practices

1. **Use Descriptive Keys**: Choose clear, descriptive names for selector keys
2. **Add Comments**: Include helpful comments in the CSV file
3. **Group Related Selectors**: Use consistent naming patterns for related elements
4. **Update Both Files**: Always update both CSV and SelectorKeys when adding new selectors
5. **Test Selectors**: Verify selectors work before committing changes

## Example Workflow

1. Identify a new element that needs automation
2. Add selector to `utils/selectors.csv`
3. Add key to `SelectorKeys` in `utils/selectors.ts`
4. Use in page object with `getSelector(SelectorKeys.KEY_NAME)`
5. Test the implementation
6. Commit changes

This system ensures maintainable, type-safe, and well-documented selectors throughout the project. 