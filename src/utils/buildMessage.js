import { prisma } from "./database/client";

export let buildMessage = async (group, messageTemplate) => {
  let organizer = await prisma.groupOrganizer.findFirst({
    where: { groupId: group.id },
  });
  //   let location = await prisma.location.findFirst({
  //     where: { id: group.locationId },
  //   });
  let organizerFirstName = organizer.firstName;
  let groupName = group.name;
  messageTemplate;
  let message = messageTemplate
    .replace("{organizerFirstName}", organizerFirstName)
    .replace("{groupName}", groupName)
    .trim();
  return message;
};
