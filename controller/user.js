import createuserValidateSchema from "../utils/createuserValidateSchema.js";
import sendEmailForVerification from "../service/sendEmailForVerification.js";
import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"



export const createUser = async (req, res) => {
  try {
    const { error, value } = createuserValidateSchema.validate(req.body);
    if (!error) {
        // console.log(value);
        const email = value.email;
        const existinguser = await User.findOne({email: email});
        if(existinguser){
            return res.status(409).json({
                message:"User already exists",
                success: false,
            });
        }

      const hashedPassword = await bcryptjs.hash(value.password, 10);
      console.log(hashedPassword);
      const usersInfo = new User({
        username: value.username,
        email: value.email,
        password: hashedPassword, 
        image: value.image,
      }); 
        // send mail before checking if the existing user exists or not
        sendEmailForVerification(value.username, value.email);
        const newUser = await User.create(usersInfo);
        return res.status(201).json({
            message: "Mail Has Been send successfully. Please Verified your account! ",
            success:true,
        });
    }else{
        // yo chai validation error message hoo hai
        console.log(error.details[0].message);
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username === 1) {
        // Duplicate key error for the username field
        return res.status(400).json({
            message: "User with this username already exists",
            success: false,
        });
    } else {
        return res.status(500).json({
            message: "Error creating user",
            error: error.message, // Optionally send the specific error message for debugging
            success: false,
        });
    }
  }
};


export const verifyUserThroughMail = async (req, res) => {
    const email = req.params.email; 
    console.log("Email clicked:", email);
    res.send('Email verification link clicked');
};


