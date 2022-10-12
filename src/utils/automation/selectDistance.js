const { By } = require("selenium-webdriver");
const { delaySeconds } = require("../delaySeconds");

export let selectDistance = async (driver, desiredDistance) => {
  let distanceButton = await driver.findElement(
    By.xpath('//button[@id="event-distance-filter-drop-down"]')
  );
  let distanceButtonText = await distanceButton.getText();
  if (distanceButtonText === `${desiredDistance} miles`) {
    return;
  }
  await distanceButton.click();
  await delaySeconds(0.5, 2);
  let distanceOptions = await driver.findElements(
    By.xpath('//button[contains(@id, "event-distance-")]')
  );
  let optimalDistance = undefined;
  let optimalDistanceOption = undefined;
  for (let distanceOption of distanceOptions) {
    let text = await distanceOption.getText();
    let distanceString = text.split(" ")[0];
    let distance = parseInt(distanceString);
    if (isNaN(distance)) {
      continue;
    }
    if (
      optimalDistance === undefined ||
      distance < optimalDistance ||
      distance === desiredDistance
    ) {
      optimalDistance = distance;
      optimalDistanceOption = distanceOption;
    }
  }
  if (optimalDistanceOption === undefined) {
    // let closeButton = driver.findElement(
    //   By.xpath('//div[@id="modal"]//button[@id="close"]')
    // );
    // await closeButton.click();
    await distanceButton.click();
    await delaySeconds(1, 2);
    return;
  }
  await optimalDistanceOption.click();
  await delaySeconds(1, 2);
  // let applyFilterButton = driver.findElement(
  //   By.xpath('//div[@id="modal"]//button[@data-testid="ApplyFilterButton"]')
  // );
  // await applyFilterButton.click();
  // await delaySeconds(4, 5);
};
