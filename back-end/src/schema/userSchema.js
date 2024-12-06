import mongoose from 'mongoose'
import bcrypt from'bcrypt'
const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    followers:[
        {type:mongoose.Schema.Types.ObjectId, ref:'User'}
    ],
    following:[
        {type:mongoose.Schema.Types.ObjectId, ref:'User'}
    ],
    post:[
        {type:mongoose.Schema.Types.ObjectId, ref:'Post'}
    ]
})
userSchema.pre('save',async(req,res,next)=>{
    try{
    const salt=await bcrypt.genSalt(10);
     this.password=await bcrypt.hash(this.password,salt);
     next()
    }
    catch(error)
    {
        next(error)
    }
})
const User=mongoose.model('User',userSchema)
export default User;