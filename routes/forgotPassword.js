import User from "../models/user.js";
import nodemailer from "nodemailer";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


const forgotPasswordRoute = express.Router();

forgotPasswordRoute.post('/', async (req, res) => {
  const { email } = req.body;
  const secretCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send(`${email} is not registered`);
    }

    await User.findOneAndUpdate({ email }, { secretCode });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Password Reset",
      text: "Follow the instructions to reset your password",
      html: `<h3>OTP to reset your password is given below</h3>
        <p>${secretCode}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.send("Mail sent successfully");
  } catch (error) {
    console.log("Error occurred during password reset", error);
    return res.status(500).send("Internal server error");
  }
});

export { forgotPasswordRoute };