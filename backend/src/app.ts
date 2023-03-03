import * as express from "express";
const app = express();

const dotenv = require("dotenv");
dotenv.config();

import * as bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import * as multer from "multer";
const upload = multer();
// app.use(upload.array());

import appRouter from "./routes";
import AppConfig from "./configs/appConfig";

import * as path from "path";
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.use("/api", appRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});
const POST = AppConfig.getEnv("POST") || 4000;

app.listen(3000, () => {
  console.log("server run http://localhost:3000");
});
