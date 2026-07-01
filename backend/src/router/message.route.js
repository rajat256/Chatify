import express from 'express';
import mongoose from 'mongoose';
import { getAllContacts, getMessageByUserId, sendMessage, getChatsPartner } from '../controllers/message.controller.js';
import { authenticateToken } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router = express.Router();

const validateObjectIdParam = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    next();
};

// the middlewares execute in order - so requests get rate-limited first, then authenticated.
// this is actually more efficient since unauthenticated requests get blocked by rate limiting
// before hitting the auth middleware

router.use(arcjetProtection, authenticateToken); // Apply authentication middleware to all routes

router.get('/contacts', getAllContacts);
router.get('/chats', getChatsPartner);
router.get('/:id', getMessageByUserId);
router.post('/send/:id', sendMessage);

export default router;
