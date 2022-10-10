export let login = async (driver, username, password) => {
  await driver.findElement(By.id("login-link")).click();
  await delaySeconds(1, 3);
  let loginInput = await driver.findElement(
    By.xpath('//input[@data-testid="email"]')
  );
  await scrollIntoView(loginInput, driver);
  loginInput.click();
  await typeIntoElement(loginInput, username);
  await delaySeconds(1, 3);
  let passwordInput = await driver.findElement(
    By.xpath('//input[@data-testid="current-password"]')
  );
  await scrollIntoView(passwordInput, driver);
  passwordInput.click();
  await typeIntoElement(passwordInput, password);
  await delaySeconds(1, 3);
  await driver.findElement(By.xpath('//input[@id="rememberMe"]')).click();
  await delaySeconds(1, 3);
  await driver.findElement(By.xpath('//button[@data-testid="submit"]')).click();
  await delaySeconds(3, 5);
};
