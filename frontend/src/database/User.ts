import axios from "axios";
import { userProfile } from "../types/firebase";
export default class User {
  public user: userProfile;
  constructor() {
    this.user = {
      id: "",
      username: "",
      informations: {
        address: "",
        dob: "",
        fname: "",
        lname: "",
        image: "",
        introduce: "",
      },
    };
  }
  public async getProfile() {
    const response = await axios.get("api/user/getProfile");
    this.user = response.data;
    return this.user;
  }
}
