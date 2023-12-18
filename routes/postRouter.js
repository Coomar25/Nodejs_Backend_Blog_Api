import express from "express";
import { createBlogPost, getPostWithUser } from "../controller/postController.js";


const router = express.Router();


router.post("/addpost", createBlogPost );
router.get("/getpostwithuser/:postid", getPostWithUser );
// router.put("/updatepost", editupdatePost);


export {router as postRouter};