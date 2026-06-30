import express from 'express';
import {getAllContacts} from '../controllers/message.controller.js';
import { authenticateToken } from "../middleware/auth.middleware.js";
const router = express.Router();


router.get('/contacts', authenticateToken, getAllContacts);
// router.get('/chats',getChatsPartner);
// router.get('/:id',getMessageByUserId);
// router.post('/send/id',sendMessage);

router.get('/send',(req,res)=>{
    res.send('Message sent');
})

export default router;