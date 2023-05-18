
import express from 'express';

import User from "../models/user.js";
import bcrypt from "bcrypt";
const passwordResetRoute = express.Router();


passwordResetRoute.post('/', async (req, res) => {
    const { token, password } = req.body;


    try {
        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        const user = await User.findOne({ secretCode });

        if (!user) {
            return res.status(400).send("User does not exist");
        }

        await User.findOneAndUpdate(
            { secretCode },
            { password: hashedNewPassword, secretCode: "" }
        );

        return res.send("Password reset successful");
    } catch (error) {
        console.log("Error occurred during password reset", error);
        return res.status(500).send("Internal server error");
    }
});

export { passwordResetRoute };