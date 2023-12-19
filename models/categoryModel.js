import mongoose from "mongoose";
import User from './userModel.js'
// Declare the Schema of the Mongo model
const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
});


export default mongoose.model('Category', categorySchema);
