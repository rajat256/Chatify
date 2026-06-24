import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../models/utils.js";
import { sendWelcomeEmail } from "../emails/emailhandlers.js";
import "dotenv/config";


const Signup = async (req, res) => {
    try {

        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }

        const isEmailExists = await User.findOne({ email });

        if (isEmailExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // A salt is a random string added to the password before hashing.
        const salt = await bcrypt.genSalt(12);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullname: fullname,
            email: email,
            password: hashedPassword,
            profilePicture: "",
        });


        if (newUser) {
          const jwtToken = generateToken(newUser._id, res);

            res.status(201).json({
                message: "User created successfully",
                token: jwtToken,
                user: {
                    id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email
                }
            });


            try{
                 await sendWelcomeEmail(newUser.email,newUser.fullname,process.env.CLIENT_URL);
            }
            catch(err){
                console.error("Failed to send welcome email:", err);
            }
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}


const Login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message:"User does not exist"});
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        generateToken(user._id,res);

       return res.status(200).json({
            message:"Login successful",
            user:{
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                profilePicture: user.profilePicture
            }
        })
    }
    catch(err){
          return res.status(500).json({message:"Internal server error"});
    }
}

const Logout = (_, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ message: "Logout successful" });
};


export { Signup,Login,Logout }