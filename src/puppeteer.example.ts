import * as puppeteer from 'puppeteer';

const initBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  }); 
  return browser;
}

const login = async (page : puppeteer.Page) => {
  await page.goto("https://www.saucedemo.com");
  await page.type("#user-name", "standard_user");
  await page.type("#password", "secret_sauce");
  await page.click("#login-button");
}
(async () => {
  const browser = await initBrowser();
  const page = await browser.newPage();

  await login(page);

  const productNames =await page.evaluate(() => {
    let productName: string[] = [];
    const elements = document.querySelectorAll(".inventory_item_name");
    // elements map method 동작하지 않음
    elements.forEach((element) =>productName.push(element.innerHTML));
    return productName;
  })
  console.log(productNames);
  //await browser.close();
})();