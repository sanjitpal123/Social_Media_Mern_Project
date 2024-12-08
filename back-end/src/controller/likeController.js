import { findCommentById } from "../repository/commentRepo.js";
import { findPostById } from "../repository/postRepo.js";
import Like from "../schema/LikeSchema.js";
import Comment from "../schema/CommentSchema.js";
import Post from "../schema/PostSchema.js";

export const likeordislike = async (req, res) => {
    try {
      const { contenttype } = req.body;
      const contentid = req.params.id;
      const userid = req.user.id;
  
      if (contenttype === 'post') {
        const post = await findPostById(contentid);
        if (!post) {
          return res.status(404).json({
            message: 'Post not found',
            success: false
          });
        }
        
        if (post.like.includes(userid)) {
          await Post.findByIdAndUpdate(contentid, { $pull: { like: userid } });
          return res.status(200).json({
            message: 'Unliked',
            success: true
          });
        } else {
          await Post.findByIdAndUpdate(contentid, { $push: { like: userid } });
          await Like.create({
            user: userid,
            targettype: contenttype,
            target: contentid
          });
          return res.status(200).json({
            message: 'Liked',
            success: true
          });
        }
      } 
      else if (contenttype === 'comment') {
        const comment = await findCommentById(contentid);
        if (!comment) {
          return res.status(404).json({
            message: 'Comment not found',
            success: false
          });
        }
  
        if (comment.like.includes(userid)) {
          await Comment.findByIdAndUpdate(contentid, { $pull: { like: userid } });
          return res.status(200).json({
            message: 'Unliked Comment',
            success: true
          });
        } else {
          await Comment.findByIdAndUpdate(contentid, { $push: { like: userid } });
          await Like.create({
            user: userid,
            targettype: contenttype,
            target: contentid
          });
          return res.status(200).json({
            message: 'Liked Comment',
            success: true
          });
        }
      } else {
        return res.status(400).json({
          message: 'Invalid content type',
          success: false
        });
      }
  
    } catch (error) {
      console.error(error);
      return res.status(501).json({
        message: 'Internal server error',
        success: false
      });
    }
  };
  