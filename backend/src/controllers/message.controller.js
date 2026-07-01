import User from '../models/UserSchema.js';
import Message from '../models/message.js';
import cloudinary from '../lib/cloudinary.js';

export const getAllContacts = async (req,res)=>{
    try{
         const loggedInUserId = req.user._id;
         const filterUsers = await User.find({_id:{$ne:loggedInUserId}}).select('-password');
         res.status(200).json({users:filterUsers});
    }
    catch(err){
        console.error('Error fetching contacts:', err);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getMessageByUserId = async (req,res)=>{
    try{
        const myId = req.user._id;
        const {id} = req.params;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId:id},
                {senderId: id, receiverId:myId}
            ]
        });

        res.status(200).json({messages});

    }
    catch(err){
        console.error('Error fetching messages:', err);
        res.status(500).json({message:"Internal server error"});
    }
}

export const sendMessage = async (req,res)=>{
    try{
      const {text,image} = req.body;
      const {id:receiverId} = req.params;
      const senderId = req.user._id;

      let imgURL;
      if(image){
        // upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imgURL = uploadResponse.secure_url;
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imgURL
      });
      await newMessage.save();

      // todo : emit the message to the receiver using socket.io
      res.status(201).json({newMessage});
    }
    catch(err){
        console.error('Error sending message:',err);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getChatsPartner = async (req,res)=>{
    try{
         const loggedInUserId = req.user._id;
         
         // find all the messages where the logged-in user is either the sender or receiver
         const messages = await Message.find({
            $or:[{senderId: loggedInUserId},
                {receiverId: loggedInUserId}
            ]
         })

         const chatPartnersIds = [...new Set(messages.map(msg=>
            msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
         )
         )]

         const chatPartners = await User.find({_id:{$in:chatPartnersIds}}).select('-password');
         res.status(200).json({chatPartners});
    }
    catch(err){
        console.error('Error fetching chat partners:', err);
        res.status(500).json({message:"Internal server error"});
    }
}
