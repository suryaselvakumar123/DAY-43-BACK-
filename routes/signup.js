import User from "../models/user.js";
import bcrypt from "bcrypt";
import express from 'express';
const signupRoute = express.Router();

signupRoute.post('/', async (req, res) => {
  const { name, email, password } = req.body;


  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send(`${email} is already registered`);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ name, email, password: hashedPassword });

    return res.status(200).send("User signed up successfully");
  } catch (error) {
    console.log("Error occurred during signup", error);
    return res.status(500).send("Internal server error");
  }
});

export { signupRoute };