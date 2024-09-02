import { Router } from "express";
import userTransactions from "../controllers/user.controller.js"
const router = Router();


router.route("/transactions").get(userTransactions)

export default router;