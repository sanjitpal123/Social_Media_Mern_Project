
import { createComment } from "../repository/commentRepo.js"
export const createCommentservice=async(obj)=>{
    try{
        const comment=await createComment (obj);
        return comment;

    }catch(error)
    {
        throw error;

    }
}