import { Router } from "express";
const router = Router();
import totalCost from "../controllers/cost.controller.js";

router.route("/total-cost").get(totalCost)

export default router;