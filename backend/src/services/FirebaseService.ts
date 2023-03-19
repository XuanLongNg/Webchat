import admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import AppConfig from "../configs/appConfig";
import { Account } from "../types/firebaseTypes";
import Hashing from "../utils/hashing";
import uuid from "../utils/uuid";
import { data } from "../../../frontend/src/database/data";
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
  private async getNumberOfUsers(): Promise<number> {
    const dbRef = this.database.ref("/account/number");
    const number = await dbRef.once("value");
    return number.val();
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

    if (data.exists()) {
      const dataDetail = data.val()[Object.keys(data.val())[0]];
      const information = dataDetail["information"],
        username = dataDetail["username"],
        password = dataDetail["password"];
      const result = {
        id: Object.keys(data.val())[0],
        information,
        username,
        password,
      };
      return result;
    }
    return undefined;
  }
  public async authentication(account: Account): Promise<boolean> {
    const getUser = await this.getUser(account);
    if (getUser !== undefined) {
      const password = getUser.password.toString();
      const isCorrect = await hashing.compare(account.password, password);
      if (isCorrect) return true;
    }
    return false;
  }
  public async addUser(account: Account): Promise<void> {
    const number = (await this.getNumberOfUsers()) + 1;
    const id = "userId" + number;
    const dbRef = this.database.ref("/account");
    const boxChat = this.database.ref("/boxchat");
    const message = this.database.ref("/messages");
    const information = {
      [id]: {
        username: account.username,
        password: await hashing.hash(account.password),
        information: {
          fname: account.information.fname,
          lname: account.information.lname,
          dob: account.information.dob,
          address: account.information.address,
          introduce: account.information.introduce,
          image: account.information.image,
        },
      },
    };
    const idBoxchat = uuid();
    const boxChatInit = {
      [id]: {
        b1: {
          id: idBoxchat,
          image: account.information.image,
          name: account.information.fname + " " + account.information.lname,
        },
      },
    };
    const messageInit = {
      [id]: {
        id: idBoxchat,
        message: {
          m1: {
            body: "This is your space!",
            time: new Date().toString(),
            user: id,
          },
        },
      },
    };
    await boxChat.update(boxChatInit); // update boxchat
    await message.update(messageInit); // update messages
    await dbRef.update({ number: number }); // update number of accounts
    await dbRef.update(information); // update profile
  }
  public async getListBoxChat(id: string): Promise<Object> {
    const dbRef = this.database.ref("/boxchat/" + id);
    const data = await dbRef.once("value");
    return data.val();
  }
  public async getInfoBoxChat(id: string, userId: string) {
    const dbRef = this.database
      .ref("/boxchat/" + userId)
      .orderByChild("id")
      .equalTo(id);
    const data = await dbRef.once("value");
    const idBox = Object.keys(data.val())[0];
    return data.val()[idBox];
  }
}
