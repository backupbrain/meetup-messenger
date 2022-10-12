import { delaySeconds } from "./delaySeconds";

export let typeIntoElement = async (element, text) => {
  const value = await element.getAttribute("value");
  if (value.toLowerCase() === text.toLowerCase()) {
    return;
  }
  if (value !== "") {
    await element.clear();
  }
  for (let i = 0; i < text.length; i++) {
    await element.sendKeys(text[i]);
    await delaySeconds(0.01, 0.1);
  }
  await delaySeconds(1, 3);
};
