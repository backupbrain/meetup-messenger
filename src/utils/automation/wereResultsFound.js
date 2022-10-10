import { By } from "selenium-webdriver";

export let wereResultsFound = async (driver) => {
  try {
    let redoSearchButton = await driver.findElement(
      By.xpath('//button[text()="Try resetting the filters."]')
    );
    return false;
  } catch (error) {
    return true;
  }
};
