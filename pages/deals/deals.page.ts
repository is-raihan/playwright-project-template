import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { getSelector, SelectorKeys } from '../../utils/selectors';

// example of a module
export class DealsPage extends BasePage {
  readonly dealsMenuItem: Locator;
  readonly repositorySubmenu: Locator;
  readonly draftRadio: Locator;
  readonly dealLink_682: Locator;
  readonly createDeal: Locator;
  readonly RoamingPartner: Locator;
  readonly selectOperators: Locator;
  readonly Click_To_Select: Locator;
  readonly Select_RoamSmart: Locator;
  readonly Digicel_Limited: Locator;
  readonly Confirm: Locator;
  readonly Save: Locator;
  readonly dealsrepositorySubmenu: Locator;

  constructor(page: Page) {
    super(page);
    
    // Use selectors from CSV file
    this.dealsMenuItem = page.locator(getSelector(SelectorKeys.DEALS_MENU_ITEM));
    this.repositorySubmenu = page.locator(getSelector(SelectorKeys.REPOSITORY_SUBMENU));
    this.dealsrepositorySubmenu = page.locator(getSelector(SelectorKeys.DEALS_REPOSITORY_SUBMENU));
    this.draftRadio = page.locator(getSelector(SelectorKeys.DRAFT_RADIO));
    this.dealLink_682 = page.locator(getSelector(SelectorKeys.DEAL_LINK_682));
    this.createDeal = page.locator(getSelector(SelectorKeys.CREATE_DEAL));
    this.RoamingPartner = page.locator(getSelector(SelectorKeys.ROAMING_PARTNER));
    this.selectOperators = page.locator(getSelector(SelectorKeys.SELECT_OPERATORS));
    this.Click_To_Select = page.locator(getSelector(SelectorKeys.CLICK_TO_SELECT));
    this.Select_RoamSmart = page.locator(getSelector(SelectorKeys.SELECT_ROAMSMART));
    this.Digicel_Limited = page.locator(getSelector(SelectorKeys.DIGICEL_LIMITED));
    this.Confirm = page.locator(getSelector(SelectorKeys.CONFIRM));
    this.Save = page.locator(getSelector(SelectorKeys.SAVE));
  }

  async navigateToDealsRepository() {
    try {
      // Wait for the element to be visible before clicking
      await this.dealsMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.dealsMenuItem.click();
      
      await this.repositorySubmenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.repositorySubmenu.click();
      
      // await this.draftRadio.check();
    } catch (error) {
      console.log('Element not found or not clickable:', error);
      throw error;
    }
  }
  
  async CreateNewDeal(){
    try {
      // Wait for the element to be visible before clicking
      await this.dealsMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.dealsMenuItem.click();
      
      await this.dealsrepositorySubmenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.dealsrepositorySubmenu.click();
      
      await this.createDeal.waitFor({ state: 'visible', timeout: 10000 });
      await this.createDeal.click();
      
      await this.RoamingPartner.waitFor({ state: 'visible', timeout: 10000 });
      await this.RoamingPartner.click();
      
      await this.selectOperators.waitFor({ state: 'visible', timeout: 10000 });
      await this.selectOperators.click();
      
      await this.Click_To_Select.waitFor({ state: 'visible', timeout: 10000 });
      await this.Click_To_Select.click();
      
      await this.Select_RoamSmart.waitFor({ state: 'visible', timeout: 10000 });
      await this.Select_RoamSmart.click({force: true});
      
      await this.Confirm.waitFor({ state: 'visible', timeout: 10000 });
      await this.Confirm.click({force: true});
      
      await this.Save.waitFor({ state: 'visible', timeout: 10000 });
      await this.Save.click();
      
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.log('Element not found or not clickable:', error);
      throw error;
    }
  }
}