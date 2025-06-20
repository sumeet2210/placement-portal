import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"

const app = express();
// study about cors
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials:true,
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"256kb"}));
app.use(express.static("public"))
app.use(cookieparser());




export { app };
