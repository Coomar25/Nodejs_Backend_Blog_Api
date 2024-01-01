import express from "express";
import { adminlogin, createAdmin } from "../controller/adminController.js";
import { adminAuthentication } from "../middleware/adminAuthentication.js";
const router = express.Router();

router.post("/registerAdmin", createAdmin);
router.post("/loginAdmin", adminlogin);
router.get("/testcase", adminAuthentication, (req, res) => {
  res.render("pages/adminDashboard");
});

export { router as adminRouter };
