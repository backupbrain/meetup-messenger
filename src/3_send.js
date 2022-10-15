const { prisma } = require("./utils/database/client");
import { messageGroups } from "./utils/automation/messageGroups";
import { startBrowser } from "./utils/automation/startBrowser";

let driver = await startBrowser();

let groups = await prisma.group.findMany({
  where: { initialMessage: { not: null }, nitialMessageSent: false },
});

await messageGroups(groups, driver);

await driver.quit();
