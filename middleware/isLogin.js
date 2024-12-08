import { ResponsFrontendError } from "../util/respons.js"

const isLogin =(req,res,next)=>{
    try {
        const token = req.cookies.token
        if (!token) {
            return ResponsFrontendError(res, {
                message: 'you are not login',
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
export default isLogin