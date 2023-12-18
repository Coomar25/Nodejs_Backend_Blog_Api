import Post from "../models/postModel.js";
import createPostValidateSchema from "../utils/createpostValidateSchema.js";

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
      return res.status(201).send(createblogpost);
    } else {
      return res.status(400).json({ error: error.details[0].message });
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
    const post = await Post.findById(postId).populate(
      "user",
      "_id username email image"
    );
    console.log(post);
    res.status(200).send({ post: post });
  } catch (error) {
    console.error(error);
    return null;
  }
};



