const { prisma } = require("./client");

export let getOrCreateActivity = async (name) => {
  let activity = await prisma.activity.findFirst({
    where: { name },
  });
  if (!activity) {
    activity = await prisma.activity.create({ data: { name: theme } });
  }
  return activity;
};
