import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import axios from "axios";
import { ETHEREUM_PRICE_URL } from "../constants.js";
import { EthereumPrice } from "../models/ethereumPrice.model.js";

const ethereumPrice = asyncHandler(async (_, res) => {
  try {
  
    const response = await axios.get(ETHEREUM_PRICE_URL);
    // console.log('API Response:', response.data);
    if (!response.data || !response.data.ethereum || typeof response.data.ethereum.inr === 'undefined') {
      throw new Error('Invalid response structure from the API');
    }
    const priceInInr = response.data.ethereum.inr;
    const currentEthereumPrice = {
      timestamp: new Date(),
      price: priceInInr
    };
    await EthereumPrice.updateOne(
      {},
      { $push: { ethereumPrice: currentEthereumPrice } },
      { upsert: true }
    );
    res.status(200).json({
      message: 'Ethereum price updated successfully',
      data: currentEthereumPrice
    });
    
  } catch (error) {
 
    console.error("Error fetching or saving Ethereum price:", error);
    throw new ApiError(500,"Error in the server")
  }
});

export default ethereumPrice;
