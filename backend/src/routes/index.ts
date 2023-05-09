import * as express from "express";
import userRouter from "./userRouter";
const appRouter = express.Router();
const requireLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};
appRouter.use("/user", userRouter);
// appRouter.use("*",)
export default appRouter;
