import express from "express";
import { adminlogin, createAdmin } from "../controller/adminController.js";

const router = express.Router();

router.post("/registerAdmin", createAdmin);
router.get("/login/admin", adminlogin);

export { router as adminRouter };
