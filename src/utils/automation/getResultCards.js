const { By } = require("selenium-webdriver");
const fs = require("fs").promises;
import { prisma } from "../database/client";
import { isGroupUrlVisited } from "../database/isGroupUrlVisited";
import { scrollIntoView } from "../scrollIntoView";
import { getGroupDetails } from "./getGroupDetails";
import { getResultCardData } from "./getResultCardData";
import { wereResultsFound } from "./wereResultsFound";

let openGroupData = async () => {
  let rawData = await fs.readFile("data/html.json", "utf-8");
  let htmlData = JSON.parse(rawData);
  return htmlData;
};

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
    locationLookup[location.name] = location;
  }
  let currentRow = 0;
  while (currentRow < results.length) {
    const result = results[currentRow];
    let url = await result.getAttribute("href");
    let urlVisited = await isGroupUrlVisited(url);
    if (urlVisited) {
      currentRow++;
      continue;
    }
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
      data: {
        ...basicGroupData,
        locationId: location.id,
        activityId,
        url,
      },
    });
    let mainElement = driver.findElement(
      By.xpath("//main[@id='main']/div/div[2]")
    );
    await driver.executeScript("arguments[0].scrollTop = 0", mainElement);
    await scrollIntoView(result, driver, "start");
    await result.click();
    // let controlClick = Key.chord(Key.CONTROL, Key.ENTER);
    // await result.sendKeys(controlClick);
    await delaySeconds(3, 5);
    const groupDetails = await getGroupDetails(driver, group.id);
    let organizersUrl = undefined;
    try {
      const organizerLinkDiv = await driver.findElement(
        By.xpath('//a[contains(@class,"orgInfo-name")]')
      );
      organizersUrl = await organizerLinkDiv.getAttribute("href");
    } catch (error) {
      // do nothing
    }
    const html = await driver.executeScript(
      "return document.getElementsByTagName('html')[0].outerHTML"
    );
    // for this run, store html in a file
    // let htmlData = await openGroupData();
    // htmlData[group.id] = {
    //   url,
    //   html,
    // };
    // await fs.writeFile("data/html.json", JSON.stringify(htmlData));

    // const initialMessage = await buildMessage(group, messageTemplate);
    await prisma.group.update({
      where: { id: group.id },
      data: {
        ...groupDetails,
        pageNumber: 1,
        rowNumber: currentRow,
        organizersUrl,
        html,
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
