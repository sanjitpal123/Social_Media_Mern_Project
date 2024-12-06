import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
export const generateToken=async(id)=>{
    return jwt.sign({id:id},process.env.SECRET,{expiresIn:'1d'} )
}