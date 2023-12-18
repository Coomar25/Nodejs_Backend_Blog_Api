import Post from "../models/postModel.js"
import createPostValidateSchema from "../utils/createpostValidateSchema.js"


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
    try{
        const {error, value} = createPostValidateSchema.validate(req.body);
        if(!error){
            const title = value.title;
            const slug = generateSlug(title);
            const existingBlogPost = await Post.findOne({ slug: slug});
            if(existingBlogPost){
                return res.status(409).json({
                    warning: "Post with that name already exist",
                    success: false
                });
            }
            const blogPostInfo = new Post({
                title: value.title,
                slug: slug,
                content: value.content,
                author: value.author,
                publicationDate: value.publicationDate,
                imagesOrMedia: value.imagesOrMedia,
                status: value.status

            });

            const createblogpost = await Post.create(blogPostInfo);
            console.log(createblogpost);
        }
    }catch(error){
        console.log(error);

        return res.status(400).send(error);
    }
}