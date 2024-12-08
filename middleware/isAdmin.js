
import { ResponsError, ResponsFrontendError } from '../util/respons.js';
import { decode } from '../util/jwt.js';
import UserModel from '../Models/user.js';

export const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return ResponsFrontendError(res, {
                message: 'you are not login',
                statusCode: 404
            })
        }
        const hello = decode(token)
        const findUser = await UserModel.findById(hello.userid)
        if (!findUser) {
            return ResponsFrontendError(res, {
                message: 'user is not found',
                statusCode: 404
            })
        }
       
        if (findUser.rol != "admin") {
            return ResponsFrontendError(res, {
                message: 'you are not admin',
                statusCode: 404
            })
        }

        next()

    } catch (error) {
        console.log(error);
        return ResponsError(res, {
            message: 'internal error',
            statusCode: 500,
            success: false,
        })


    }
}