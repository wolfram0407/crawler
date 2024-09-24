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
  await page.goto("https://medium.com/tag/react/recommended");
 
  await page.evaluate(() => {
  
    const titleEl = document.querySelector('article h2');
    const descriptionEl = document.querySelector('article h3');

    console.log(titleEl)
    console.log(descriptionEl)
})
})();