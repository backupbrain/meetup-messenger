import { By } from "selenium-webdriver";
import { delaySeconds } from "../delaySeconds";

export let loginWithFacebook = async (driver) => {
  await driver.findElement(By.id("login-link")).click();
  await delaySeconds(1, 3);
  let facebookLogin = await driver.findElement(
    By.xpath('//a[@id="facebook-login"]')
  );
  await scrollIntoView(facebookLogin, driver);
  facebookLogin.click();
  await delaySeconds(200, 400);
  // TODO: wait for element to appear
};
