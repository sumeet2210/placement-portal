import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import bodyParser from "body-parser";
const app = express();
// study about cors
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials:true,
}))
app.use(express.json({limit:"256kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(bodyParser.json({ limit: "256kb" }));
import authRoutes from "./routes/auth.routes.js";
app.use("/api/v1", authRoutes);
export { app };
