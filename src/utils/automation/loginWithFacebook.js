const { By } = require("selenium-webdriver");
import { delaySeconds } from "../delaySeconds";

export let loginWithFacebook = async (driver) => {
  await driver.findElement(By.id("login-link")).click();
  await delaySeconds(1, 3);
  let facebookLogin = await driver.findElement(
    By.xpath('//a[@id="facebook-login"]')
  );
  await scrollIntoView(facebookLogin, driver);
  facebookLogin.click();
  driver.wait(() => {
    try {
      driver.findElement(By.xpath("//div[@data-testid='feat-home-heading']"));
      return true;
    } catch (error) {
      return false;
    }
  }, 200);
};
