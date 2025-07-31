import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { getSelector, SelectorKeys } from '../../utils/selectors';

// Example of admin page to be automated. put your admin page codes here.
export class AdminPage extends BasePage {
   readonly adminButton: Locator;
   readonly userLink: Locator;
   readonly searchBoxselect: Locator;
    readonly userNameFill: Locator;
    readonly clickSearchButton: Locator;
    readonly clickTheUserName: Locator;
    readonly scrolltoview: Locator;
    readonly selectTextfromList: Locator;
    readonly Arrowbutton: Locator;


  constructor(page: Page) {
    super(page);
    
    // Use selectors from CSV file
    this.adminButton = page.locator(getSelector(SelectorKeys.ADMIN_BUTTON));
    this.userLink = page.locator(getSelector(SelectorKeys.USER_LINK));
    this.searchBoxselect = page.locator(getSelector(SelectorKeys.SEARCH_BOX_SELECT));
    this.userNameFill = page.locator(getSelector(SelectorKeys.USER_NAME_FILL));
    this.clickSearchButton = page.locator(getSelector(SelectorKeys.CLICK_SEARCH_BUTTON));
    this.clickTheUserName = page.locator(getSelector(SelectorKeys.CLICK_THE_USER_NAME));
    this.scrolltoview = page.locator(getSelector(SelectorKeys.SCROLL_TO_VIEW));
    this.selectTextfromList = page.locator(getSelector(SelectorKeys.SELECT_TEXT_FROM_LIST));
    this.Arrowbutton = page.locator(getSelector(SelectorKeys.ARROW_BUTTON));
  }

  async navigateToAdminDashboard() {
    await this.adminButton.click();
    await this.userLink.click();
  }
  
  async searchAndSelectUser() {
    await this.searchBoxselect.click();
    await this.userNameFill.fill('shikder');
    await this.clickSearchButton.click();
    await this.clickTheUserName.click();
  }
  
  async selectUserPermission() {
    await this.scrolltoview.scrollIntoViewIfNeeded();
    await this.selectTextfromList.selectOption('41');
    await this.Arrowbutton.click();
    await this.page.waitForTimeout(5000);
  }
}