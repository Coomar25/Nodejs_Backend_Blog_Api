import express from "express";
import { createBlogPost, getPostWithUser, updateBlogPost, deleteBlogPost, toggleFeatureStatus, getFeaturedPosts } from "../controller/postController.js";


const router = express.Router();


router.post("/addpost", createBlogPost );
router.get("/getpostwithuser/:postid", getPostWithUser );
router.put("/updatepost/:postid", updateBlogPost);
router.delete("/deletepost/:postid", deleteBlogPost);
router.put("/togglepostfeatures/:postid", toggleFeatureStatus);
router.get('/getfeaturespost', getFeaturedPosts);


export {router as postRouter};