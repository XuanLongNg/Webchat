import admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import AppConfig from "../configs/appConfig";
import { Account, MainStructure, message } from "../types/firebaseTypes";
import Hashing from "../utils/hashing";
import uuid from "../utils/uuid";
import { v4 as uuidv4 } from "uuid";
const hashing = new Hashing();
const default_avatar =
  "https://firebasestorage.googleapis.com/v0/b/web-chat-neil.appspot.com/o/default_image.jpg?alt=media&token=5213bee9-6cf2-4419-b949-3e9644c2a5fb";
export class FirebaseService {
  private app: admin.app.App;
  private database: admin.database.Database;
  private storage: admin.storage.Storage;
  private bucket: any;
  private constructor() {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        privateKey: AppConfig.FirebaseConfig.private_key,
        clientEmail: AppConfig.FirebaseConfig.client_email,
        projectId: AppConfig.FirebaseConfig.project_id,
      }),
      databaseURL:
        "https://web-chat-neil-default-rtdb.asia-southeast1.firebasedatabase.app",
      storageBucket: "web-chat-neil.appspot.com",
    });
    // Initialize Realtime Database and get a reference to the service
    this.app = app;
    this.database = getDatabase(app);
    this.storage = app.storage();
    this.bucket = this.storage.bucket();
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
    const data = await this.findData("username", account.username, "/account/");
    if (data) return true;
    return false;
  }
  public async getUrlById(key: string, id: string, url: string) {
    let data = await this.findData(key, id, url);
    console.log(data);

    if (data)
      return (
        (url[url.length - 1] == "/" ? url : url + "/") + Object.keys(data)[0]
      );
    return url;
  }
  public async getUserByUsername(
    account: Account
  ): Promise<undefined | Account> {
    const data = await this.findData("username", account.username, "/account/");
    if (data) {
      const dataDetail = data[Object.keys(data)[0]];
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
  public async addBoxChatInUser(idBoxChat, idUser) {
    const grChat = this.database.ref("/groupChats/");
    let key = "id",
      id = idUser,
      url = "/groupChats/";
    let urlUser1 = await this.getUrlById(key, id, url);
    let numberOfBoxChat =
      (await this.getNumber(urlUser1 + "/boxchat/number")) + 1;
    const idbox = "b" + numberOfBoxChat;
    const new_box = {
      [idbox]: idBoxChat,
      number: numberOfBoxChat,
    };
    await this.database.ref(urlUser1 + "/boxchat").update(new_box); // adding box id in box chat user 1
  }
  public async createBoxChat(id1, id2, nameId1, nameId2) {
    //create new group chat
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
        },
      },
    };
    if (id1 == id2) {
      grChatInfoInit[colGrInfo].name = nameId1;
    } else {
      grChatInfoInit[colGrInfo].member["member2"] = id2;
    }
    const messageInit = {
      [colGr]: {
        id: idGr,
        message: {
          m1: {
            body: "This is your space!",
            time: new Date().toString(),
            user: "System",
          },
          number: 1,
        },
      },
    };
    const grChatInfo = this.database.ref("/groupChatsInfomation");
    const message = this.database.ref("/messages");
    await message.update(messageInit); // update messages
    await message.update({ number: numberOfGrs }); // update numberOfGrs
    await grChatInfo.update(grChatInfoInit); // update grChatInfoInit
    await grChatInfo.update({ number: numberOfGrInfo }); // update numberOfGrInfo

    // Add id box chat for two users
    await this.addBoxChatInUser(idGr, id1);
    if (id1 != id2) {
      await this.addBoxChatInUser(idGr, id2);
    }
    return idGr;
  }
  public async addUser(account: Account): Promise<void> {
    const url = "/account";
    const numberOfUsers = (await this.getNumber(url + "/number")) + 1;
    const colUser = "user" + numberOfUsers;

    const id = "#" + numberOfUsers;
    const dbRef = this.database.ref(url);
    const grChat = this.database.ref("/groupChats");
    const friend = this.database.ref("/friend");

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
    const grChatInit = {
      [colUser]: {
        id: id,
        boxchat: {
          number: 0,
        },
      },
    };
    const friendInit = {
      [colUser]: {
        id: id,
        listFriends: {
          number: 0,
        },
      },
    };
    await dbRef.update(information); // update profile
    await dbRef.update({ number: numberOfUsers }); // update number of accounts
    await grChat.update(grChatInit); // update boxchat
    await friend.update(friendInit); // update friend
    await this.createBoxChat(
      id,
      id,
      account.information.fname + " " + account.information.lname,
      ""
    );
  }
  public async getListBoxChat(id: string): Promise<string[]> {
    let url = (await this.getUrlById("id", id, "/groupChats/")) + "/boxchat/";
    console.log(url);

    let data = await this.database.ref(url).once("value");
    let arr = [];
    let keys = Object.keys(data.val());
    for (let i in keys) {
      arr.push(data.val()[keys[i]]);
    }
    arr.pop();
    return arr;
  }
  public async getInfoBoxChat(id: string) {
    const data = await this.findData("id", id, "/groupChatsInfomation/");
    if (data) return data[Object.keys(data)[0]];
    return data;
  }
  public async getProfileById(id: string): Promise<undefined | Account> {
    const data = await this.findData("id", id, "/account");
    if (data) {
      const dataDetail = data[Object.keys(data)[0]];
      return dataDetail;
    }
    return undefined;
  }
  public async sendMessage(data: message) {
    let url = "/messages/";
    const key = "id";
    const id = data.id;
    url = (await this.getUrlById(key, id, url)) + "/message/";
    const number = (await this.getNumber(url + "number")) + 1;
    const idMes = "m" + number;
    const message = {
      [idMes]: {
        user: data.user,
        time: data.time,
        body: data.body,
      },
    };
    await this.database.ref(url).update(message); //update message
    await this.database.ref(url + "number").set(number); //update number
    return true;
  }
  public async getMessage(id: string) {
    const data = await this.findData("id", id, "/messages/");

    if (data) {
      let tmp = data[Object.keys(data)[0]].message;
      let arr = [];
      let keys = Object.keys(tmp);
      for (let i of keys) {
        arr.push(tmp[i]);
      }
      arr.pop();
      return arr;
    }
    return undefined;
  }
  public async getNameOrUser(id: string) {
    let url = "/account/";
    let data = await this.findData("id", id, url);
    let name =
      data[Object.keys(data)[0]].information.fname +
      " " +
      data[Object.keys(data)[0]].information.lname;
    return name;
  }
  public async hasFriend({ id, idFriend }: { id: string; idFriend: string }) {
    const url = (await this.getUrlById("id", id, "/friend/")) + "/listFriends/";
    const result = await this.database.ref(url).once("value");
    const keys = Object.keys(result.val());
    for (let i of keys) if (result.val()[i] == idFriend) return true;
    return false;
  }
  public async addFriend({ id, idFriend }: { id: string; idFriend: string }) {
    let urlUser1 =
      (await this.getUrlById("id", id, "/friend/")) + "/listFriends";
    let urlUser2 =
      (await this.getUrlById("id", idFriend, "/friend/")) + "/listFriends";
    const numberOfFriendsUser1 =
      (await this.getNumber(urlUser1 + "/number")) + 1;
    const numberOfFriendsUser2 =
      (await this.getNumber(urlUser2 + "/number")) + 1;
    const dataUser1 = {
      ["friend" + numberOfFriendsUser1]: idFriend,
      number: numberOfFriendsUser1,
    };
    const dataUser2 = {
      ["friend" + numberOfFriendsUser2]: id,
      number: numberOfFriendsUser2,
    };
    console.log(urlUser1, urlUser2);
    console.log(numberOfFriendsUser1, numberOfFriendsUser2);
    const friend1 = this.database.ref(urlUser1);
    await friend1.update(dataUser1); // update friend 1
    const friend2 = this.database.ref(urlUser2);
    await friend2.update(dataUser2); // update friend 2
    let nameUser1 = await this.getNameOrUser(id);
    let nameUser2 = await this.getNameOrUser(idFriend);
    this.createBoxChat(id, idFriend, nameUser1, nameUser2);
  }
  public async addUserOnGroup(id, idGr) {
    const url =
      (await this.getUrlById("id", idGr, "/groupChatsInfomation/")) + "member";

    console.log(url);
  }
  public async createGroup(data) {
    let arr = [];
    let keys = Object.keys(data);
    for (let i in keys) {
      arr.push(data[keys[i]]);
    }
    let nameUser1 = await this.getNameOrUser(arr[0]);
    let nameUser2 = await this.getNameOrUser(arr[1]);
    const id = await this.createBoxChat(arr[0], arr[1], nameUser1, nameUser2);
    await this.addUserOnGroup("", id);
    for (let i = 2; i < arr.length; i++) {
      await this.addBoxChatInUser(id, arr[i]);
    }
    return id;
  }
  public async getSmallInformation(id) {
    let data: any = await this.findData("id", id, "/account");
    data = data[Object.keys(data)[0]];
    const result = {
      id: id,
      name: data.information.fname + " " + data.information.lname,
      image: data.information.image,
    };
    return result;
  }
  public async uploadImage(file: File) {
    const uniqueFilename = `${uuidv4()}_${file.name}`;
    const storageRef = this.storage.bucket().file(`uploads/${uniqueFilename}`);
    const fileReader = new FileReader();

    const response: void = await new Promise((resolve, reject) => {
      fileReader.onload = (event: ProgressEvent<FileReader>) => {
        const fileData = event.target?.result as ArrayBuffer;

        storageRef
          .createWriteStream({
            metadata: {
              contentType: file.type, // Loại nội dung của tệp tin
            },
          })
          .on("finish", resolve)
          .on("error", reject)
          .end(fileData);
      };

      fileReader.onerror = reject;
      fileReader.readAsArrayBuffer(file);
    });

    const signedUrls: string[] = await storageRef.getSignedUrl({
      action: "read",
      expires: "03-01-2500", // Điều chỉnh ngày hết hạn theo yêu cầu của bạn
    });

    const publicUrl: string = signedUrls[0]; // Lấy URL công khai từ danh sách signedUrls

    return publicUrl;
  }
  public async getAllData(Ref: string) {
    const response = await this.database.ref(Ref).once("value");
    return response.val();
  }
  public async updateProfile(data: Account) {
    const url = await this.getUrlById("id", data.id, "/account");
    console.log(url);
    const dbRef = await this.database.ref(url).update(data);
    console.log(dbRef);
    return true;
    // await dbRef.once("value");
  }
}
