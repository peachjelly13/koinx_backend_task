import { Router } from "express";
import {userTransactions} from "../controllers/user.controller.js"
const router = Router();


router.get("/transactions/:address").get(userTransactions)

export default router;