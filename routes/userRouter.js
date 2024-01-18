import express from "express";
import {
  createUser,
  verifyUserThroughMail,
  login,
} from "../controller/user.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
// router.get("/withouturl", () => {
//   return res.status(200).json({ message: "successfully listen to the port" });
// });

router.post("/createuser", createUser);
router.get("/emailverification/:id", verifyUserThroughMail);
router.post("/login", login);

export { router as userRouter };
