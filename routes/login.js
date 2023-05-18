import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


const loginRoute = express.Router();
loginRoute.post('/', async (req, res) => {
    const { email, password } = req.body;
  

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send(`${email} is not registered`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ foo: user.email }, process.env.MY_SECRET_KEY);
      return res.status(200).send({
        message: "User logged in successfully",
        token: token
      });
    } else {
      return res.status(400).send("Incorrect password");
    }
  } catch (error) {
    console.log("Error occurred during login", error);
    return res.status(500).send("Internal server error");
  }
});


export { loginRoute };