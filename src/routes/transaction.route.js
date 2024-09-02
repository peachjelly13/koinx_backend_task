import { Router } from "express";
import userTransactions from "../controllers/userTransaction.controller.js"
const router = Router();


router.route("/transactions").get(userTransactions)

export default router;