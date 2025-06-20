import {app} from "./app.js"
import dotenv from "dotenv";
import connect from "./config/index.js";
dotenv.config({
    path:'./.env'
})
connect()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at : ${process.env.PORT}`)
    })
    
})
.catch((err)=>{
   console.log("MONGO DB connection failed !! :", err);
})
