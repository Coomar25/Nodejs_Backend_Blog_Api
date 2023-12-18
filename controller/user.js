import createuserValidateSchema from "../utils/createuserValidateSchema.js";
import sendEmailForVerification from "../service/sendEmailForVerification.js";
import User from "../models/userModel.js";
import { createJwtToken } from "../config/generateJwtToken.js";

export const createUser = async (req, res) => {
  try {
    const { error, value } = createuserValidateSchema.validate(req.body);
    if (!error) {
      // console.log(value);
      const email = value.email;
      const existinguser = await User.findOne({ email: email });
      if (existinguser) {
        return res.status(409).json({
          warning: "User already exists",
          success: false,
        });
      }

      const usersInfo = new User({
        username: value.username,
        email: value.email,
        password: value.password,
        image: value.image,
      });
      // send mail before checking if the existing user exists or not
      const newUser = await User.create(usersInfo);
      const userUniqueId = newUser._id;
      sendEmailForVerification(value.username, value.email, userUniqueId);
      return res.status(201).json({
        message:
          "Mail Has Been send successfully. Please Verified your account! ",
        success: true,
      });
    } else {
      // yo chai validation error message hoo hai
      console.log("Validation error message =", error.details[0].message);
      return res.status(501).send(error.details[0].message);
    }
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.username === 1
    ) {
      // Duplicate key error for the username field
      return res.status(400).json({
        message: "User with this username already exists",
        success: false,
      });
    } else {
      return res.status(500).json({
        message: "Error creating user",
        error: error.message,
        success: false,
      });
    }
  }
};

export const verifyUserThroughMail = async (req, res) => {
  const id = req.params.id;
  console.log("id got :", id);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { verified: "verified" },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.send(
      "Email verification link clicked. User verified successfully."
    );
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser || !(await findUser.isPasswordMatched(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({
    _id: findUser?._id,
    username: findUser?.username,
    email: findUser?.email,
    token: createJwtToken(findUser?._id),
  });
};
