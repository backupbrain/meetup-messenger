import { scrollIntoView } from "../scrollIntoView";

const { By } = require("selenium-webdriver");
const { delaySeconds } = require("../delaySeconds");

export let selectCategory = async (driver, category) => {
  let lowerCategory = category.toLowerCase();
  let categoryButton = await driver.findElement(
    By.xpath('//button[@id="category-filter-drop-down"]')
  );
  let categoryButtonText = await categoryButton.getText();
  if (categoryButtonText.toLowerCase() === lowerCategory) {
    return;
  }
  await categoryButton.click();
  await delaySeconds(0.5, 2);
  let categoryOptions = await driver.findElements(
    By.xpath('//button[contains(@id, "metacategory-")]')
  );
  let targetOption = undefined;
  for (let categoryOption of categoryOptions) {
    await scrollIntoView(categoryOption, driver);
    let text = await categoryOption.getText();
    if (text.toLowerCase() === lowerCategory) {
      targetOption = categoryOption;
    }
  }
  if (targetOption === undefined) {
    // let closeButton = driver.findElement(
    //   By.xpath('//div[@id="modal"]//button[@id="close"]')
    // );
    // await closeButton.click();
    await categoryButton.click();
    await delaySeconds(1, 2);
    return;
  }
  await targetOption.click();
  // await delaySeconds(1, 2);
  // let applyFilterButton = driver.findElement(
  //   By.xpath('//div[@id="modal"]//button[@data-testid="ApplyFilterButton"]')
  // );
  // await applyFilterButton.click();
  // await delaySeconds(4, 5);
};
