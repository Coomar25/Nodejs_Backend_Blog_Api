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

        let existingComment = await Comment.findOneAndUpdate(
            {postId: postId, userId:userId},
            {$push: {comment: comment}},
            {new:true}
        )
        if(!existingComment){
            const comments= new Comment({
                comment: comment,
                postId:postId,
                userId:userId
            });
        const createComment = await Comment.create(comments);
                // now adding that comment id to dedicated post 
        const existingBlogPost = await Post.findById(postId);
        if(!existingBlogPost){
            return res.status(404).json({
                warning: "post not found",
                success:false
            });
        }
        const commentid = createComment._id.toString();
        
        existingBlogPost.commentId = commentid;
        const updatePostWithCommentId = await existingBlogPost.save();
        console.log(updatePostWithCommentId);
        return res.status(200).send({comment: comments});
        }


        return res.status(200).json({
            message: "comment has been added",
            success: true
        });

    
     
    
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
 
}