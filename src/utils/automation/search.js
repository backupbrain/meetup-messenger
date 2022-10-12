const { By } = require("selenium-webdriver");
import { delaySeconds } from "../delaySeconds";
import { scrollIntoView } from "../scrollIntoView";
import { typeIntoCombobox } from "../typeIntoCombobox";
import { typeIntoElement } from "../typeIntoElement";
import { selectCategory } from "./selectCategory";
import { selectDistance } from "./selectDistance";
import { switchToGroupsTab } from "./switchToGroupsTab";

export let search = async (driver, theme, location, locationShort) => {
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
  // let inlinePopupXpath =
  ('//div[@data-testid="SearchTypeahead"]//ul[@id="location-typeahead-undefined-menu"]');
  let inlinePopupXpath = '//ul[@id="location-bar-in-search-menu"]';
  await scrollIntoView(inlineLocationSearchInput, driver);
  const currentLocation = await inlineLocationSearchInput.getAttribute("value");
  if (currentLocation.toLowerCase() === locationShort.toLowerCase()) {
    let submitButton = driver.findElement(
      By.xpath('//button[@id="location-search-submit"]')
    );
    await submitButton.click();
    await delaySeconds(3, 5);
  } else {
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
  }
  await switchToGroupsTab(driver);
  await selectDistance(driver, 10);
  await selectCategory(driver, "Technology");
  return true;
};
