import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
},{timestamps:true});

const User = mongoose.model("User",UserSchema);

export default User;