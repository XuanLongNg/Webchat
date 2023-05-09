import axios from "axios";
import { userProfile } from "../types/firebase";
import { URL_SERVER } from "../constant";
export default class User {
  public user: userProfile;
  constructor() {
    this.user = {
      id: "",
      username: "",
      information: {
        address: "",
        dob: "",
        fname: "",
        lname: "",
        image: "",
        introduce: "",
      },
    };
  }

  public async getProfile(id: string) {
    const url_api = URL_SERVER + "/api/user/getProfile";
    const response = await axios.post(url_api, { id: id });
    this.user = response.data;
    return this.user;
  }
}
