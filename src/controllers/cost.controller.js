import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import axios from "axios";
import { ETHERSCAN_BASE_URL } from "../constants.js";
import { ETHEREUM_PRICE_URL } from "../constants.js";

const totalCost = asyncHandler(async (req, res) => {
    const { address } = req.body;
    if (!address) {
        throw new ApiError(400, "Address is required");
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

        // Fetch transactions from Etherscan
        const response = await axios.get(ETHERSCAN_BASE_URL, { params });
        const transactions = response.data.result;

        if (!Array.isArray(transactions)) {
            throw new ApiError(500, "Unexpected response format from Etherscan");
        }

        const totalCost = transactions.reduce((acc, tx) => {
            const gasUsed = parseInt(tx.gasUsed, 10);
            const gasPrice = parseInt(tx.gasPrice, 10);
            return acc + (gasUsed * gasPrice) / 1e18;
        }, 0);

        const ether = await axios.get(ETHEREUM_PRICE_URL);
        const currentEther = ether.data.ethereum.inr;


        return res.status(200).json(new ApiResponse(200, `totalEther:${currentEther}, totalCost:${totalCost}`, "Total expense calculated successfully"));

    } catch (error) {
       
        if (error.response) {
            throw new ApiError(error.response.status, error.response.data.message || "Error fetching data from Etherscan");
        } else if (error.request) {
            throw new ApiError(500, "No response from Etherscan");
        } else {
            throw new ApiError(500, "Internal server error");
        }
    }
});

export default totalCost;
