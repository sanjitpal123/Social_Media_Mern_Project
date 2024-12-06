import { findbyemail, Register } from "../repository/userRepo.js"
export const Registerservice=async (userobject)=>{
    try{
        const newuser=await Register(userobject);
        return newuser;
    }catch(error)
    {
        throw error;
    }
}

export const FindUser=async(email)=>{
    try{
        const user=await findbyemail(email);
        return user; 
    }catch(error)
    {
        throw error;

    }
}