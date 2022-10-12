const { prisma } = require("./client");

export let isGroupUrlVisited = async (url) => {
  let existingGroup = await prisma.group.findFirst({
    where: { url },
  });
  if (existingGroup) {
    return true;
  }
  return false;
  // let groupData = await openGroupData();
  // for (let groupId of Object.keys(groupData)) {
  //   if (groupData[groupId].url === url) {
  //     return true;
  //   }
  // }
  // return false;
};
