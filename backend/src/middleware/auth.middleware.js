import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/UserSchema.js';

dotenv.config();

export const authenticateToken = async (req,res,next)=>{
    try{
      const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
      if(!token){
        return res.status(401).json({message:"Access denied. No token provided."});
      }

      const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
      if(!decode){
          return res.status(401).json({message:"Access denied. Invalid token."});
      }

      const user = await User.findById(decode.userId).select('-password');
      if(!user){
        return res.status(404).json({message:"User not found."});
      }

      req.user = user;
      next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
}
}
