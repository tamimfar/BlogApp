import express from "express"
import { GetAllPost, GetSinglePost } from "../controllers/public.js"
const PublicRouter = express.Router()

PublicRouter.get('/singlePost/:id',GetSinglePost)
PublicRouter.get('/allPost',GetAllPost)



export default PublicRouter
