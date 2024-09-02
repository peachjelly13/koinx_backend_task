import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js"; // Make sure to handle errors appropriately
import axios from "axios";
import { ETHEREUM_PRICE_URL } from "../constants.js";
import { EthereumPrice } from "../models/ethereumPrice.model.js"; // Ensure this is needed

const ethereumPrice = asyncHandler(async (_, res) => {
  try {
    
    const response = await axios.get(ETHEREUM_PRICE_URL);
    const priceInInr = response.data.ethereum.inr;
    const currentEthereumPrice = {
        priceInInr
    }
    await EthereumPrice.updateOne(
        {},
        { $push: { ethereumPrice: currentEthereumPrice} },
        { upsert: true } 
    );

    return res.status(200).json(new ApiResponse(200, { priceInInr }, "This is the Ethereum price in INR"));
  } catch (error) {
    
    console.error("Error fetching Ethereum price:", error);
    return res.status(500).json(new ApiError(500, "Failed to fetch Ethereum price"));
  }
});

export default ethereumPrice;
