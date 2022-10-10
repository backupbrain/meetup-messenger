import { delaySeconds } from "./delaySeconds";

export let scrollIntoView = async (element, driver) => {
  driver.executeScript(
    "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });",
    element
  );
  delaySeconds(0.5, 1);
};
