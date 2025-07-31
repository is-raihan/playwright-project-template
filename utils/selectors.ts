import * as fs from 'fs';
import * as path from 'path';

// Interface for selector data
interface SelectorData {
  key: string;
  selector: string;
  type?: string;
  comments?: string;
}

// Read selectors from CSV file
function readSelectorsFromCSV(): SelectorData[] {
  const csvPath = path.resolve(__dirname, 'selectors.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  const lines = csvContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  const selectors: SelectorData[] = [];
  
  for (const line of lines) {
    const [key, selector, type, comments] = line.split(',').map(item => item.trim());
    selectors.push({
      key,
      selector,
      type,
      comments
    });
  }
  
  return selectors;
}

// Get selector by key
export function getSelector(key: string): string {
  const selectors = readSelectorsFromCSV();
  const selectorData = selectors.find(s => s.key === key);
  
  if (!selectorData) {
    throw new Error(`Selector with key '${key}' not found in selectors.csv`);
  }
  
  return selectorData.selector;
}

// Get all selectors
export function getAllSelectors(): SelectorData[] {
  return readSelectorsFromCSV();
}

// Export common selector keys for type safety
export const SelectorKeys = {
  // Login selectors
  LOGIN_BUTTON: 'loginButton',
  USERNAME_INPUT: 'usernameInput',
  PASSWORD_INPUT: 'passwordInput',
  SUBMIT_BUTTON: 'submitButton',
  
  // Deals selectors (to be added to CSV)
  DEALS_MENU_ITEM: 'dealsMenuItem',
  REPOSITORY_SUBMENU: 'repositorySubmenu',
  DEALS_REPOSITORY_SUBMENU: 'dealsrepositorySubmenu',
  DRAFT_RADIO: 'draftRadio',
  DEAL_LINK_682: 'dealLink_682',
  CREATE_DEAL: 'createDeal',
  ROAMING_PARTNER: 'RoamingPartner',
  SELECT_OPERATORS: 'selectOperators',
  CLICK_TO_SELECT: 'Click_To_Select',
  SELECT_ROAMSMART: 'Select_RoamSmart',
  DIGICEL_LIMITED: 'Digicel_Limited',
  CONFIRM: 'Confirm',
  SAVE: 'Save',
  
  // Admin selectors
  ADMIN_BUTTON: 'adminButton',
  USER_LINK: 'userLink',
  SEARCH_BOX_SELECT: 'searchBoxselect',
  USER_NAME_FILL: 'userNameFill',
  CLICK_SEARCH_BUTTON: 'clickSearchButton',
  CLICK_THE_USER_NAME: 'clickTheUserName',
  SCROLL_TO_VIEW: 'scrolltoview',
  SELECT_TEXT_FROM_LIST: 'selectTextfromList',
  ARROW_BUTTON: 'Arrowbutton'
} as const;
