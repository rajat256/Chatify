import express from 'express';
import dotenv from 'dotenv';
import authRouter from '../router/auth.route.js';
import messageRouter from '../router/auth.message.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});