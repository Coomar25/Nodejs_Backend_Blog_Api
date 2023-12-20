import mongoose from "mongoose";
import bcrypt from "bcrypt";


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
      favouriteId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Favouritepost'
    }
});

// Yo code chai password lai encrypt garna lai 
userSchema.pre('save', async function(next){
  if(!this.isModified("password")){
      next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// password match vaxa ki nai vanera check garna
userSchema.methods.isPasswordMatched =  async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}


//Export the model
export default mongoose.model('User', userSchema);