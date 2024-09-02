import { Router } from "express";
import ethereumPrice from "../controllers/ethereum.controller.js";
const router = Router();


router.route("/ethereum-price").get(ethereumPrice);

export default router;