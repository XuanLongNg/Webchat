import * as express from "express";
import * as bodyParser from "body-parser";
import * as multer from "multer";
import * as path from "path";
import * as session from "express-session";
import * as cors from "cors";
const dotenv = require("dotenv");
const app = express();
dotenv.config(); // config dotenv
// body-parser and multer for get data json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer();
// path package
const __dirname = path.resolve();
// session
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
const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

// app
import appRouter from "./routes";

app.use(express.static(path.join(__dirname, "/frontend/build")));
app.use("/api", appRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

app.listen(4000, () => {
  console.log("server run http://localhost:4000");
});
