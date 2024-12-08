import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cookie from 'cookie-parser'
import cors from 'cors'
import  dbconnection  from './config/db.js';

 
import AuthRuoters from './routers/Auth.js';
import BlogRouters from './routers/Blogs.js';
import DashboardRouter from './routers/Dashboard.js';
import CommentRouter from './routers/Comment.js';
import PublicRouter from './routers/public.js'

const corsOptin = {
    origin:true,
    credentials:true
}


const app = express();
app.use(express.static('public'))
app.use(cookie())
app.use(express.json())
app.use(cors(corsOptin))
app.use('/auth',AuthRuoters)
app.use('/blog',BlogRouters)
app.use('/dashboard',DashboardRouter )
app.use('/commentPath',CommentRouter)
app.use('/public',PublicRouter)
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} `);
    console.log(`sever is runing...`);
    dbconnection()
    
     
    
})
