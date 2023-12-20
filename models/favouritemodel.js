import mongoose from "mongoose";

const favouritepostSchema =  new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

export default mongoose.model('Favouritepost', favouritepostSchema);
