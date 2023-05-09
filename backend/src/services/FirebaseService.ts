import admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import AppConfig from "../configs/appConfig";
import { Account, MainStructure, message } from "../types/firebaseTypes";
import Hashing from "../utils/hashing";
import uuid from "../utils/uuid";
const hashing = new Hashing();
const default_avatar =
  "https://firebasestorage.googleapis.com/v0/b/web-chat-neil.appspot.com/o/default_image.jpg?alt=media&token=5213bee9-6cf2-4419-b949-3e9644c2a5fb";
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
  private async getNumber(url: string): Promise<number> {
    const dbRef = this.database.ref(url);
    const number = await dbRef.once("value");
    return number.val();
  }
  public async findData(
    key: string,
    value: string,
    refurl: string
  ): Promise<MainStructure | undefined> {
    const dbRef = this.database.ref(refurl).orderByChild(key).equalTo(value);
    const data = await dbRef.once("value");
    if (data.exists()) {
      return data.val();
    }
    return undefined;
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
  public async getUrlById({
    key,
    id,
    url,
  }: {
    key: string;
    id: string;
    url: string;
  }) {
    let data = await this.findData(key, id, url);
    return url + Object.keys(data)[0];
  }
  public async getUserByUsername(
    account: Account
  ): Promise<undefined | Account> {
    const username = account.username;
    const dbRef = this.database
      .ref("/account")
      .orderByChild("username")
      .equalTo(username);
    const data = await dbRef.once("value");

    if (data.exists()) {
      const dataDetail = data.val()[Object.keys(data.val())[0]];
      const id = dataDetail["id"],
        information = dataDetail["information"],
        username = dataDetail["username"],
        password = dataDetail["password"];
      const result = {
        id,
        information,
        username,
        password,
      };
      return result;
    }
    return undefined;
  }
  public async authentication(account: Account): Promise<boolean> {
    const getUser = await this.getUserByUsername(account);
    if (getUser !== undefined) {
      const password = getUser.password.toString();
      const isCorrect = await hashing.compare(account.password, password);
      if (isCorrect) return true;
    }
    return false;
  }
  public async addBoxChatInUser({ idBoxChat, idUser }) {
    const url = "/groupChats/";
    // const grChat = this.database.ref("/groupChats");
    const data = await this.findData("id", idUser, url);
  }
  public async createBoxChat({ id1, id2, nameId1, nameId2 }) {
    let url = "";
    const numberOfGrs = (await this.getNumber("/messages/number")) + 1;
    const numberOfGrInfo =
      (await this.getNumber("/groupChatsInfomation/number")) + 1;
    const colGr = "gr" + numberOfGrs;
    const colGrInfo = "gr" + numberOfGrInfo;

    const idGr = uuid();
    const grChatInfoInit = {
      [colGrInfo]: {
        id: idGr,
        image: default_avatar,
        name: nameId1 + ", " + nameId2,
        member: {
          member1: id1,
          member2: id2,
        },
      },
    };
    const messageInit = {
      [colGr]: {
        id: idGr,
        message: {
          m1: {
            body: "This is your space!",
            time: new Date().toString(),
            user: "System",
          },
        },
      },
    };
  }
  public async addUser(account: Account): Promise<void> {
    const url = "/account";
    const numberOfUsers = (await this.getNumber(url + "/number")) + 1;
    const numberOfGrs = (await this.getNumber("/messages/number")) + 1;
    const numberOfGrInfo =
      (await this.getNumber("/groupChatsInfomation/number")) + 1;

    const colUser = "user" + numberOfUsers;
    const colGr = "gr" + numberOfGrs;
    const colGrInfo = "gr" + numberOfGrInfo;

    const id = "#" + numberOfUsers;
    const dbRef = this.database.ref("/account");
    const grChat = this.database.ref("/groupChats");
    const grChatInfo = this.database.ref("/groupChatsInfomation");
    const message = this.database.ref("/messages");
    const information = {
      [colUser]: {
        id: id,
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
    const idGr = uuid();
    const grChatInit = {
      [colUser]: {
        id: id,
        boxchat: {
          b1: idGr,
        },
      },
    };
    const grChatInfoInit = {
      [colGrInfo]: {
        id: idGr,
        image: account.information.image,
        name: account.information.fname + " " + account.information.lname,
      },
    };
    const messageInit = {
      [colGr]: {
        id: idGr,
        message: {
          m1: {
            body: "This is your space!",
            time: new Date().toString(),
            user: id,
          },
        },
      },
    };
    await grChat.update(grChatInit); // update boxchat
    await message.update(messageInit); // update messages
    await grChatInfo.update(grChatInfoInit); // update grChatInfoInit
    await message.update({ number: numberOfGrs });
    await dbRef.update({ number: numberOfUsers }); // update number of accounts
    await grChatInfo.update({ number: numberOfGrInfo });
    await dbRef.update(information); // update profile
  }
  public async getListBoxChat(id: string): Promise<string[]> {
    let dbRef = this.database
      .ref("/groupChats/")
      .orderByChild("id")
      .equalTo(id);
    let data = await dbRef.once("value");
    let keys = Object.keys(data.val());
    dbRef = this.database.ref("/groupChats/" + keys[0] + "/boxchat/");
    data = await dbRef.once("value");
    keys = Object.keys(data.val());
    let arr = [];
    for (let i in keys) {
      arr.push(data.val()[keys[i]]);
    }
    return arr;
  }
  public async getInfoBoxChat(id: string) {
    const dbRef = this.database
      .ref("/groupChatsInfomation/")
      .orderByChild("id")
      .equalTo(id);
    const data = await dbRef.once("value");
    const idBox = Object.keys(data.val())[0];
    return data.val()[idBox];
  }
  public async getProfileById(id: string): Promise<undefined | Account> {
    const dbRef = this.database.ref("/account").orderByChild("id").equalTo(id);
    const data = await dbRef.once("value");
    if (data.exists()) {
      const dataDetail = data.val()[Object.keys(data.val())[0]];
      return dataDetail;
    }
    return undefined;
  }
  public async sendMessage(data: message) {
    let url = "/messages/";
    const key = "id";
    const id = data.id;
    // let datatmp = await this.findData("id", data.id, url);
    // url += Object.keys(datatmp)[0] + "/message/";
    // console.log(url);
    url = this.getUrlById({ key, id, url }) + "/message/";
    const number = (await this.getNumber(url + "number")) + 1;
    const idMes = "m" + number;
    const message = {
      [idMes]: {
        user: data.user,
        time: data.time,
        bode: data.body,
      },
    };
    await this.database.ref(url).update(message); //update message
    await this.database.ref(url + "number").set(number); //update number
    return true;
  }
  public async getMessage(id: string) {
    const data = await this.findData("id", id, "/messages/");
    if (data) {
      return data[Object.keys(data)[0]];
    }
    return undefined;
  }
  public async addFriend({ id }: { id: string; idFriend: string }) {
    let url = "/groupChats/";
    const data = await this.findData("id", id, url);
    url += Object.keys(data)[0] + "/message/";
    console.log(data, url);
    return true;
  }
}
