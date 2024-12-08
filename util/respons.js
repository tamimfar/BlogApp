const ResponsSuccess = (res, { message = 'success', statusCode = 200,pelod={},success= true } ) => {

    return res.status(statusCode).json({
        message:message,
        statusCode:statusCode,
        success:success,
        pelod:pelod
       
    })

}
const ResponsFrontendError = (res, { message = 'your requst is not currect', statusCode = 404 }) => {
    return res.status(statusCode).json({
        message:message,
        statusCode:statusCode
    })

}
const ResponsError = (res, { message = 'intarnal error', statusCode = 500,success=false }) => {
    return res.status(statusCode).json({
        message:message,
        statusCode:statusCode,
        success:success
    })

}

export { ResponsSuccess, ResponsError, ResponsFrontendError }