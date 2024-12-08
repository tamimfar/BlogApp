import commentModel from "../Models/comment.js"
import postModel from "../Models/post.js"
import { ResponsError, ResponsFrontendError, ResponsSuccess } from "../util/respons.js"

export const AddComment =async(req,res) =>{
    try {
        const {userId,postId,comment} = req.body

        const newComment = new commentModel({
            userId,postId,comment
        })

        await newComment.save()
        const ExistPost = await postModel.findById(postId)
        if(!ExistPost){
            return ResponsFrontendError(res, {
                message: 'post is not found',
                statusCode: 404
            })
        }
        ExistPost.comments.push(newComment._id)
        await ExistPost.save()
        return ResponsSuccess(res, {
            message: ' comment is successfully create...',
            statusCode: 200,
            pelod: {
                 
            }
        })
    } catch (error) {
          console.log(error);
          
        return ResponsError(res, {
            message: 'internal error',
            statusCode: 500,
            success: false,
        })
    }
}