import express from 'express'
import { AddComment } from '../controllers/comment.js' 

const CommentRouter = express.Router()



CommentRouter.post('/',AddComment)




export default CommentRouter