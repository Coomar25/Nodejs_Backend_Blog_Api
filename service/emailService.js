import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      user: "nodejs",
      pass: "nrkl ozug ekaw bdib",
    },
})


async function main() {
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', 
      to: "kumarbhetwal26@gmail.com", 
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);

  }
  
  main().catch(console.error);