import express from "express";
import { createBlogPost } from "../controller/postController.js";


const router = express.Router();


router.post("/addpost", createBlogPost );
// router.put("/updatepost", editupdatePost);


export {router as postRouter};