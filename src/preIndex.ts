// 바로 실행 

import * as puppeteer from 'puppeteer';

type Acticle =  {
  link ?: string;
  title ?: string;
  description ?: string;
  mainImageUrl ?: string;
  avatarImageUrl ?: string;
  editor ?: string;
}

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
 
  const articles = await page.evaluate(() => {
    const elements = document.querySelectorAll(
      'article h2, article h3, article div.h > img, article div.l > img, article div.jn > div > div.l > a > p ,article div.l.es.jv > div > a'
    );

    const titleEl = document.querySelectorAll('article h2');
    const descriptionEl = document.querySelectorAll('article h3');
    const mainImageEl = document.querySelectorAll('article div.h > img');
    const avatarImageEl = document.querySelectorAll('article div.l > img');
    const editorEl = document.querySelectorAll('article div.jn > div > div.l > a > p');
    const linkEl = document.querySelectorAll('article div.l.es.jv > a:nth-child(1)');

    const articles: Acticle[] = [];
    let obj : Acticle = {};
    function chechObjectKey<T>(obj:T, key: keyof T){
      if(obj[key] === undefined) 
        return true;
      else
        false;
    }
    function setObjectKey<T>(obj:T,key: keyof T,value: T[keyof T]){
      if(chechObjectKey<T>(obj,key)){
        obj[key] = value;
      }else{
        resetObject();
      }
    }
    function resetObject() {
      articles.push(obj);
      obj = {};
    }
    elements.forEach((element) => {
      switch(element.nodeName){
        case "A" :
          setObjectKey(obj, "link",( element as any).href)
          break;
        case "H2":
          setObjectKey(obj, "title",( element as any).innerHTML)
          break;
        case "H3": 
          setObjectKey(obj, "description",( element as any).innerHTML)
          break;
        case "P" : 
          setObjectKey(obj, "editor",( element as any).innerHTML)
          break;
        case "IMG" : 
          if(element.className === "l.hk.by.jl.jm.ed"){
            setObjectKey(obj, "avatarImageUrl",( element as any).src)
          }else if(element.className === "bx.mf"){
            setObjectKey(obj, "mainImageUrl",( element as any).src)
          }
          break;
        default : 
          break;
        }
      
    })
    return articles;
  })
  console.log(articles)
  await browser.close();
})();