const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const SendEmailVerify = async (EmailTo, EmailText, EmailSubject) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS_USER,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailOption = {
    from: "Portfolio Management <tanvirahmed1165@gmail.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };
  return await transporter.sendMail(mailOption);
};
module.exports = SendEmailVerify;
