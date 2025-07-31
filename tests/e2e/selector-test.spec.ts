import { test, expect } from '@playwright/test';
import { getSelector, SelectorKeys, getAllSelectors } from '../../utils/selectors';

test.describe('Selector System Tests', () => {
  test('should read selectors from CSV file', () => {
    // Test that we can get all selectors
    const allSelectors = getAllSelectors();
    expect(allSelectors.length).toBeGreaterThan(0);
    
    // Test that we can get specific selectors
    const loginButtonSelector = getSelector(SelectorKeys.LOGIN_BUTTON);
    expect(loginButtonSelector).toBe('.btn-login');
    
    const usernameSelector = getSelector(SelectorKeys.USERNAME_INPUT);
    expect(usernameSelector).toBe('#username');
    
    const passwordSelector = getSelector(SelectorKeys.PASSWORD_INPUT);
    expect(passwordSelector).toBe('#password');
  });

  test('should handle missing selectors gracefully', () => {
    expect(() => {
      getSelector('nonExistentSelector');
    }).toThrow('Selector with key \'nonExistentSelector\' not found in selectors.csv');
  });

  test('should have correct selector structure', () => {
    const allSelectors = getAllSelectors();
    
    // Check that each selector has the required properties
    allSelectors.forEach(selector => {
      expect(selector).toHaveProperty('key');
      expect(selector).toHaveProperty('selector');
      expect(typeof selector.key).toBe('string');
      expect(typeof selector.selector).toBe('string');
    });
  });
}); 