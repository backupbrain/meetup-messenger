const { getLocation } = require("./utils/database/getLocation");
const { getActivity } = require("./utils/database/getActivity");
const { getGroups } = require("./utils/database/getGroups");
const { getMessageTemplate } = require("./utils/getMessageTemplate");
const { buildMessages } = require("./utils/buildMessages");

let messageTemplate = await getMessageTemplate("data/messageTemplate.txt");

let locationName = "Vienna, AT";
let activityName = "javascript";

let location = await getLocation(locationName);
let activity = await getActivity(activityName);

let groups = await getGroups(location.id); // , activity.id);

await buildMessages(groups, messageTemplate);
