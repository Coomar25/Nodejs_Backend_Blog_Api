import User from "../models/userModel.js";
import joi from "joi";
import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import path from "path";

export const createUser = async (req, res) => {
  const schema = joi.object({
    username: joi.string().required().min(3).max(20),
    email: joi
      .string()
      .email()
      .required()
      .custom((value, helpers) => {
        if (!value.includes("@gmail.com")) {
          return helpers.message("Email domain must be gmail.com");
        }
        return value;
      }),
    password: joi.string().required().min(8),
    confirmpassword: joi
      .string()
      .required()
      .valid(joi.ref("password"))
      .messages({ "any.only": "Passwords must match" }),
    image: joi.string().optional(),
  });

  try {
    const { error, value } = schema.validate(req.body);
    if (!error) {
        console.log(value);
        sendEmailForVerification(value.username, value.email);

    }
    console.log(error.details[0].message);
  } catch (error) {}
};



const sendEmailForVerification = async (username, email) => {
    const templatePath = "./views/validateEmail.ejs";
    const templateContent = fs.readFileSync(templatePath, "utf8");

    const renderedTemplate = await ejs.render(templateContent, {
      username: username,
      email: email,
      validateEmailLink: "https://example.com/validate", // Replace with your link
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "kumarbhetwal26@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    async function sendEmailValidation() {
      const info = await transporter.sendMail({
        from: "kumarbhetwal26@gmail.com",
        to: "kumarbhetwal25@gmail.com",
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: renderedTemplate, // html body
      });
      console.log("Message sent: %s", info.messageId);
    }
    await sendEmailValidation();
    sendEmailValidation().catch(console.error);
}
