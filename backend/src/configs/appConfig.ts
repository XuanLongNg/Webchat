import * as firebaseConfigJson from "../../firebaseConfig.json";
import { ServiceAccount } from "firebase-admin";

export default class AppConfig {
  static getEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
      const err = new Error(`${key} does not exist`);
      // throw
    }
    return value;
  }

  static get FirebaseConfig() {
    return firebaseConfigJson;
  }
}
