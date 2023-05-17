import * as express from "express";
import SystemController from "../controllers/systemController";
const systemController = new SystemController();
const system = express.Router();

system.get("/keyFirebase", systemController.getKeyFireBase);

export default system;
