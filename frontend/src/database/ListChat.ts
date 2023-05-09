import axios from "axios";
import { infoBoxChat } from "../types/firebase";
import { URL_SERVER } from "../constant";
class ListChat {
  public listChat: string[];
  public constructor() {
    this.listChat = [];
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
    const url_api = URL_SERVER + "/api/user/getInfoBoxChat";
    let response = await axios.post(url_api, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
}
export default ListChat;
