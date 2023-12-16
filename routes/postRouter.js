import express from "express";
import { addPost } from "../controller/post.js";
import { editupdatePost } from "../controller/post.js";


const router = express.Router();


router.post("/addpost", addPost );
router.put("/updatepost", editupdatePost);


export {router as postRouter};