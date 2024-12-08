import User from "../schema/userSchema.js"

export const Register=async(userobject)=>{
    try{
        const newuser=await User.create(userobject)
        return newuser
    }
    catch(error)
    {
     throw error;
    }
}
export const findbyemail=async(email)=>{
    try{
        const user=await User.findOne({email})
        return user;
    }catch(error)
    {
        throw error;
    }
}
export const findbyid=async(id)=>{
    try{
        const user=await User.findById(id);
        return user;
    }
    catch(error)
    {
        throw error;
    }
}
export const findbyidanddelete=async(id)=>{
    try{
        const deleted=await User.findByIdAndDelete(id);
        return deleted;
    }catch(error)
    {
        throw error;
    }
}
export const findAllUser=async(req,res)=>{
    try{
        const users=await User.find({});
        return users;
    }catch(error)
    {
        throw error;
    } 
}