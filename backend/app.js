import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import bodyParser from "body-parser";
const app = express();
// study about cors
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));
app.use(express.json({limit:"256kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(bodyParser.json({ limit: "256kb" }));
app.use(cookieparser());
import authRoutes from "./routes/auth.routes.js";
app.use("/api/v1", authRoutes);
import studentRoutes from "./routes/student.routes.js";
app.use("/api/v1/student", studentRoutes);
import adminRoutes from "./routes/admin.routes.js";
app.use("/api/v1/admin", adminRoutes);
import companyRoutes from "./routes/company.routes.js";
app.use("/api/v1/company", companyRoutes);
export { app };
