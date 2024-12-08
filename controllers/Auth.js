import UserModel from "../Models/user.js";
import { comparePassword, hashingPassword } from "../util/password.js";

import dotenv from "dotenv";
dotenv.config()



import { ResponsError, ResponsFrontendError, ResponsSuccess } from "../util/respons.js";
import { createToken, setCookie } from "../util/jwt.js";

const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const imgPath = req.file.filename
        const NewUser = new UserModel({
            name,
            email,
            img: imgPath,
            password: hashingPassword(password, 10)
        })
        await NewUser.save()
        return ResponsSuccess(res, {
            message: 'data is successfully create...',
            statusCode: 200,
            pelod: { NewUser }

        })


    } catch (error) {
        return ResponsError(res, {
            message: 'internal error',
            statusCode: 500,
            success: false,
        })


    }

}


const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return ResponsFrontendError(res, {
                message: 'your requst is not currect',
                statusCode: 404
            })
        }
        const findUser = await UserModel.findOne({ email })


        if (!findUser) {
            return ResponsFrontendError(res, {
                message: 'data is not found',
                statusCode: 404
            })
        }
        const match = await comparePassword(password, findUser.password)
        if (!match) {
            return ResponsFrontendError(res, {
                message: 'your info is not currect',
                statusCode: 404
            })
        }
        const userid = findUser._id
        const token = createToken({ userid }, process.env.TokenKey)
        setCookie(res, token)
        return ResponsSuccess(res, {
            message: 'Login successfully.....',
            statusCode: 200,
            pelod: {
                findUser,

            }

        })



    } catch (error) {
      
        
        ResponsError(res, {
            message: 'internal error',
            statusCode: 500,
            success: false,
        })
    }
}


const Loguot = async (req, res) => {
    try {
        res.clearCookie('token')
        return ResponsSuccess(res, {
            message: ' Logout  successfully  ',
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



export { Register, Login, Loguot }