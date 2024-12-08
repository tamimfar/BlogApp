import express from "express";
import { Login, Loguot, Register } from "../controllers/Auth.js";
import upload from "../middleware/Multer.js";

const AuthRouters = express.Router()


AuthRouters.post('/register',upload.single('img') ,Register)
AuthRouters.post('/login',Login)
AuthRouters.post('/logout',Loguot)







export default AuthRouters