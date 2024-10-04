import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: String,
    hash: String,
    isAdmin: Boolean,
    email: String,
})

 const UserDetails = mongoose.model("UserDetails", userSchema);

export default UserDetails;
