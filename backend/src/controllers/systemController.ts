import { Request, Response } from "express";

class SystemController {
  async getKeyFireBase(req: Request, res: Response) {
    const key = {
      apiKey: process.env.DB_API_KEY,
      authDomain: process.env.DB_AUTH_DOMAIN,
      databaseURL: process.env.DB_DATABASE_URL,
      projectId: process.env.DB_PROJECT_ID,
      storageBucket: process.env.DB_STORAGE_BUCKET,
      messagingSenderId: process.env.DB_MESSAGE_SENDER,
      appId: process.env.DB_APP_ID,
      measurementId: process.env.DB_MEASUREMENT_ID,
    };
    return res.status(200).send(key);
  }
}
export default SystemController;
