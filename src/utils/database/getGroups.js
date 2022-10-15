const { prisma } = require("./client");

export let getGroups = async (locationId, activityId) => {
  let where = { locationId, numUpcomingEvents: { gt: 0 } };
  if (activityId) {
    where.activityId = activityId;
  }
  let groups = await prisma.group.findMany({
    where,
    include: {
      activity: true,
      location: true,
      GroupEvent: true,
      organizers: true,
    },
    orderBy: [
      {
        numUpcomingEvents: "desc",
      },
      {
        numPastEvents: "desc",
      },
      {
        numMembers: "desc",
      },
    ],
  });
  return groups;
};
