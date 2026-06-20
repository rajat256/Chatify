import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../models/utils.js";


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


export { Signup }