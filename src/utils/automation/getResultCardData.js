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
  const data = {
    url,
    name,
    location,
    description,
    numMembers,
    isPublic,
  };
  return data;
};
