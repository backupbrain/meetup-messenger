const { By } = require("selenium-webdriver");
import { prisma } from "../database/client";
import { scrollIntoView } from "../scrollIntoView";
import { getGroupDetails } from "./getGroupDetails";
import { getResultCardData } from "./getResultCardData";
import { wereResultsFound } from "./wereResultsFound";

export let getResultCards = async (driver, activityId) => {
  let hasResults = await wereResultsFound(driver);
  if (!hasResults) {
    return;
  }
  let results = await driver.findElements(
    By.xpath('//a[@id="group-card-in-search-results"]')
  );
  // for each result, store the data and click on it
  let locations = await prisma.location.findMany();
  let locationLookup = {};
  for (let location of locations) {
    locationLookup[location.name] = location.id;
  }
  let currentRow = 0;
  while (currentRow < results.length) {
    const result = results[currentRow];
    await scrollIntoView(result, driver);
    let basicGroupData = await getResultCardData(result);
    let location = locationLookup[basicGroupData.location];
    if (!location) {
      location = await prisma.location.create({
        data: { name: basicGroupData.location },
      });
      locationLookup[basicGroupData.location] = location;
    }
    delete basicGroupData.location;
    let group = await prisma.group.create({
      data: { ...basicGroupData, locationId: location.id, activityId },
    });
    await result.click();
    // let controlClick = Key.chord(Key.CONTROL, Key.ENTER);
    // await result.sendKeys(controlClick);
    await delaySeconds(3, 5);
    const groupDetails = await getGroupDetails(driver, group.id);
    // const initialMessage = await buildMessage(group, messageTemplate);
    await prisma.group.update({
      where: { id: group.id },
      data: {
        ...groupDetails,
        pageNumber: 1,
        rowNumber: currentRow,
        initialMessage,
      },
    });
    // await messageOrganizer(driver, initialMessage);
    await driver.navigate().back();
    await delaySeconds(3, 5);
    currentRow += 1;
    results = await driver.findElements(
      By.xpath('//a[@id="group-card-in-search-results"]')
    );
  }
};
