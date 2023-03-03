import { Request, Response } from "express";
import { FirebaseService } from "../services/FirebaseService";
const firebaseService = FirebaseService.init();
class UserController {
  private constructor() {}

  static getInstance() {
    const controller = new UserController();
    return controller;
  }
  async Login(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
      };
      const isCorrect = await firebaseService.authentication(data);
      if (isCorrect) return res.send({ message: "Login complete" });
      return res.send({ message: "Login failed" });
    } catch (err) {
      console.log("Error: ", err);
      res.status(404).send({ message: "Server internal error" });
    }
  }
}

export default UserController;
