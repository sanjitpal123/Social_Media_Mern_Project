import express from 'express'
import dotenv from 'dotenv'
import connection from './config/db.js';
import apiRouter from './routes/APiRouter.js';
import cookieparser from 'cookie-parser'
dotenv.config()
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use('/api',apiRouter)
app.get('/',(req,res)=>{
    res.send({message:'hellow'})
})
app.listen(process.env.PORT,(req,res)=>{
    console.log('server is running on port',process.env.PORT)
    connection()
})