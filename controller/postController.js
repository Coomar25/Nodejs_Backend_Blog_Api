import Post from "../models/postModel.js";
import Favouritepost from "../models/favouritemodel.js";
import {
  createPostValidateSchema,
  updatePostValidateSchema,
} from "../utils/createpostValidateSchema.js";

const generateSlug = (title) => {
  let slug = title.toLowerCase().replace(/\s+/g, "-");
  slug = slug.trim("-");
  if (slug.length < 3) {
    slug = `${slug}-${Math.random().toString(36).substring(2, 5)}`;
  }
  slug = slug.replace(/[^a-z0-9-]+/g, "");
  return slug;
};

export const createBlogPost = async (req, res) => {
  try {
    const { error, value } = createPostValidateSchema.validate(req.body);
    if (!error) {
      const title = value.title;
      const slug = generateSlug(title);
      const existingBlogPost = await Post.findOne({ slug: slug });
      if (existingBlogPost) {
        return res.status(409).json({
          warning: "Post with that name already exist",
          success: false,
        });
      }
      // hamlai nepali date chaiya ho ni tw

      const event = new Date();
      const options = { timeZone: "Asia/Kathmandu" };
      const nepalTime = event.toLocaleString("en-US", options);

      const blogPostInfo = new Post({
        user: value.user,
        title: value.title,
        slug: slug,
        content: value.content,
        author: value.author,
        tagsOrCategories: value.category,
        publicationDate: nepalTime,
        imagesOrMedia: value.imagesOrMedia,
        status: value.status,
      });

      const createblogpost = await Post.create(blogPostInfo);
      console.log(createblogpost);
      return res.status(201).json({
        success: "You Blog Post Has Been Requested! Thank You Soo Much",
        response: createblogpost,
      });
    } else {
      return res.status(401).json({ error: error.details[0].message });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export const getPostWithUser = async (req, res) => {
  const postId = req.params.postid;
  try {
    const checkpost = await Post.findById(postId);
    if (!checkpost) {
      return res.status(404).send({ message: "Post not found" });
    }
    const post = await Post.findById(postId)
      .populate("user", "_id username email image")
      .populate("commentId");
    console.log(post);
    res.status(200).send({ post: post });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPostBySlug = async (req, res) => {
  const tagsOrCategories = req.params.tagsOrCategories;
  const slug = req.params.slug;
  console.log(slug, tagsOrCategories);
  try {
    const getpostbyslug = await Post.findOne({
      slug: slug,
      tagsOrCategories: tagsOrCategories,
    })
      .populate("user", "_id username email image")
      .populate("commentId");
    if (!getpostbyslug) {
      return res.status(404).send({ message: "Post not found" });
    }
    console.log(getpostbyslug);
    res.status(200).send({ post: getpostbyslug });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getFeaturedPosts = async (req, res) => {
  try {
    const featuredPosts = await Post.find({ isFeatures: "featured" }).populate(
      "user",
      "_id username email image"
    );
    if (featuredPosts.length === 0) {
      return res.status(404).send({ message: "No Features Post Yet" });
    }
    res.status(200).send({ posts: featuredPosts });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const fetchLatestPost = async (req, res) => {
  try {
    const latestpost = await Post.find({
      isFeatures: { $ne: "featured" },
    })
      .sort({ publicationDate: -1 })
      .populate("user", "_id username email image")
      .populate("commentId");

    if (!latestpost || latestpost.length === 0) {
      return res.status(404).send({
        message: "No Latest Post has been Found",
      });
    }
    console.log(latestpost);
    return res.status(200).send({
      latestpost: latestpost,
    });
  } catch (error) {
    console.log("Error while fetching the latest posts", error);
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const postId = req.params.postid;
    console.log(postId);
    const { error, value } = updatePostValidateSchema.validate(req.body);

    if (!error) {
      const existingBlogPost = await Post.findById(postId);
      if (!existingBlogPost) {
        return res.status(404).json({
          warning: "Post not found",
          success: false,
        });
      }
      const updatedSlug = generateSlug(value.title);
      console.log(updatedSlug);
      existingBlogPost.title = value.title || existingBlogPost.title;
      existingBlogPost.content = value.content || existingBlogPost.content;
      existingBlogPost.category = value.category || existingBlogPost.category;
      existingBlogPost.imagesOrMedia =
        value.imagesOrMedia || existingBlogPost.imagesOrMedia;
      existingBlogPost.status = value.status || existingBlogPost.status;
      existingBlogPost.slug = updatedSlug || existingBlogPost.slug;
      const updatedBlogPost = await existingBlogPost.save();
      console.log(updatedBlogPost);
      return res.status(200).send(updatedBlogPost);
    } else {
      return res.status(400).json({ error: error.details[0].message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const postId = req.params.postid;
    const existingBlogPost = await Post.findOneAndDelete(postId);

    if (!existingBlogPost) {
      return res.status(404).json({
        warning: "Post not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const toggleFeatureStatus = async (req, res) => {
  try {
    const postId = req.params.postid;
    const existingBlogPost = await Post.findById(postId);

    if (!existingBlogPost) {
      return res.status(404).json({
        warning: "Post not found",
        success: false,
      });
    }

    // Toggle the isFeatures status
    existingBlogPost.isFeatures =
      existingBlogPost.isFeatures === "featured" ? "notfeatured" : "featured";

    const updatedBlogPost = await existingBlogPost.save();
    return res.status(200).json(updatedBlogPost);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const toggleUserLikes = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    console.log(postId, userId);
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({
        warning: "Post not found",
        success: false,
      });
    }

    const userIndex = existingPost.likesOrReactions.indexOf(userId); //check gareko yaade user ko id chai likeorreaction array ma xa ki nai vnaera
    if (userIndex === -1) {
      existingPost.likesOrReactions.push(userId);
    } else {
      existingPost.likesOrReactions.splice(userIndex, 1);
    }

    const updatePost = await existingPost.save();
    console.log(updatePost);
    return res.status(200).json(updatePost);
  } catch (error) {
    console.error(error);
  }
};

export const addFavouritePost = async (req, res) => {
  const { postId, userId } = req.params;
  try {
    if (!userId) {
      return res
        .status(400)
        .send({ warning: "You need to login before adding into favourite" });
    }

    const removePostIfExisting = await Favouritepost.findOneAndUpdate(
      { user: userId, post: postId },
      { $pull: { post: postId } },
      { new: true }
    );
    console.log(removePostIfExisting);
    if (removePostIfExisting) {
      return res.status(200).json({
        message: "Post has been unfavourite",
        favouritepost: removePostIfExisting,
      });
    }
    const existinguser = await Favouritepost.findOneAndUpdate(
      { user: userId },
      { $push: { post: postId } },
      { new: true }
    );

    if (!existinguser) {
      const addfavouriteinfo = new Favouritepost({
        user: userId,
        post: postId,
      });
      const createfavourite = await Favouritepost.create(addfavouriteinfo);
      console.log(createfavourite._id.toString());
      return res.status(200).send(createfavourite);
    }
    return res.status(200).json({
      message: "Post has been added to favourite",
      favouritepost: existinguser,
    });
  } catch (error) {
    console.error(error);
  }
};
