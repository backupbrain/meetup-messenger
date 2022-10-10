import { typeIntoElement } from "../typeIntoElement";

export let messageOrganizer = async (driver, text) => {
  let messageButton = await driver.findElement(
    By.xpath('//a[contains(@class, "orgInfo-message")]')
  );
  await scrollIntoView(messageButton, driver);
  await messageButton.click();
  await delaySeconds(5, 7);
  let messageInput = await driver.findElement(
    By.xpath('//textarea[contains(@class, "composeBox-textArea")]')
  );
  await typeIntoElement(messageInput, text);
  //   let sendButton = await driver.findElement(
  //     By.xpath('//button[@id="messaging-new-send"]')
  //   );
  //   await sendButton.click();
  //   await delaySeconds(1, 3);
  //   await driver.goBack();
  //   await delaySeconds(5, 7);
};
