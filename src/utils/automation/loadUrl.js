import { delaySeconds } from "../delaySeconds";

export let loadUrl = async (url, driver) => {
  await driver.get(url);
  await delaySeconds(3, 5);
};
