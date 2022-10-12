const { prisma } = require("./client");

export let getGroups = async (locationId, activityId) => {
  let groups = await prisma.group.findMany({
    where: { locationId: locationId, activityId: activityId },
    include: {
      activity: true,
      location: true,
      GroupEvent: true,
      organizers: true,
    },
  });
  return groups;
};
