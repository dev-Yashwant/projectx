import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors());


//import routers

import userRouter from "./routes/user.routes.js";
// import storeRouter from './routes/store.routes.js';
// import { generalRateLimit } from './Services/ratelimit.js';


//routes declaration

app.use('/user', userRouter);

// app.use('/store', storeRouter);




export { app }