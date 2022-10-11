import { By } from "selenium-webdriver";
import "../toProperCase";

export let getResultCardData = async (result) => {
  let url = await result.getAttribute("href");
  let name = await result.findElement(By.xpath(".//h3")).getText();
  let location = await result.findElement(By.xpath(".//h3[2]")).getText();
  location = location.toProperCase();
  let description = await result.findElement(By.xpath(".//p")).getText();
  let numMembersText = await result
    .findElement(By.xpath(".//div[last()]/div[last()]"))
    .getText();
  // '576 members · Public'
  let numMembers = parseInt(numMembersText.split(" ")[0]);
  let isPublic = numMembersText.includes("Public");

  let organizersUrl = null;
  const organizerCards = await driver.findElements(
    By.xpath(
      '//div[contains(@class," orgIntroCard-orgDetails")]//div[contains(@class,"orgInfo")]'
    )
  );
  if (organizerCards.length > 0) {
    const organizerCard = organizerCards[0];
    let link = await organizerCard.findElement(By.xpath(".//a"));
    await scrollIntoView(link, driver);
    organizersUrl = await link.getAttribute("href");
  }

  let membersUrl = null;
  try {
    let membersLink = await result.findElement(
      By.xpath(
        '//section[@id="members"]//a[contains(@class, "groupMembers-memberListLink")]'
      )
    );
    await scrollIntoView(membersLink, driver);
    membersUrl = await membersLink.getAttribute("href");
  } catch (e) {
    // do nothing
  }

  const data = {
    url,
    name,
    organizersUrl,
    membersUrl,
    location,
    description,
    numMembers,
    isPublic,
  };
  return data;
};
