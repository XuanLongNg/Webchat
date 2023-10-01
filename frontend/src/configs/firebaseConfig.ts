import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Database,
  getDatabase,
  ref,
  get,
  set,
  orderByChild,
  equalTo,
  query,
} from "firebase/database";
import { MainStructure, Message, keyFirebase } from "../types/firebase";
import System from "../database/system";
import { getStorage } from "firebase/storage";
// const system = new System();
const KEY_FIREBASE = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URl,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
export class FirebaseServiceClient {
  private app: any;
  // FirebaseApp | null;
  private database: any;
  // Database | null;
  private storage: any;
  public constructor() {
    this.app = initializeApp(KEY_FIREBASE);
    this.database = getDatabase(this.app);
    this.storage = getStorage(this.app);
  }
  public getDatabase() {
    return this.database;
  }
  public getStorage() {
    return this.storage;
  }
  public async getData(refurl: string): Promise<MainStructure | undefined> {
    try {
      if (this.database) {
        const dbRef = ref(this.database, refurl);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          return data;
        }
      } else return undefined;
    } catch (error) {
      console.error("Error retrieving data:", error);
    }

    return undefined;
  }
  public async getDataByKey(
    key: string,
    value: string,
    refurl: string
  ): Promise<any> {
    if (this.database) {
      const dbRef = ref(this.database, refurl);
      const queryRef = query(dbRef, orderByChild(key), equalTo(value));
      try {
        const snapshot = await get(queryRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          return data;
        }
        return undefined;
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    } else return undefined;
  }
  public async getUrlByKey(key: string, value: string, refurl: string) {
    if (this.database) {
      const dbRef = ref(this.database, refurl);
      const queryRef = query(dbRef, orderByChild(key), equalTo(value));
      try {
        const snapshot = await get(queryRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          return (
            (refurl[refurl.length - 1] == "/" ? refurl : refurl + "/") +
            Object.keys(data)[0]
          );
        }
        return refurl;
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    } else return refurl;
  }
  public async setData(refurl: string, data: MainStructure): Promise<void> {
    if (this.database) {
      try {
        const dbRef = ref(this.database, refurl);
        await set(dbRef, data);
      } catch (error) {
        console.error("Error setting data:", error);
        throw error;
      }
    }
  }
}
const firebase = new FirebaseServiceClient();

export default firebase;
