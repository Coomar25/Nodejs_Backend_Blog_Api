import mongoose from "mongoose";
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
        type: Date,
        required: true,
    },
    tagsOrCategories: {
        type: [String],
    },
    comments: {
        type: [String], 
    },
    likesOrReactions: {
        type: Number,
        default: 0, 
    },
    isFeatures: {
        type: String,
        default: "notfeatured"
    },
    views: {
        type:Number
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
        enum: ['published', 'draft', 'archived'],
        default: 'draft', 
    },
});

// Export the model
// module.exports = mongoose.model('Post', postSchema); //work for common js only

export default mongoose.model('Post', postSchema);
