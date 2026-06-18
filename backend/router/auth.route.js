import express from "express";

const router = express.Router();

router.get('/login',(req,res)=>{
    res.send('Login');
})

router.get('/singup',(req,res)=>{
    res.send('singup');
})

router.get('/logout',(req,res)=>{
    res.send('Logout');
})

export default router;