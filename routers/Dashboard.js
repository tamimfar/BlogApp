import express from 'express'
import { DeleteUser, GetAllData, GetUser } from '../controllers/Dashboard.js'
import isLogin from '../middleware/isLogin.js'
import { isAdmin } from '../middleware/isAdmin.js'

const DashboardRouter = express.Router()



DashboardRouter.get('/',isAdmin,GetAllData)
DashboardRouter.get('/user',isLogin,GetUser)
DashboardRouter.delete('/deletUser/:id',isLogin,DeleteUser)

export default DashboardRouter