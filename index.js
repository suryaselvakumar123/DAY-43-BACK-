import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { loginRoute } from './routes/login.js';
import { signupRoute } from './routes/signup.js';
import { forgotPasswordRoute } from './routes/forgotPassword.js';
import { passwordResetRoute } from './routes/passwordReset.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connecting to MongoDB
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB');
    console.error(err);
    process.exit(1);
  });

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the login page');
});

// Setting routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/forgotPassword', forgotPasswordRoute);
app.use('/passwordReset', passwordResetRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
