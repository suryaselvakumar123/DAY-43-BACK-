import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import User from "../models/user.js";
import bcrypt from "bcrypt";
const passwordResetRoute = express.Router();

passwordResetRoute.post('/', async (req, res) => {
    const { token, password } = req.body;

    try {
        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await bcrypt.hash(password, salt);

        const user = await User.findOne({ secretCode: token });

        if (!user) {
            return res.status(400).send("User does not exist");
        }

        await User.findOneAndUpdate(
            { secretCode: token },
            { password: hashedNewPassword, secretCode: "" }
        );

        return res.send("Password reset successful");
    } catch (error) {
        console.log("Error occurred during password reset", error);
        return res.status(500).send("Internal server error");
    }
});

export { passwordResetRoute };
