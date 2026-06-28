import express from "express";
import {Signup,Login,Logout,Updateprofile} from '../controllers/auth.controller.js';
import { authenticateToken } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.get('/test', arcjetProtection, (req, res) => {
    res.status(200).json({ message: "Arcjet protection test passed. You are not a bot!" });
});

router.post('/signup', arcjetProtection, Signup);

router.post('/login', arcjetProtection, Login);

router.post('/logout', arcjetProtection, Logout);

router.put('/update-profile',authenticateToken, Updateprofile);

router.get('/check', authenticateToken, (req, res) => {
    res.status(200).json({ message: "Access granted to protected route", user: req.user });
});

export default router;