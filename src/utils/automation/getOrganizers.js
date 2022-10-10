const { By } = require("selenium-webdriver");
import { delaySeconds } from "../delaySeconds";
import { scrollIntoView } from "../scrollIntoView";

export let getOrganizers = async (driver, groupId) => {
  const organizerCards = await driver.findElements(
    By.xpath(
      '//div[contains(@class," orgIntroCard-orgDetails")]//div[contains(@class,"orgInfo")]'
    )
  );
  const organizers = [];
  for (let organizerCard of organizerCards) {
    let link = await organizerCard.findElement(By.xpath(".//a"));
    await scrollIntoView(link, driver);
    let url = await link.getAttribute("href");
    let nameDiv = await organizerCard.findElement(
      By.xpath('//div[contains(@class,"orgIntroCard-orgDetails")]//span')
    );
    let fullName = await nameDiv.getText();
    let names = fullName.split(" ");
    let firstName = names[0];
    let lastName = names[names.length - 1];
    organizers.push({
      groupId,
      url,
      name: fullName,
      firstName,
      lastName,
    });
  }
  await delaySeconds(1, 3);
  return organizers;
};
