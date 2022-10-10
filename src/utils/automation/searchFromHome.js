import { delaySeconds } from "../delaySeconds";
import { scrollIntoView } from "../scrollIntoView";
import { typeIntoCombobox } from "../typeIntoCombobox";
import { typeIntoElement } from "../typeIntoElement";

export let searchFromHome = async (driver, theme, location) => {
  let activitySearchInput = await driver.findElement(
    By.xpath('//input[@data-testid="search-keyword-input"]')
  );
  await scrollIntoView(activitySearchInput, driver);
  await activitySearchInput.click();
  await typeIntoElement(activitySearchInput, theme);
  await delaySeconds(1, 3);
  let locationSearchInput = await driver.findElement(
    By.xpath('//input[@data-element-name="searchLocation"]')
  );
  let popupXpath = '//ul[@id="location-typeahead-searchLocation-menu"]';
  await scrollIntoView(locationSearchInput, driver);
  await locationSearchInput.click();
  const didFindLocation = await typeIntoCombobox(
    locationSearchInput,
    location,
    driver,
    popupXpath
  );
  if (!didFindLocation) {
    return false;
  }
  return true;
};
