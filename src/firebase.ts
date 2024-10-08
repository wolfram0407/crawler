import { FirebaseApp, initializeApp, getApp } from "firebase/app";
import { Firestore ,getFirestore, addDoc, getDocs, collection, where, query } from "firebase/firestore";
import 'dotenv/config'

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

let app : FirebaseApp ;

try {
  app= getApp("app")
}catch (e) {
  app = initializeApp(firebaseConfig, "app")
}

export const db = getFirestore(app);

export class Database {
  constructor(db: Firestore){
    this.db = db;
  }
  private readonly db : Firestore;

  async addData<T extends object>(collections : string, createData : T){
    return addDoc(collection(this.db, collections), createData);
  }
  async getData (collections : string, key : string, value : string){
    const querySnapshot = await getDocs(
      query(collection(db, collections), where(key, "==", value))
    );

    let result: any = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  }
}