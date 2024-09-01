import {mongoose} from "mongoose";
import { Schema } from "mongoose";


const transactionSchema = new Schema({
    blockNumber:{
        required:true,
        type:String
    },
    timeStamp:{
        required:true,
        type:String
    },
    hash:{
        required:true,
        type:String
    },
    nonce:{
        required:true,
        type:String
    },
    transactionIndex:{
        required:true,
        type:String
    },
    from:{
        required:true,
        type:String
    },
    to:{
        required:true,
        type:String
    },
    value:{
        required:true,
        type:String
    },
    gas:{
        required:true,
        type:String
    },
    gasPrice:{
        required:true,
        type:String
    },
    isError:{
        required:true,
        type:String
    },
    txreceipt_status:{
        required:true,
        type:String
    },
    input:{
        required:true,
        type:String
    },
    contractAddress:{
        required:true,
        type:String
    },
    cumulativeGasUsed:{
        required:true,
        type:String
        
    },
    gasUsed:{
        required:true,
        type:String
    },
    confirmations:{
        required:true,
        type:String
    },
    methodId:{
        required:true,
        type:String
    },
    functionName:{
        required:true,
        type:String
    }
},{timestamps:true});

export const Transactions = mongoose.model("Transactions",transactionSchema)
