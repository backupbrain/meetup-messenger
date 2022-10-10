import { getResultCards } from "./utils/automation/getResultCards";
import { loadUrl } from "./utils/automation/loadUrl";
import { loginWithFacebook } from "./utils/automation/loginWithFacebook";
import { search } from "./utils/automation/search";
import { startBrowser } from "./utils/automation/startBrowser";
import { prisma } from "./utils/database/client";
import { getMessageTemplate } from "./utils/getMessageTemplate";

let messageTemplateFile = "data/messageTemplate.txt";

let driver = await startBrowser();

let startUrl = "https://meetup.com";
await loadUrl(startUrl, driver);

await loginWithFacebook(driver);

/* Search first run */
let theme = "javascript";
let location = "Vienna, Austria";

let activity = await prisma.activity.create({
  data: { name: theme },
});

/* Subsequent search */
let hasSearchResults = await search(driver, theme, location);

let messageTemplate = await getMessageTemplate(messageTemplateFile);
if (hasSearchResults) {
  await getResultCards(driver, activity.id, messageTemplate);
}

let result = results[0];

await driver.quit();
