export let joinGroup = async (driver) => {
  try {
    await driver
      .findElement(By.xpath('//button[contains(@class,"groupPrimaryAction")]'))
      .click();
  } catch (error) {
    // do nothing
  }
};
