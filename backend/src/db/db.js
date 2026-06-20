import mongoose from 'mongoose';

const connectDB = async ()=>{
    try{
        const {MONGO_URI} = process.env;
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected...');
    }
    catch(err){
        console.error("Error message:",err.message);
        process.exit(1);
    }
}

export default connectDB;