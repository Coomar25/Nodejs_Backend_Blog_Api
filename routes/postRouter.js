import express from "express";
import {
  createBlogPost,
  getPostWithUser,
  updateBlogPost,
  deleteBlogPost,
  toggleFeatureStatus,
  getFeaturedPosts,
  toggleUserLikes,
  addFavouritePost,
  getPostBySlug,
  fetchLatestPost,
  getPostByViews,
  getAllPostByCategory,
} from "../controller/postController.js";
import { addCommentToPost } from "../controller/commentController.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controller/categoryController.js";
import multer from "multer";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/addpost", upload.single("imagesOrMedia"), createBlogPost);
router.get("/getpostwithuser/:postid", getPostWithUser);
router.put("/updatepost/:postid", updateBlogPost);
router.delete("/deletepost/:postid", deleteBlogPost);
router.put("/togglepostfeatures/:postid", toggleFeatureStatus);
router.get("/getfeaturespost", getFeaturedPosts);
router.put("/likeorreaction/:postId/:userId", toggleUserLikes);
router.post("/addcomment/:postId/:userId", addCommentToPost);
router.get("/latestpost", fetchLatestPost);
router.get("/mostpupular", getPostByViews);
router.get("/:catslug", getAllPostByCategory);
router.get("/:tagsOrCategories/:slug", getPostBySlug);

// category

router.post("/addcategory", createCategory);
router.put("/updatecategory/:categoryId", updateCategory);
router.delete("/deletecategory/:categoryId", deleteCategory);
router.get("/getallcategories", getAllCategories);

// favourite post

router.post("/addfavourite/:postId/:userId", addFavouritePost);

export { router as postRouter };
