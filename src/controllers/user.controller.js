import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import axios from "axios";
import { ETHERSCAN_BASE_URL } from "../constants.js";
import { Transactions } from "../models/transactions.model.js";

const userTransactions = asyncHandler(async (req, res) => {
    const { address } = req.body;

    if (!address) {
        throw new ApiError(409, "Address is required");
    }

    try {
        const params = {
            module: 'account',
            action: 'txlist',
            address: address,
            startblock: 0,
            endblock: 99999999,
            sort: 'asc',
            apikey: process.env.ETHERSCAN_BASE_API_KEY
        };

        
        const response = await axios.get(ETHERSCAN_BASE_URL, { params });

        if (response.data.status === '1') {
            const transactions = response.data.result;
            const transactionIds = [];

          
            for (const tx of transactions) {
                
                const savedTransaction = await Transactions.findOneAndUpdate(
                    { hash: tx.hash },
                    {
                        blockNumber: tx.blockNumber,
                        timeStamp: tx.timeStamp,
                        hash: tx.hash,
                        nonce: tx.nonce,
                        transactionIndex: tx.transactionIndex,
                        from: tx.from,
                        to: tx.to,
                        value: tx.value,
                        gas: tx.gas,
                        gasPrice: tx.gasPrice,
                        isError: tx.isError,
                        txreceipt_status: tx.txreceipt_status,
                        input: tx.input,
                        contractAddress: tx.contractAddress,
                        cumulativeGasUsed: tx.cumulativeGasUsed,
                        gasUsed: tx.gasUsed,
                        confirmations: tx.confirmations,
                        methodId: tx.methodId || '', 
                        functionName: tx.functionName || '',
                    },
                    { upsert: true, new: true, setDefaultsOnInsert: true }
                );

                transactionIds.push(savedTransaction._id);
            }

          
            const user = await User.findOneAndUpdate(
                { address: address },
                { $set: { address: address }, $addToSet: { transactions: { $each: transactionIds } } },
                { upsert: true, new: true }
            ).populate('transactions'); 

            return res.status(200).json(new ApiResponse(200, user, "These are the user transactions for the following address"));
        } else {
            throw new ApiError(400, response.data.message);
        }
    } catch (error) {
        throw new ApiError(500, "Internal server error");
    }
});

export default userTransactions;
