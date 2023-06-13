import axios from "axios";
import { infoBoxChat, message } from "../types/firebase";
import { URL_SERVER } from "../constant";
import FirebaseServiceClient from "../configs/firebaseConfig";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
const firebaseServiceClient = new FirebaseServiceClient();
class Client {
  public listChat: string[];
  public message: message[];
  public constructor() {
    this.listChat = [];
    this.message = [];
  }

  public async getListChats(): Promise<string[]> {
    const url_api =
      URL_SERVER + "/api/user/getListChats/" + localStorage.id.substring(1);
    const response = await axios.get(url_api);
    this.listChat = response.data;
    return this.listChat;
  }

  public async getInfoBoxChat(id: string): Promise<infoBoxChat> {
    const data = {
      id: id,
    };
    // console.log(data);
    const url_api = URL_SERVER + "/api/user/getInfoBoxChat";
    let response = await axios.post(url_api, data);
    return response.data;
  }

  public async getMessage(id: string): Promise<message[]> {
    const data = {
      id: id,
    };
    const url_api = URL_SERVER + "/api/user/getMessage";
    let response = await axios.post(url_api, data);
    console.log(response.data);

    return response.data;
  }
  public async sendMessage(id: string, message: message) {
    const data = {
      id: id,
      user: message.sender,
      time: message.time,
      body: message.body,
    };
    const url_api = URL_SERVER + "/api/user/sendMessage";
    let response = await axios.post(url_api, data);
    console.log(response.data);
  }
  public async getMessageClient(id: string): Promise<message[]> {
    const database = firebaseServiceClient.getDatabase();
    if (database) {
      try {
        const dbRef = ref(database, "/messages/");
        const queryRef = query(dbRef, orderByChild("id"), equalTo(id));
        // const starCountRef = ref(database, "/messages/");
        // const queryRef = query(starCountRef, orderByChild(id), equalTo(id));
        const snapshot = await get(queryRef);
        // console.log("Data: ", data);
        if (snapshot) {
          const data = snapshot.val();
          let tmp = data[Object.keys(data)[0]].message;
          // console.log("Key: ", keys);
          // console.log("Data: ", tmp);

          let arr: message[] = [];
          let keys = Object.keys(tmp);
          for (let i of keys) {
            arr.push(tmp[i]);
          }
          arr.pop();
          // console.log("Array", arr);

          return arr;
        }
        return [];
      } catch (err) {
        console.log(err);
        throw err;
        // return err;
      }
    }
    return [];
  }
}
export default Client;
