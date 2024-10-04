import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
import connection from "./config/database.js";
connection();
import UserDetails from "./models/user-data.js";
import router from "./routes/route.js";


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})