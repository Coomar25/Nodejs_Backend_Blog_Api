import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
      },
      image: {
        type: String,
      },
      verified: {
        type: String,
        default: 'notverified', // Set the default value here
      },
});

//Export the model
export default mongoose.model('User', userSchema);