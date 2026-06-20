import express from "express";
import {Signup} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', Signup);

router.post('/login',(req,res)=>{
    res.send('Login');
})

router.post('/logout',(req,res)=>{
    res.send('Logout');
})

export default router;