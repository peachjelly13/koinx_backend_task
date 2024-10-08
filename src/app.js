import express from "express"
import './utils/scheduler.js'
const app = express();

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true,limit:"16kb"}))

import router from "./routes/transaction.route.js";
import ethereumrouter from "./routes/ethereumPrice.route.js"
import costRouter from "./routes/cost.route.js"

app.use("/api/v1/users",router);
app.use("/api/v1/price",ethereumrouter);
app.use("/api/v1/cost",costRouter)

export {app}