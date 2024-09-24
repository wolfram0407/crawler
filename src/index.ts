import * as puppeteer from 'puppeteer';

const initBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  }); 
  return browser;
}

(async () => {
  const browser = await initBrowser();
  const page = await browser.newPage();

  await page.goto("https://www.saucedemo.com");
  // select # 필요
  await page.type("#user-name", "standard_user");
  await page.type("#password", "secret_sauce");

  await page.click("#login-button");


  //await browser.close();
})();