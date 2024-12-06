import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send({message:'hellow'})
})
app.listen(process.env.PORT,(req,res)=>{
    console.log('server is running on port',process.env.PORT)
})