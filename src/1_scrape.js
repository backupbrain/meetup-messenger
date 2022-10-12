import { getResultCards } from "./utils/automation/getResultCards";
import { loadUrl } from "./utils/automation/loadUrl";
import { search } from "./utils/automation/search";
import { searchFromHome } from "./utils/automation/searchFromHome";
import { startBrowser } from "./utils/automation/startBrowser";
import { getOrCreateActivity } from "./utils/database/getOrCreateActivity";
import { delaySeconds } from "./utils/delaySeconds";

let messageTemplateFile = "data/messageTemplate.txt";

let driver = await startBrowser();
// const driverSession = await driver.getSession();
// const sessionId = driverSession.getId();

let startUrl = "https://meetup.com";
await loadUrl(startUrl, driver);

// await loginWithFacebook(driver);

let locations = [
  // {
  //   full: "Budapest, Hungary",
  //   short: "Budapest, HU",
  // },
  // {
  //   full: "Salzburg, Austria",
  //   short: "Salzburg, AT",
  // },
  // {
  //   full: "Bratislava, Slovakia",
  //   short:  "Bratislava, SK",
  // },
  // {
  //   full: "Brno, Czech Republic",
  //   short: "Brno, CZ",
  // },
  // {
  //   full: "Graz, Austria",
  //   short: "Graz, AT",
  // },
  // {
  //   full:  "Prague, Czech Republic",
  //   short: "Prague, CZ",
  // },
];
let themes = [
  // "security",
  // "django",
  // "kotlin"
  // "react",
  // "javascript",
  // "php",
  // "python",
  // "ruby",
  // // "NodeJS",
  // "Java",
  // "rust",
];
let isFirstSearch = false;
let currentLocation = 0;
let currentTheme = 0;
while (currentLocation < locations.length) {
  console.log(
    `Location ${currentLocation}: ${locations[currentLocation].full}`
  );
  let locationData = locations[currentLocation];
  let location = locationData.full;
  let locationShort = locationData.short;
  while (currentTheme < themes.length) {
    console.log(`  Theme ${currentTheme}: ${themes[currentTheme]}`);
    let theme = themes[currentTheme];
    let activity = await getOrCreateActivity(theme);
    // let hasSearchResults1 = await searchFromHome(driver, theme, location);
    let hasSearchResults = false;
    if (isFirstSearch) {
      isFirstSearch = false;
      hasSearchResults = await searchFromHome(driver, theme, location);
    } else {
      hasSearchResults = await search(driver, theme, location, locationShort);
    }
    if (hasSearchResults) {
      await delaySeconds(3, 5);
      await getResultCards(driver, activity.id);
    }
    currentTheme += 1;
  }
  currentLocation += 1;
  currentTheme = 0;
}

await driver.quit();
