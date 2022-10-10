import { By } from "selenium-webdriver";
import { delaySeconds } from "../delaySeconds";

export let switchToGroupsTab = async (driver) => {
  let currentUrl = await driver.getCurrentUrl();
  if (!currentUrl.includes("source=GROUPS")) {
    await driver
      .findElement(By.xpath('//button[@id="find-groups-tab"]'))
      .click();
    await delaySeconds(2, 5);
  }
};
