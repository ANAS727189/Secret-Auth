import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const database_url = process.env.DATABASE_URL;

const connection = () => {
    mongoose.connect(database_url)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err))
}

export default connection;