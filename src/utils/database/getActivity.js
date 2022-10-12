const { prisma } = require("./client");

export let getActivity = async (name) => {
  let activity = await prisma.activity.findFirst({
    where: { name: name.toLowerCase() },
  });
  return activity;
};
