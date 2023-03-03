import admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import AppConfig from "../configs/appConfig";
import { Account } from "../types/firebaseTypes";
import Hashing from "../utils/hashing";
const hashing = new Hashing();
export class FirebaseService {
  private app: admin.app.App;
  private database: admin.database.Database;
  private constructor() {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        privateKey: AppConfig.FirebaseConfig.private_key,
        clientEmail: AppConfig.FirebaseConfig.client_email,
        projectId: AppConfig.FirebaseConfig.project_id,
      }),
      databaseURL:
        "https://web-chat-neil-default-rtdb.asia-southeast1.firebasedatabase.app",
    });
    // Initialize Realtime Database and get a reference to the service
    this.app = app;
    this.database = getDatabase(app);
  }
  public static init(): FirebaseService {
    return new FirebaseService();
  }
  public async hasUser(account: Account): Promise<boolean> {
    const username = account.username;
    const dbRef = this.database
      .ref("/account")
      .orderByChild("username")
      .equalTo(username);
    const data = await dbRef.once("value");

    if (data.exists()) return true;
    return false;
  }
  public async getUser(account: Account): Promise<undefined | Account> {
    const username = account.username;
    const dbRef = this.database
      .ref("/account")
      .orderByChild("username")
      .equalTo(username);
    const data = await dbRef.once("value");
    if (data.exists()) return data.val();
    return undefined;
  }
  public async authentication(account: Account): Promise<boolean> {
    const getUser = await this.getUser(account);
    if (getUser !== undefined) {
      const userKey = Object.keys(getUser)[0];
      const password = getUser[userKey].password.toString();
      const isCorrect = await hashing.compare(account.password, password);
      if (isCorrect) return true;
    }
    return false;
  }
}
