import express from "express";
import {Signup,Login,Logout,Updateprofile} from '../controllers/auth.controller.js';
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/signup', Signup);

router.post('/login',Login);

router.post('/logout',Logout);

router.put('/update-profile',authenticateToken, Updateprofile);

router.get('/check', authenticateToken, (req, res) => {
    res.status(200).json({ message: "Access granted to protected route", user: req.user });
});

export default router;