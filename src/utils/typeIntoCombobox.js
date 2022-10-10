const { Key } = require("selenium-webdriver");
import { delaySeconds } from "./delaySeconds";

export let typeIntoCombobox = async (element, text, driver, popupXpath) => {
  const lowerCaseSearch = text.toLowerCase();
  const value = await element.getAttribute("value");
  if (value !== "") {
    await element.clear();
    await delaySeconds(0.5, 2);
    await element.clear();
  }
  for (let i = 0; i < text.length; i++) {
    await element.sendKeys(text[i]);
    try {
      const popup = await driver.findElement(By.xpath(popupXpath));
      let isPopupVisible = await popup.isDisplayed();
      if (isPopupVisible) {
        // check if the full text listed as one of the elements in the popup
        // if so, click on it
        // if not, continue typing
        let options = await popup.findElements(By.xpath(".//li"));
        let maxSearchLength = Math.min(3, options.length);
        for (let j = 0; j < maxSearchLength; j++) {
          let option = options[j];
          let optionText = await option.getText();
          if (optionText.toLowerCase() === lowerCaseSearch) {
            await option.click();
            await delaySeconds(3, 5);
            element.sendKeys(Key.RETURN);
            return true;
          }
        }
      }
    } catch (error) {
      // pass
    }
    await delaySeconds(0.01, 0.1);
  }
  await delaySeconds(5, 8);
  let popup = await driver.findElement(By.xpath(popupXpath));
  let options = await popup.findElements(By.xpath(".//li"));
  let maxSearchLength1 = Math.min(3, options.length);
  for (let j = 0; j < maxSearchLength1; j++) {
    let option = options[j];
    let optionText = await option.getText();
    if (optionText.toLowerCase() === lowerCaseSearch) {
      await option.click();
      await delaySeconds(3, 5);
      element.sendKeys(Key.RETURN);
      return true;
    }
  }
  await delaySeconds(1, 3);
  return false;
};
