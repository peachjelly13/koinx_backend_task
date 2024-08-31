import {mongoose} from "mongoose";
import { Schema } from "mongoose";

const transactionSchema = new Schema({
    address:{
        type:String,
        required:true,
        unique:true
    },
    transactions:{
        type:[String],
        required:true
    }

},{timeStamps:true})    

export const User = mongoose.model("User",transactionSchema)


