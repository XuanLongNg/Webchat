import axios from "axios";
import { infoBoxChat } from "../types/firebase";
export default class ListChat {
  public listChat: infoBoxChat[];
  public constructor() {
    this.listChat = [];
  }
  public async getListChats(): Promise<infoBoxChat[]> {
    const response = await axios.get("/api/user/getListChats");
    this.listChat = response.data;
    return this.listChat;
  }
  // public getInfoBoxChat(id: string) {
  //   let info: infoBoxChat;
  //   axios
  //     .post("/api/user/getInfoBoxChat", { id })
  //     .then((response) => {
  //       info = response.data;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
}
