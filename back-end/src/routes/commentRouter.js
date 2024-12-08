import express from 'express';
import { isAuth } from '../middlewear/isauth.js';
import { createComments, deleteCommentById, editComment, getallComment, getCommentById } from '../controller/commentController.js';
const commentRouter=express.Router();
commentRouter.post('/createcomment/:id',isAuth,createComments);
commentRouter.put('/editcomment/:id',isAuth,editComment);
commentRouter.get('/getcommentbyid/:id',isAuth,getCommentById);
commentRouter.get('/getallcomment',isAuth,getallComment);
commentRouter.delete('/deletecomment/:id',isAuth,deleteCommentById)
export default commentRouter;