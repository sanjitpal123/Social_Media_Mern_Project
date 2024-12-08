
import { deleteComment, findCommentById, GetAllComment } from "../repository/commentRepo.js";
import { findPostById } from "../repository/postRepo.js";
import Post from "../schema/PostSchema.js";
import { createCommentservice,  } from "../services/commentServices.js"

export const createComments=async(req,res)=>{
    try{
        const {text}=req.body;
        const userid=req.user.id;
        const postid=req.params.id;
        if(!text)
        {
            return res.status(401).json({
                message:"Text is required",
                success:false
            })
        }
        const obj={
           text:text,
            user:userid
        }
        const newComment=await createCommentservice(obj);
        const post=await findPostById(postid);
        console.log('post',post,'postid',postid)
        if(!newComment)
        {
            return res.status(401).json({
                message:"Can not create comment",
                success:false

            })
        }
        if(!post)
        {
            return res.status(401).json({
                message:"can not found post",
                success:false
            })
        }
        post.comment.push(newComment._id);
        await post.save();
        return res.status(201).json({
            message:"Comment is created successfully",
            success:true,
            newComment
        })
    }catch(error)
    {
      return res.status(501).json({
        message:'Internal server error'
      })
    }
}
export const editComment = async (req, res) => {
    try {
        const { text } = req.body;
        const commentId = req.params.id;

        if (!commentId) {
            return res.status(400).json({
                message: "Invalid comment ID.",
                success: false,
            });
        }

        if (!text || text.trim() === "") {
            return res.status(400).json({
                message: "Cannot edit with an empty or whitespace-only comment.",
                success: false,
            });
        }

        const comment = await findCommentById(commentId);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found.",
                success: false,
            });
        }

        comment.text = text.trim();
        await comment.save();

        return res.status(200).json({
            message: "Comment updated successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error editing comment:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

export const getCommentById=async(req,res)=>{
    try{
        const id=req.params.id;
        const comment=await findCommentById(id);
        if(!comment)
        {
            return res.status(401).json({
                message:"Comment is not found",
                success:false
            })
        }
        return res.status(201).json({
            comment,
            success:true
        })
    }
    catch(error)
    {
        return res.status(501).json({
            message:"Internal server error",
            success:false
        })
    }
}
export const getallComment=async(req,res)=>{
    try{
        const comments=await GetAllComment();
        if(!comments)
        {
            return res.status(201).json({
                message:"No comment yet",
                comments,
                success:true
            })
        }
        return res.status(201).json({
            comments,
            success:true
        })
    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false 
        })
    }
}
export const deleteCommentById=async(req,res)=>{
    try{
        const commentid=req.params.id;
        const userid=req.user.id;
        const postid=req.query.postid;
        console.log('post',postid)
        console.log('com',commentid)
        const comment=await findCommentById(commentid);
        if(!comment)
        {
            return res.status(401).json({
                message:'Comment not found',
                success:false
            })
        }
        if(comment.user.toString()!=userid.toString())
        {
            return res.status(401).json({
                message:'Can not delete others comment',
                success:false
            })
        }
       
        await Post.findByIdAndUpdate(postid,{$pull:{comment:commentid}});
       
      
        const post=await findPostById(postid);
       await  post.save();
        const deleted=await deleteComment(commentid);
        if(!deleted)
        {
            return res.status(401).json({
                message:"Cloud not delete comment",
                success:false
            })
        }
        return res.status(201).json({
            message:'Comment is deleted successfully',
            comment,
            post:post
        })

    }catch(error)
    {
        console.log(error)
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })

    }
}
