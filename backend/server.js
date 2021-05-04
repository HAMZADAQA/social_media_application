import express from 'express';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import conversationRoutes from './routes/conversations.js';
import messageRoutes from './routes/messages.js';
import cors from 'cors';
import multer from 'multer'
import path from 'path'

dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());
app.use(cors())
app.use(helmet());
// app.use(morgan("common"));


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes)
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

const __direname = path.resolve();
app.use("/images", express.static(path.join(__direname, "public/images")))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully.")
    } catch (error) {
        console.log(error)
    }
})

const port = process.env.PORT || 5000

app.listen(port, () => (
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port: ${port}`.yellow.bold)
))



