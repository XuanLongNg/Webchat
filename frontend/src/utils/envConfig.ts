import axios from "axios";
import "./env.d.ts";
// import { URL_SERVER } from "../constant/index.js";
const URL_SERVER = "http://localhost:4000";
const keyFirebase = {
  DB_API_KEY: "",
  DB_AUTH_DOMAIN: "",
  DB_DATABASE_URL: "",
  DB_PROJECT_ID: "",
  DB_APP_ID: "",
  DB_MEASUREMENT_ID: "",
  DB_MESSAGE_SENDER: "",
  DB_STORAGE_BUCKET: "",
};
axios
  .get(URL_SERVER + "/api/system/keyFirebase")
  .then((response) => {
    const key = response.data;
    console.log("respones: ", response);
    console.log("Key:", key);
    keyFirebase.DB_API_KEY = key.apiKey;
    keyFirebase.DB_AUTH_DOMAIN = key.authDomain;
    keyFirebase.DB_DATABASE_URL = key.databaseURL;
    keyFirebase.DB_PROJECT_ID = key.projectId;
    keyFirebase.DB_APP_ID = key.appId;
    keyFirebase.DB_MEASUREMENT_ID = key.measurementId;
    keyFirebase.DB_MESSAGE_SENDER = key.messagingSenderId;
    keyFirebase.DB_STORAGE_BUCKET = key.storageBucket;
    console.log("key fire:", keyFirebase);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
export const key = keyFirebase;
// const getKeyFirebase = async () => {
//   try {
//     const response = await axios.get(URL_SERVER + "/api/system/keyFirebase");
//     const key = response.data;
//     console.log(response);
//     keyFirebase.DB_API_KEY = key.DB_API_KEY;
//     keyFirebase.DB_AUTH_DOMAIN = key.DB_AUTH_DOMAIN;
//     keyFirebase.DB_DATABASE_URL = key.DB_DATABASE_URL;
//     keyFirebase.DB_PROJECT_ID = key.DB_PROJECT_ID;
//     keyFirebase.DB_APP_ID = key.DB_APP_ID;
//     keyFirebase.DB_MEASUREMENT_ID = key.DB_MESUREMENT_ID;
//     keyFirebase.DB_MESSAGE_SENDER = key.DB_MESSAGE_SENDER;
//     keyFirebase.DB_STORAGE_BUCKET = key.DB_STORAGE_BUCKET;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };
// await getKeyFirebase;
