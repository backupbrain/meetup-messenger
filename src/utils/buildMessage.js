import { prisma } from "./database/client";

export let buildMessage = async (group, messageTemplate) => {
  let organizer = undefined;
  if (group.organizers && group.organizers.length > 0) {
    organizer = group.organizers[0].name;
  } else {
    organizer = await prisma.groupOrganizer.findFirst({
      where: { groupId: group.id },
    });
  }
  // let location = await prisma.location.findFirst({
  //   where: { id: group.locationId },
  // });
  // let cityName = location.name.substring(0, location.name.indexOf(","))
  let organizerFirstName = organizer.firstName || "";
  let groupName = group.name;
  messageTemplate;
  let message = messageTemplate
    .replace("{organizerFirstName}", organizerFirstName)
    .replace("{groupName}", groupName)
    .trim();
  return message;
};
