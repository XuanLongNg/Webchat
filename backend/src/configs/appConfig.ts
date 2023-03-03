import * as firebaseConfigJson from "../../firebaseConfig.json";
import { ServiceAccount } from "firebase-admin";

export default class AppConfig {
  static getEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`${key} does not exist`);
    }
    return value;
  }

  static get FirebaseConfig() {
    return firebaseConfigJson;
  }
}
