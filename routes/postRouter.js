import express from "express";
import { createBlogPost, getPostWithUser, updateBlogPost, deleteBlogPost, toggleFeatureStatus, getFeaturedPosts, toggleUserLikes } from "../controller/postController.js";
import {addCommentToPost} from "../controller/commentController.js"

const router = express.Router();


router.post("/addpost", createBlogPost );
router.get("/getpostwithuser/:postid", getPostWithUser );
router.put("/updatepost/:postid", updateBlogPost);
router.delete("/deletepost/:postid", deleteBlogPost);
router.put("/togglepostfeatures/:postid", toggleFeatureStatus);
router.get('/getfeaturespost', getFeaturedPosts);
router.put('/likeorreaction/:postId/:userId', toggleUserLikes);
router.post('/addcomment/:postId/:userId', addCommentToPost);


export {router as postRouter};