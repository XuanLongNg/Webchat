import axios from "axios";
import { keyFirebase } from "../types/firebase";
import { URL_SERVER } from "../constant";
import FirebaseServiceClient from "../configs/firebaseConfig";

class System {
  public keyFirebase: keyFirebase;
  public constructor() {
    this.keyFirebase = {
      DB_API_KEY: "",
      DB_AUTH_DOMAIN: "",
      DB_DATABASE_URL: "",
      DB_PROJECT_ID: "",
      DB_APP_ID: "",
      DB_MEASUREMENT_ID: "",
      DB_MESSAGE_SENDER: "",
      DB_STORAGE_BUCKET: "",
    };
  }
  async getKeyFirebase() {
    try {
      const response = await axios.get(URL_SERVER + "/api/system/keyFirebase");
      const key = response.data;
      this.keyFirebase.DB_API_KEY = key.apiKey;
      this.keyFirebase.DB_AUTH_DOMAIN = key.authDomain;
      this.keyFirebase.DB_DATABASE_URL = key.databaseURL;
      this.keyFirebase.DB_PROJECT_ID = key.projectId;
      this.keyFirebase.DB_APP_ID = key.appId;
      this.keyFirebase.DB_MEASUREMENT_ID = key.measurementId;
      this.keyFirebase.DB_MESSAGE_SENDER = key.messagingSenderId;
      this.keyFirebase.DB_STORAGE_BUCKET = key.storageBucket;
      return this.keyFirebase;
    } catch (error) {
      console.log(error);
      throw error;
      return undefined;
    }
  }
}
export default System;
