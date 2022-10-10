import { delaySeconds } from "../delaySeconds";
import { scrollIntoView } from "../scrollIntoView";
import { typeIntoCombobox } from "../typeIntoCombobox";
import { typeIntoElement } from "../typeIntoElement";
import { switchToGroupsTab } from "./switchToGroupsTab";

export let search = async (driver, theme, location) => {
  let inlineActivitySearchInput = await driver.findElement(
    By.xpath('//input[@id="keyword-bar-in-search"]')
  );
  await scrollIntoView(inlineActivitySearchInput, driver);
  await inlineActivitySearchInput.click();
  await typeIntoElement(inlineActivitySearchInput, theme);
  await delaySeconds(1, 3);
  let inlineLocationSearchInput = await driver.findElement(
    By.xpath('//div[@data-testid="SearchTypeahead"]//input')
  );
  let inlinePopupXpath =
    '//div[@data-testid="SearchTypeahead"]//ul[@id="location-typeahead-undefined-menu"]';
  await scrollIntoView(inlineLocationSearchInput, driver);
  await inlineLocationSearchInput.click();
  const didFindLocation = await typeIntoCombobox(
    inlineLocationSearchInput,
    location,
    driver,
    inlinePopupXpath
  );
  if (!didFindLocation) {
    return false;
  }
  await switchToGroupsTab(driver);
  return true;
};
