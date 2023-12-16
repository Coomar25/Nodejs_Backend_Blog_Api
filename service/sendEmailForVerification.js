import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";


const sendEmailForVerification = async (username, email, appurl) => {
    const templatePath = "./views/validateEmail.ejs";
    const templateContent = fs.readFileSync(templatePath, "utf8");

    const renderedTemplate = await ejs.render(templateContent, {
      username: username,
      email: email,
      app_url: process.env.APP_URL,
      validateEmailLink: process.env.USEREMAIL_VALIDATION, // Replace with your link
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
    // await sendEmailValidation();
    sendEmailValidation().catch(console.error);
}

export default sendEmailForVerification
