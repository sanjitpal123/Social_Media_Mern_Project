import { createPost, findPostById, GetAllPost } from "../repository/postRepo.js"

export const CreatePostService=async(obj)=>{
    try{
        const post=await createPost(obj);
        return post;

    }catch(error)
    {
        throw error;

    }
}
export const findPostByIdService=async(id)=>{
    try{
        const post=await findPostById(id);
        return post;
    }catch(error)
    {
        throw error;
    }
}
export const GetAllPosts=async()=>{
    try{
        const posts=await GetAllPost();
        return posts;
    }catch(error)
    {
        throw error;
    }

}