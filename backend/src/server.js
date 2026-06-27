import express from 'express';
import dotenv from 'dotenv';
import authRouter from './router/auth.route.js';
import messageRouter from './router/auth.message.js';
import connectDB from './db/db.js';
import path from 'path';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
connectDB();
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);



// Make ready for deployment

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    
    app.get('/{*path}', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
    });

}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});