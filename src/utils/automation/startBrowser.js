require("chromedriver");
const { Builder, WebDriver } = require("selenium-webdriver");
const _http = require("selenium-webdriver/http");

export let startBrowser = async (sessionId) => {
  if (sessionId === undefined) {
    let driver = await new Builder().forBrowser("chrome").build();
    return driver;
  } else {
    // https://stackoverflow.com/questions/52058308/selenium-interact-with-exsting-browser-session-using-selenium-webdriver-librar
    url = "http://localhost:4444/wd/hub";
    let driver = new WebDriver(
      sessionId,
      new _http.Executor(
        Promise.resolve(url).then(
          (url) => new _http.HttpClient(url, null, null)
        )
      )
    );
    return driver;
  }
};

// await driver.get(startUrl).catch(async r => {
//            console.log('Session "' + sessionId + '" not found. Creating new session.');
//            driver = await new Builder()
//                .usingServer(url)
//                .forBrowser(browser)
//                .build();
//            driver.getSession().then(function(e){
//                console.log('Session: ' + JSON.stringify(e, null, 2));
//          });
//            driver.get(startUrl);
//    });
