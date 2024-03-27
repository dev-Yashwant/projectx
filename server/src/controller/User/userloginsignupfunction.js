import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { asyncHandler } from "../../middleware/asyncHandler.js";
import {ApiError} from "../../middleware/ApiError.js";
import { ApiResponse } from "../../middleware/ApiResponse.js";
import { UserDetailsmodel } from "../../models/userloginsignupmodels.js";


dotenv.config();

const signupUser = asyncHandler(async (req,res) => {



    const hashedpassword = await bcrypt.hash(req.body.password,10)

    const userSignupDetails = {
        username: req.body.username,
        email: req.body.email,
        password: hashedpassword,
        storeStatus: "notexists",
        storeID: "",
        userBalance: 0
        };
    
    const newUser =  UserDetailsmodel(userSignupDetails);
    await newUser.save();

    return res.status(201).json(
        new ApiResponse(200, {}, "User registered Successfully")
    );
})
    

const loginUser = asyncHandler(async (req,res) => {
    console.log(req.body)

    let user = await UserDetailsmodel.findOne({ email: req.body.email });

    if (!user) {
        throw new ApiError(400, "Invalid credentials");}

    const ismatch = await bcrypt.compare(req.body.password,user.password);

    const UserData = {
        email: user.email,
        username: user.username
    }

    const jwtToken = jwt.sign(

        UserData,
    
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    if(ismatch){
        return res.status(200).cookie("accessToken", jwtToken, options).json(
            new ApiResponse(200, UserData, "Login Successfull")
        );

    }else{
        throw new ApiError(400, "Invalid credentials")

    }
    
  })
  

const logoutUser = asyncHandler(async (req ,res) => {
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})


const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {email :req.user.email,
        username : req.user.username},
        "User fetched successfully"
    ))
})



export {
    signupUser,
    loginUser,
    logoutUser,
    getCurrentUser
}
