import { Request, Response } from "express";
import { FirebaseService } from "../services/FirebaseService";
import { Account } from "../types/firebaseTypes";
import * as session from "express-session";
const firebaseService = FirebaseService.init();

declare module "express-session" {
  interface SessionData {
    user: Account;
  }
}
class UserController {
  private constructor() {}

  static getInstance() {
    const controller = new UserController();
    return controller;
  }
  async isLogin(req: Request, res: Response, next) {
    if (req.session.user) {
      return res.send({ message: "logged" });
    } else {
      return res.send({ message: "not logged in" });
    }
  }
  async Login(req: Request, res: Response) {
    try {
      const account = {
        ...req.body,
      };
      const isCorrect = await firebaseService.authentication(account);
      if (isCorrect) {
        req.session.user = await firebaseService.getUser(account);
        // console.log(req.session.user, req.session.user.id);
        return res.send({ message: "Login complete" });
      }
      return res.send({ message: "Login failed" });
    } catch (err) {
      console.log("Error: ", err);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async Register(req: Request, res: Response) {
    try {
      const account = {
        ...req.body,
      };
      const hasUser = await firebaseService.hasUser(account);
      if (hasUser) {
        return res.send({ message: "User exits", data: account });
      } else {
        await firebaseService.addUser(account);
        return res.send({ message: "Register complete" });
      }
    } catch (err) {
      console.log("Error: ", err);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async getProfile(req: Request, res: Response) {
    if (req.session.user == undefined)
      return res.status(404).send({ message: "not logged in" });
    return res.send(req.session.user);
  }
  async getListChats(req: Request, res: Response) {
    try {
      if (req.session.user == undefined)
        return res.status(404).send({ message: "not logged in" });
      const id = req.session.user.id;
      const listChats = await firebaseService.getListBoxChat(id);
      let keys = Object.keys(listChats);
      let arr = [];
      for (let i in keys) {
        arr.push(listChats[keys[i]]);
      }
      return res.send(arr);
    } catch (err) {
      console.log("Error: ", err);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async getInfoBoxChat(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
      };
      const info = await firebaseService.getInfoBoxChat(
        data.id,
        req.session.user.id
      );
      if (info) return res.send(info);
      return res.status(403).send({ message: "Box chat doesn't exits" });
    } catch (err) {
      console.log("Error: ", err);
      return res.status(404).send({ message: "Server internal error" });
    }
  }
}

export default UserController;
