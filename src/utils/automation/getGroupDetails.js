import { prisma } from "../database/prisma";
import { scrollIntoView } from "../scrollIntoView";
import { getGroupPastEvents } from "./getGroupPastEvents";
import { getGroupUpcomingEvents } from "./getGroupUpcomingEvents";
import { getOrganizers } from "./getOrganizers";

export let getGroupDetails = async (driver, groupId) => {
  let descriptionPs = await driver.findElements(
    By.xpath('//p[contains(@class, "group-description")]')
  );
  let descriptions = [];
  for (let p of descriptionPs) {
    await scrollIntoView(p, driver);
    const text = await p.getText();
    const trimmedText = text.trim();
    if (trimmedText !== "") {
      descriptions.push(trimmedText);
    }
  }
  const description = descriptions.join("\n");
  const organizers = await getOrganizers(driver, groupId);
  const pastEvents = await getGroupPastEvents(driver, groupId);
  const upcomingEvents = await getGroupUpcomingEvents(driver, groupId);
  let numPastEvents = 0;
  try {
    let numPastEventsSpan = await driver.findElement(
      By.xpath('//span[contains(text(),"Past events")]')
    );
    let numPastEventsText = await numPastEventsSpan.getText();
    numPastEvents = parseInt(
      numPastEventsText.substring(
        numPastEventsText.indexOf("(") + 1,
        numPastEventsText.length - 1
      )
    );
  } catch (error) {
    // do nothing
  }
  let numUpcomingEvents = 0;
  try {
    let numUpcomingEventsSpan = await driver.findElement(
      By.xpath('//span[contains(text(),"Upcoming events")]')
    );
    let numUpcomingEventsText = await numUpcomingEventsSpan.getText();
    numUpcomingEvents = parseInt(
      numUpcomingEventsText.substring(
        numUpcomingEventsText.indexOf("(") + 1,
        numUpcomingEventsText.length - 1
      )
    );
  } catch (error) {
    // do nothing
  }
  const now = new Date();
  const existingPastEvents = await prisma.groupEvent.findFirst({
    where: { groupId, date: { lte: now } },
  });
  if (!existingPastEvents) {
    for (let event of pastEvents) {
      await prisma.groupEvent.create({ data: event });
    }
  }
  const existingUpcomingEvents = await prisma.groupEvent.findFirst({
    where: { groupId, date: { gt: now } },
  });
  if (!existingUpcomingEvents) {
    for (let event of upcomingEvents) {
      await prisma.groupEvent.create({ data: event });
    }
  }
  const existingOrganizers = await prisma.groupOrganizer.findFirst({
    where: { groupId },
  });
  if (!existingOrganizers) {
    for (let organizer of organizers) {
      await prisma.groupOrganizer.create({ data: organizer });
    }
  }
  return {
    fullDescription: description,
    numPastEvents,
    numUpcomingEvents,
  };
};
