const { messageOrganizer } = require("./messageOrganizer");
const { scrollIntoView } = require("../scrollIntoView");
const { delaySeconds } = require("../delaySeconds");
const { loadUrl } = require("./loadUrl");
const { By } = require("selenium-webdriver");

export let navigateToMessageAndSend = async (group, driver) => {
  await loadUrl(group.url, driver);
  await delaySeconds(3, 5);
  let messageLink = await driver.findElement(
    By.xpath(
      '//div[contains(@class," orgIntroCard-orgDetails")]//div[contains(@class,"orgInfo")]//a[contains(@class, "orgInfo-message")]'
    )
  );
  await scrollIntoView(messageLink, driver);
  await messageLink.click();
  await delaySeconds(3, 5);
  await messageOrganizer(driver, group.initialMessage);
};
