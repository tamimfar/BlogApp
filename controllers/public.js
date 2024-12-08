import postModel from "../Models/post.js";
import { ResponsError, ResponsFrontendError, ResponsSuccess } from "../util/respons.js"

export const GetSinglePost = async (req, res) => {
    try {
        const postid = req.params.id
        const FindSinglePost = await postModel.findById(postid)
        .populate({
            path:"comments",
            populate:{
                path:"userId"
            }
        })
        
        if(!FindSinglePost){
            return ResponsFrontendError(res, {
                message: 'data is not found',
                statusCode: 404
            })
        }
        return ResponsSuccess(res, {
            message: ' post is successfully  get...',
            statusCode: 200,
            pelod: {
              FindSinglePost

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
export const GetAllPost = async (req, res) => {
    try {
       
        const page = parseInt(req.query.page) || 1
        const perPage = 3
        const totalPost = await postModel.countDocuments()
        const totalPage = Math.ceil(totalPost / perPage)
        if(page > totalPage){
            return ResponsFrontendError(res, {
                message: 'page is not found',
                statusCode: 404
            })
        }

        const allPost = await postModel.find()
                    .skip((page -1) * perPage)
                    .limit(perPage)
                    .exec()

        return ResponsSuccess(res, {
            message: ' post is successfully  Found...',
            statusCode: 200,
            pelod: {
               
                allPost,
                page,
                totalPage


            }
        })
    } catch (error) {
        return ResponsError(res, {
            message: 'internal error',
            statusCode: 500,
            success: false,
        })
    }
}