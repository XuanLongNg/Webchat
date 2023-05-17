import { Request, Response } from "express";
import { FirebaseService } from "../services/FirebaseService";
import { Account, message } from "../types/firebaseTypes";
import * as session from "express-session";
const firebaseService = FirebaseService.init();

declare module "express-session" {
  interface SessionData {
    user: string;
  }
}
class UserController {
  private constructor() {}

  static getInstance() {
    const controller = new UserController();
    return controller;
  }
  async isLogin(req: Request, res: Response, next) {
    if (req.session.user === req.body.id) {
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
        const user = await firebaseService.getUserByUsername(account);
        req.session.user = user.id;
        return res.send({ message: "Login complete", id: req.session.user });
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
    // console.log(req.body.id);

    const user = await firebaseService.getProfileById(req.body.id);
    if (user === undefined)
      return res.status(404).send({ message: "not logged in" });
    return res.send(user);
  }
  async getListChats(req: Request, res: Response) {
    try {
      if (req.session.user == undefined)
        return res.status(404).send({ message: "not logged in" });
      const id = req.session.user;
      const listChats = await firebaseService.getListBoxChat(id);
      return res.send(listChats);
    } catch (err) {
      console.log("Error: ", err);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async getInfoBoxChat(req: Request, res: Response) {
    try {
      console.log(req.body.id);
      const info = await firebaseService.getInfoBoxChat(req.body.id);
      if (info) return res.send(info);
      // if (1)
      //   return res
      //     .status(200)
      //     .send([
      //       "c1a3c8de54444d88b3f1d2652892b045",
      //       "87c24315436d435fbc6792389e374c8a",
      //     ]);
      return res.status(403).send({ message: "Box chat doesn't exits" });
    } catch (err) {
      console.log("Error: ", err);
      return res.status(404).send({ message: "Server internal error" });
    }
  }
  async sendMessage(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
      };
      const isSended = firebaseService.sendMessage(data);
      if (isSended) {
        return res.status(200).send({ message: "sended" });
      } else {
        return res.status(200).send({ message: "rejected" });
      }
    } catch (err) {
      console.log("Error: ", err);
      return res.status(404).send({ message: "Server internal error" });
    }
  }
  async getMessage(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
      };
      let message = await firebaseService.getMessage(data.id);
      console.log(message);

      if (message) return res.status(200).send(message);
      return res.status(403).send({ message: "Box chat doesn't exits" });
    } catch (err) {
      console.log(err);
    }
  }
  async addFriend(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
      };
      const result = await firebaseService.addFriend(data);
      if (result) return res.status(200).send({ result: "complete" });
      return res.status(200).send({ result: "rejected" });
    } catch (error) {
      console.log(error);
    }
  }
  async createGroup(req: Request, res: Response) {
    try {
      const data = {
        ...req.body,
      };
      const result = await firebaseService.createGroup(data);
      // if (result)
      return res.status(200).send({ result: "complete" });
      // return res.status(200).send({ result: "rejected" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserController;
