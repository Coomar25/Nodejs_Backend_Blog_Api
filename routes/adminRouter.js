import express from "express";
import { adminlogin, createAdmin } from "../controller/adminController.js";
import { adminAuthentication } from "../middleware/adminAuthentication.js";
const router = express.Router();

router.post("/registerAdmin", createAdmin);
router.post("/loginAdmin", adminlogin);

router.get("/user", (req, res) => {
  res.render("pages/user");
});

router.get("/dashboard", (req, res) => {
  res.render("pages/adminDashboard");
});

export { router as adminRouter };
