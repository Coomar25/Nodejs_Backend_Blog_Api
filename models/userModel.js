import mongoose from "mongoose";


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
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]$/,
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
        set(value) {
          return bcryptjs.hash(value, 10);
        },
      },
      image: {
        type: String,
      },
});

//Export the model
export default mongoose.model('User', userSchema);