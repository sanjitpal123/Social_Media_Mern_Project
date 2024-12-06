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
    bio:{
        type:String,
        
    },
    profilePicture:{
        type:String
        

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

const User=mongoose.model('User',userSchema)
export default User;