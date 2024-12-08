import postModel from "../Models/post.js";
import { ResponsError, ResponsFrontendError, ResponsSuccess } from "../util/respons.js";
import fs from 'fs';
import path from "path";

export const Create = async (req, res) => {
    try {
        const { title, desc } = req.body
        const imgPath = req.file.filename
        const newPost = new postModel({
            title,
            desc,
            img: imgPath
        })
        const post = await newPost.save()
        return ResponsSuccess(res, {
            message: ' post is successfully create...',
            statusCode: 200,
            pelod: {
                post

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

export const DeletePost = async (req, res) => {

    try {
        const postId = req.params.id
        const findPost = await postModel.findById(postId)
        if (!findPost) {
            return ResponsFrontendError(res, {
                message: 'post is not found',
                statusCode: 404
            })
        }
       const delet = await postModel.findByIdAndDelete(postId)
       if(findPost.img){
        const deletImg = path.join('public/image',findPost.img)
       await fs.promises.unlink(deletImg)
        .then(() => console.log(
            'img is deleted'
        )
        )
         
        
       }
         return ResponsSuccess(res, {
            message: ' post is successfully  deleted...',
            statusCode: 200,
            pelod: {
                 
               
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

export const UpdatePost = async (req,res) => {
    try {
        let id = req.params.id;
        const {title,desc} = req.body
        const imgPath = req.file.filename
    let result = await postModel.findById(id)
    if (!result) {
        return ResponsFrontendError(res, {
            message: 'post is not found',
            statusCode: 404
        })
    }
    if(title){
        result.title = title;
       
    }
    if(desc){
        result.desc = desc;
         
    }
    if(imgPath){
        result.img = imgPath;
     
    }
    await result.save()
    return ResponsSuccess(res, {
        message: ' post is successfully  deleted...',
        statusCode: 200,
        pelod: {
             
           
        }
    })

    }
     catch (error) {
        return ResponsError(res, {
            message: 'internal error',
            statusCode: 500,
            success: false,
        })
    }
    

}