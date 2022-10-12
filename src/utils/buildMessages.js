const { buildMessage } = require("./buildMessage");

export let buildMessages = async (groups, messageTemplate) => {
  for (let group of groups) {
    let initialMessage = await buildMessage(group, messageTemplate);
    // let groupDescription = group.fullDescription || group.description;
    await prisma.group.update({
      where: { id: group.id },
      data: { initialMessage },
    });
  }
};
