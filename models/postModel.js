import mongoose from "mongoose";
import User from "./userModel.js";
// Declare the Schema of the Mongo model
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: String,
    required: true,
  },
  tagsOrCategories: {
    type: String,
  },
  likesOrReactions: {
    type: [String],
  },
  isFeatures: {
    type: String,
    default: "notfeatured",
  },
  views: {
    type: Number,
    default: 0,
  },
  imagesOrMedia: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    // enum: ['published', 'draft', 'archived'],
    default: "notapproved",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

// Export the model
// module.exports = mongoose.model('Post', postSchema); //work for common js only

export default mongoose.model("Post", postSchema);
