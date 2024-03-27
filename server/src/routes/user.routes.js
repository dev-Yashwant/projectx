import express from 'express';
const userRouter = express.Router();
import multer from 'multer';

const parseMultipartform = multer();



import { signupUser, loginUser ,logoutUser ,getCurrentUser} from "../controller/User/userloginsignupfunction.js";
import { writecomment, getcomment } from "../controller/User/comment.js";
import  Auth from '../middleware/userAuth.js'

userRouter.route('/login').post(parseMultipartform.none() , loginUser)

userRouter.route('/signup').post(parseMultipartform.none(), signupUser)

userRouter.route('/logout').get(Auth , logoutUser)

userRouter.route('/').get(Auth , getCurrentUser)

userRouter.route('/comment').post(Auth ,writecomment )

userRouter.route('/comment').get(Auth ,getcomment )

// userRouter.route("/").post()

export default userRouter;
