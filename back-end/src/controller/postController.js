import cloudinary from "../config/Cloudinary.js";
import { findPostById } from "../repository/postRepo.js";
import Post from "../schema/PostSchema.js";
import { CreatePostService, findPostByIdService, GetAllPosts } from "../services/postService.js";

export const CreatePost=async(req,res)=>{
    try{
        const {caption}=req.body;
        const content=req.file;
        const userid=req.user.id;
        if(!caption || !content){
            return res.status(401).json({
                message:"Something is missing",
                success:false
            })
        }
        let uploaded;
        if(content.mimetype.startsWith("image/"))
        {
            uploaded=cloudinary.uploader.upload(content.path,{resource_type:'image'});
        }
        else if(content.mimetype.startsWith("video/"))
        {
            uploaded=cloudinary.uploader.upload(content.path,{resource_type:"video"});
        }
        else {
            return res.status(401).json({
                message:"Invalid file type",
                success:false
            })
        }
        const upj={
            caption:caption,
            content:(await uploaded).secure_url,
            user:userid
        }
        const newPost=await CreatePostService(upj);
        return res.status(201).json({
            message:"Post created successfully",
            newPost,
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
export const editPost=async(req,res)=>{
    try{
        const {caption}=req.body;
        const content=req.file;
        const postid=req.params.id;
        const post=await findPostByIdService(postid);
        if(!post)
        {
            return res.status(401).json({
                message:"Post is not found",
                success:false 
            })
        }
        let uploaded;
        if(content.mimetype.startsWith("image/"))
        {
            uploaded=cloudinary.uploader.upload(content.path,{resource_type:'image'});
        }
        else if(content.mimetype.startsWith("video/"))
        {
            uploaded=cloudinary.uploader.upload(content.path,{resource_type:"video"});
        }
        else {
            return res.status(401).json({
                message:"Invalid file type",
                success:false
            })
        }

        if(caption)
        {
            post.caption=caption;
        }
        if(content)
        {
            post.content=(await uploaded).secure_url;
        }
        await post.save();
        return res.status(201).json({
            message:"Post is edited successfully",
            post,
            success:true 
        });


    }catch(error)
    {
        console.log(error)
     return res.status(501).json({
        message:"Internal server error",
        success:false 
     })
    }
}
export const getAllPost=async(req,res)=>{
    try{
        const posts=await GetAllPosts();
        if(!posts)
        {
            return res.status(201).json({
                message:"No post yet. please something",
                success:true
            })
        }
        return res.status(201).json({
            posts,
            success:true
        })

    }catch(error)
    {
     return res.status(501).json({
        message:"Internal server error",
        success:false
     })
    }
}
export const getUserPost=async(req,res)=>{
    try{
         const userid=req.user.id;
         const posts=await GetAllPosts();
         const userposts=posts.filter((post)=>post.user.toString()==userid.toString());
         return res.status(201).json({
            userposts,
            totalpost:userposts.length,
            success:true
         })

    }catch(error)
    {
     return res.status(501).json({
        message:"Internal server error",
        success:false 
     })
    }
}
export const deletePost=async(req,res)=>{
    try{
        const postid=req.params.id;
        const userid=req.user.id;
        const post=await findPostById(postid);
        if(!post)
        {
            return res.status(401).json({
                message:"Post not found",
                successl:true
            })
        }
        if(post.user.toString()!=userid.toString())
        {
            return res.status(401).json({
                message:"You can't delete others post",
                success:true
            })
            
        }
      const deleted=await Post.findByIdAndDelete(postid);
      if(!deleted)
      {
        return res.status(401).json({
            message:"Could not delete ",
            success:false
        })
      }
     
      return res.status(201).json({
        message:"Post is deleted successfully",
        deleted,
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
export const getPostById=async(req,res)=>{
    try{
        const postid=req.params.id;
        const post=await findPostById(postid);
        if(!post)
        {
            return res.status(401).json({
                message:"Post not found",
                success:false
            })
        }
        return res.status(201).json({
            post,
            success:true
        })
    }
    catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}