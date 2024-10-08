
//import nodeScheduler from 'node-schedule';

import Crawler from "./crawler";
import { Database, db } from "./firebase";


const start = async () => {
  
   const crawler = new Crawler();
   crawler.start();


  const database = new Database(db);
  const result =await database.addData('test',{
    name : "test2",
    age: 24,
  })
  // console.log(result.id);
};

start();






