import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    desc:{
        type:String
    },
    img:{
        type:String
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comments'
    }]
},{timestamps:true})

const postModel = mongoose.model('Post',postSchema)
export default postModel