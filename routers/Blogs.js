import express from "express";
import { Create, DeletePost, UpdatePost } from "../controllers/Blogs.js";
import { isAdmin } from "../middleware/isAdmin.js"
import upload from "../middleware/Multer.js";


const BlogRouters = express.Router()


BlogRouters.post('/createBlog', isAdmin,upload.single('postImg'), Create)
BlogRouters.delete('/deleteBlog/:id',DeletePost)
BlogRouters.patch('/updateBlog/:id',upload.single('postImg'),UpdatePost) 








export default BlogRouters