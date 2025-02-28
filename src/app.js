import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { v2 as cloudinary } from 'cloudinary';
// import "./utils/cron.js"; // auto delete data event jika data lebih dari 3 hari
import cors from 'cors';

dotenv.config();

const app = express()
const port = 3000

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const allowedOrigins = process.env.NODE_ENV == "production" 
  ? ["https://express-be.prod.app.techbuddies.id", "https://techbuddies.id"]
  : ["https://express-be.dev.app.techbuddies.id", "http://localhost:5173", "https://dev.app.techbuddies.id"];


// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS tidak diizinkan untuk domain ini!"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true // Jika menggunakan cookies atau session
  }));
app.use(ExpressMongoSanitize())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

import authRouter from './routes/authRouter.js';
import eventRouter from './routes/eventRouter.js';
import programRouter from './routes/programRouter.js';
import jobRouter from './routes/jobRouter.js';

// Parent router
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/event', eventRouter);
app.use('/api/v1/program', programRouter);
app.use('/api/v1/job', jobRouter);

app.use(notFound);
app.use(errorHandler);

// Server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Connection DB
mongoose.connect(process.env.DATABASE, {}).then(() => {
    console.log('Database Connect')
}).catch((err) => {
    console.log(`Connection failed! ::: ${err}`)
})