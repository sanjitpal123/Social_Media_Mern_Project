import Post from "../schema/PostSchema.js"

export const createPost=async(obj)=>{
    try{
        const post=await Post.create(obj);
        return post;

    }catch(error)
    {
    throw error;
    }
}
export const findPostById=async(id)=>{
    try{
    const post=await Post.findById(id);
    return post;
        
    }catch(error)
    {
        throw error;
    }
}
export const GetAllPost=async()=>{
    try{
        const posts=await Post.find({}).sort({createdAt:-1}).populate('user','fullname profilePicture');
        return posts;
    }catch(error){
        throw error;
    }
}