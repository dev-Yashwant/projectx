import mongoose from "mongoose";
import { userConnection } from "../db/connections.js";



const commentSchema =new mongoose.Schema({
  usernameinstagram: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true
  },
  comments: [
    {
      writer: {
        type: String,
        required: true,
        unique: true,
      },
      comment: {
        type: String,
        required: true
      }
    }
  
  ]
});



const commentmodel = userConnection.model("commentDb", commentSchema);

export { commentmodel };