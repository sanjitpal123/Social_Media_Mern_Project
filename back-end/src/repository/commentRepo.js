import Comment from "../schema/CommentSchema.js"

export const createComment=async(obj)=>{
    try{
        const comment=await Comment.create(obj);
        return comment;


    }catch(error)
    {
      throw error;
    }

}
export const findCommentById = async (id) => {
  try {
      const comment = await Comment.findById(id);
      console.log("comments",comment) // Single document
      return comment; // Will be `null` if not found
  } catch (error) {
      throw error; // Rethrow the error for the caller to handle
  }
};
export const GetAllComment=async()=>{
  try{
    const comments=await Comment.find({});
    return comments;
  }catch(error)
  {
    throw error;
  }
}
export const deleteComment=async(id)=>{
  try{
    const comment=await Comment.findByIdAndDelete(id);
    return comment;

  }catch(error)
  {
    throw error;
  }
}
