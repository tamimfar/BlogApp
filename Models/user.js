import mongoose from "mongoose";
 



const UserSchema = new mongoose.Schema({

    name:{
        type:String
    },
    email:{
        type:String
    },
    img:{
        type:String
    },
    password:{
        type:String
    },
    rol:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},{timestamps:true})


const UserModel = mongoose.model('User',UserSchema)

export default UserModel