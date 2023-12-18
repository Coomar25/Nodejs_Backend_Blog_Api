import mongoose from "mongoose";
// Declare the Schema of the Mongo model
const commentSchema = new mongoose.Schema({
    comment: {
        type: [String]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
});


export default mongoose.model('Comment', commentSchema);
