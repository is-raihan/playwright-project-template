import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import {BASE_URL, TEST_DATA} from "../../utils/env";
import { getSelector, SelectorKeys } from '../../utils/selectors';

// This class represents the login page of the application.
// It contains methods to interact with the login form and perform login actions.

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
  
  async navigate() {
    await this.page.goto(`${BASE_URL}`);
  }

  async login() {
    await this.usernameInput.fill(`${TEST_DATA.credentials.validUser.username}`);
    await this.passwordInput.fill(`${TEST_DATA.credentials.validUser.password}`);
    await this.loginButton.click();
    await this.waitForLoadState();
  }
}