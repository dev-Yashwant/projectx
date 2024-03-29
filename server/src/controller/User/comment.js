import { asyncHandler } from "../../middleware/asyncHandler.js";
import {ApiError} from "../../middleware/ApiError.js";
import { ApiResponse } from "../../middleware/ApiResponse.js";
import { commentmodel } from "../../models/commentmodel.js";


const writecomment = asyncHandler(async (req, res) => {
    console.log(req.body);

    const comment = {
        writer: req.user.username,
        comment: req.body.comment,
    }

    // Check if the Instagram user exists
    const existingComment = await commentmodel.findOne({ usernameInstagram: req.body.usernameInstagram });

    if (!existingComment) {
        // If the Instagram user doesn't exist, create a new comment entry
        const updatedProduct = await commentmodel.findOneAndUpdate(
            { usernameinstagram: req.body.usernameinstagram},
            { $push: { comments: comment } },
            { new: true, upsert: true }
        );
        return res.status(201).json(
            new ApiResponse(200, {}, "Commented successfully")
        );
    } else {
        // Check if the writer has already commented for this Instagram user
        const writerIndex = existingComment.comments.findIndex(c => c.writer === req.user.username);
        if (writerIndex === -1) {
            // If the writer hasn't commented, update the comment
            const updatedProduct = await commentmodel.findOneAndUpdate(
                { usernameInstagram: req.body.usernameInstagram },
                { $push: { comments: comment } },
                { new: true }
            );
            return res.status(201).json(
                new ApiResponse(200, {}, "Commented successfully")
            );
        } else {
            // If the writer has already commented, update the comment
            existingComment.comments[writerIndex].comment = req.body.comment;
            await existingComment.save();
            return res.status(201).json(
                new ApiResponse(200, {}, "Comment updated successfully")
            );
        }
    }
});




const getcomment = asyncHandler(async (req,res) => {

    const comments = await commentmodel.find({ usernameinstagram: req.body.usernameinstagram });
    console.log(comments);

    if (comments.length===0) {
        throw new ApiError(400, "No comments found");
    }


    return res.status(201).json(
        new ApiResponse(200, {comments}, "Comments fetched successfully")
    );
})


   



export {
    writecomment,
    getcomment
}
