import { typeIntoElement } from "../typeIntoElement";

export let messageOrganizer = async (driver, text) => {
  let textarea = driver.findElement(
    By.xpath('//textarea[@id="messaging-new-convo"]')
  );
  await typeIntoElement(textarea, text);
  await delaySeconds(2, 5);
  let sendButton = driver.findElement(
    By.xpath('//button[@id="messaging-new-send"]')
  );
  // await sendButton.click();
  await delaySeconds(5, 10);
};
