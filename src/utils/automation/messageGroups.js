const { navigateToMessageAndSend } = require("./navigateToMessageAndSend");

export let messageGroups = async (groups, driver) => {
  for (let group of groups) {
    await navigateToMessageAndSend(group, driver);
    await prisma.group.update({
      initialMessageSent: true,
    });
  }
};
