import { asyncHandler } from "../../middleware/asyncHandler.js";
import {ApiError} from "../../middleware/ApiError.js";
import { ApiResponse } from "../../middleware/ApiResponse.js";


const writecomment = asyncHandler(async (req,res) => {



    

    return res.status(201).json(
        new ApiResponse(200, {}, "User registered Successfully")
    );
})

const getcomment = asyncHandler(async (req,res) => {



    

    return res.status(201).json(
        new ApiResponse(200, {}, "User registered Successfully")
    );
})

export {
    writecomment,
    getcomment
}
