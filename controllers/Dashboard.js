 
import postModel from "../Models/post.js"
import UserModel from "../Models/user.js"
import CommentModel from "../Models/comment.js"
import { ResponsError, ResponsFrontendError, ResponsSuccess } from "../util/respons.js"
import fs from "fs"
import path from "path"

export const GetAllData = async (req, res) => {
    try {
        const allUser = await UserModel.find()
        const allPost = await postModel.find()
        const allComment = await CommentModel.find()  


        return ResponsSuccess(res, {
            message: ' post is successfully create...',
            statusCode: 200,
            pelod: {
                allUser,
                allPost,
                allComment

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

export const GetUser = async (req, res) => {
    try {
        const user = await UserModel.find()
        return ResponsSuccess(res, {
            message: ' post is successfully create...',
            statusCode: 200,
            pelod: {
                user

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

export const DeleteUser = async (req,res) => {
    try {
        const userId = req.params.id
        const ExistUser = await UserModel.findById(userId)
        if(!ExistUser){
            return ResponsFrontendError(res, {
                message: 'User is not Exist',
                statusCode: 404
            })
        }
        if(ExistUser.rol === 'admin'){
            return ResponsFrontendError(res, {
                message: 'admin  will be not delete',
                statusCode: 404
            })
        }
        if(ExistUser.img){
            const imgPath = path.join('public/image',ExistUser.img)
            if(!imgPath){
                return ResponsFrontendError(res, {
                    message: ' img is not Exist',
                    statusCode: 404
                })
            }
           await fs.promises.unlink(imgPath)
            .then(() => console.log('img is  deleted')
            )
        }
        const deletUser = await UserModel.findByIdAndDelete(userId)
        return ResponsSuccess(res, {
            message: ' post is successfully create...',
            statusCode: 200,
            pelod: {
                deletUser

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