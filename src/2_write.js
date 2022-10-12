const { prisma } = require("../database/client");
const { getLocation } = require("./utils/database/getLocation");
const { getMessageTemplate } = require("./utils/getMessageTemplate");
const { buildMessage } = require("./utils/buildMessage");
const fs = require("fs").promises;

let messageTemplate = await getMessageTemplate();

let locationName = "Vienna, At";
let activityName = "javascript";

let location = await getLocation(locationName);
let activity = await prisma.activity.findFirst({
  where: { name: activityName },
});

let groups = await prisma.group.findMany({
  where: { locationId: location.id, activityId: activity.id },
  include: {
    activity: true,
    location: true,
    GroupEvent: true,
    organizers: true,
  },
});

// TODO: loop through groups
// let group = groups[0];
for (let group of groups) {
  let initialMessage = await buildMessage(group, messageTemplate);
  // let groupDescription = group.fullDescription || group.description;
  await prisma.group.update({
    where: { id: group.id },
    data: { initialMessage },
  });
}
