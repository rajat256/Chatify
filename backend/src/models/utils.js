import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId, res) => {
    const { JWT_SECRET_KEY } = process.env;
    if (!JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }
    const jwtToken = jwt.sign(
        { userId: userId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
    )

    res.cookie("token", jwtToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "development" ? false : true, // Set to true in production 
    });

    return jwtToken;
}