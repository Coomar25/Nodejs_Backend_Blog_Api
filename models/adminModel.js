import mongoose from "mongoose";
import bcrypt from "bcrypt";

var adminSchema = new mongoose.Schema({
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
  admintype: {
    type: String,
    default: "admin",
  },
});

// Yo code chai password lai encrypt garna lai
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// password match vaxa ki nai vanera check garna
adminSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Export the model
export default mongoose.model("Admin", adminSchema);
