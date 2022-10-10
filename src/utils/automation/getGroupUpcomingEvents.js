const { By } = require("selenium-webdriver");
import { delaySeconds } from "../delaySeconds";
import { scrollIntoView } from "../scrollIntoView";

export let getGroupUpcomingEvents = async (driver, groupId) => {
  const eventCards = await driver.findElements(
    By.xpath(
      '//div[contains(@class,"groupHome-eventsList-upcomingEvents")]//div[contains(@class,"card")]'
    )
  );
  const upcomingEvents = [];
  for (let eventCard of eventCards) {
    let link = await eventCard.findElement(
      By.xpath('.//a[contains(@class,"eventCard--link")]')
    );
    await scrollIntoView(link, driver);
    let url = await link.getAttribute("href");
    let dateDiv = await eventCard.findElement(By.xpath(".//time"));
    await scrollIntoView(dateDiv, driver);
    let dateTimestamp = await dateDiv.getAttribute("datetime");
    let date = new Date(parseInt(dateTimestamp));
    let nameDiv = await eventCard.findElement(
      By.xpath('.//div[contains(@class,"text--sectionTitle")]/a')
    );
    await scrollIntoView(nameDiv, driver);
    let name = await nameDiv.getText();
    let locationDiv = await eventCard.findElement(
      By.xpath('.//*[contains(@class,"venueDisplay")]')
    );
    await scrollIntoView(locationDiv, driver);
    let location = await locationDiv.getText();
    let attendeesItems = await eventCard.findElements(
      By.xpath('.//ul[contains(@class,"eventCard--attendeesLink")]/li')
    );
    let numAttendees = attendeesItems.length;
    if (attendeesItems.length > 3) {
      let additionalAttendeesCount = await attendeesItems[
        attendeesItems.length - 1
      ].getText();
      numAttendees = parseInt(additionalAttendeesCount.substring(1)) + 3;
    }
    upcomingEvents.push({
      groupId,
      url,
      name,
      date,
      location,
      numAttendees,
    });
  }
  await delaySeconds(1, 3);
  return upcomingEvents;
};
