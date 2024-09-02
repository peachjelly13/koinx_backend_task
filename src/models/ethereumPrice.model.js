import mongoose from "mongoose";
import { Schema } from "mongoose";

const priceEntry = new Schema({
    timestamp:{
        type:Date,
        default:Date.now
    },
    price:{
        required:true,
        type:Number
    }
});

const ethereumPrice = new Schema({
    ethereumPrice: [{priceEntry}]
})

export const EthereumPrice = mongoose.model("EthereumPrice",ethereumPrice);