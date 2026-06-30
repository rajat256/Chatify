import User from '../models/UserSchema.js';

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
