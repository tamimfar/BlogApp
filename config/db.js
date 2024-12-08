import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();


 const dbconnection = async() => {
    try {
        await mongoose.connect(process.env.URl);
        console.log('mongodb is runing...');
        
    } catch (error) {
        console.log(error);
        
    }
}
export default dbconnection