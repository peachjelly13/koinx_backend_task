import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Transactions } from '../models/transactions.model.js'

const userSchema = new Schema({
    address: {
        type: String,
        required: true,
        unique: true
    },
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Transactions'
        }
    ]
}, { timestamps: true }); // Corrected option for timestamps

export const User = mongoose.model('User', userSchema);
