import { delaySeconds } from "./delaySeconds";

export let scrollIntoView = async (element, driver, block) => {
  let blockType = block;
  if (!blockType) {
    blockType = "center";
  }
  driver.executeScript(
    `arguments[0].scrollIntoView({ behavior: 'smooth', block: '${blockType}' });`,
    element
  );
  delaySeconds(0.5, 1);
};
