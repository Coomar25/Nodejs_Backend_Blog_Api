import Comment from "../models/commentModel.js"
import Post from "../models/postModel.js"

export const addCommentToPost = async ( req, res) => {
    const {postId, userId} = req.params;
    const {comment} = req.body;
    console.log(postId, userId, comment);

    try{
        const existingPost = await Post.findById(postId);
        if (!existingPost) {
          return res.status(404).json({
            warning: "Post not found",
            success: false,
          });
        }
    
        const comments= new Comment({
            comment: comment,
            postId:postId,
            userId:userId
        });
        const createComment = await Comment.create(comments);
        //console.log(createComment._id.toString());  // Convert ObjectId to string
        // now adding that comment id to dedicated post 
        const existingBlogPost = await Post.findById(postId);
        if(!existingBlogPost){
            return res.status(404).json({
                warning: "post not found",
                success:false
            });
        }
        const commentid = createComment._id.toString()
        existingBlogPost.commentId = commentid;
        const updatePostWithCommentId = await existingBlogPost.save();
        console.log(updatePostWithCommentId);
        return res.status(200).send({comment: comments});
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
 
}