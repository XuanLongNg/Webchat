// express frameworks
import * as express from "express";
const app = express();

// dotenv package
const dotenv = require("dotenv");
dotenv.config();

// body-parser and multer for get data json
import * as bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import * as multer from "multer";
const upload = multer();
// app.use(upload.array());

// path package
import * as path from "path";
const __dirname = path.resolve();

// session
import * as session from "express-session";
const expirationTime = 3 * 60 * 60 * 1000;
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: expirationTime,
    },
  })
);

// app
import appRouter from "./routes";
import AppConfig from "./configs/appConfig";

import * as http from "http";
// import { Server } from "socket.io";
import * as cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

const server = http.createServer(app);

// io.on("connection", (socket) => {
//   console.log("A user " + socket.id + " connected");
//   socket.on("chat message", (msg: string) => {
//     console.log("Received message:", msg);
//   });
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.use("/api", appRouter);
app.get("*", (req, res) => {
  // res.send({ message: "Hello" });
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

app.listen(4000, () => {
  console.log("server run http://localhost:4000");
});
