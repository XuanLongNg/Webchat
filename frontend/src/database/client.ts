import axios from "axios";
import { infoBoxChat, message } from "../types/firebase";
import { URL_SERVER } from "../constant";
class Client {
  public listChat: string[];
  public message: message[];
  public constructor() {
    this.listChat = [];
    this.message = [];
  }

  public async getListChats(): Promise<string[]> {
    const url_api = URL_SERVER + "/api/user/getListChats";
    const response = await axios.get(url_api);
    this.listChat = response.data;
    return this.listChat;
  }

  public async getInfoBoxChat(id: string): Promise<infoBoxChat> {
    const data = {
      id: id,
    };
    console.log(data);
    const url_api = URL_SERVER + "/api/user/getInfoBoxChat";
    let response = await axios.post(url_api, data);
    return response.data;
  }

  public async getMessage(id: string) {
    const data = {
      id: id,
    };
    const url_api = URL_SERVER + "/api/user/getInfoBoxChat";
    let response = await axios.post(url_api, data);
    return response.data;
  }
}
export default Client;
