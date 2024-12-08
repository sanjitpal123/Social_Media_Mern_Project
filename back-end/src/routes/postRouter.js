import express from 'express'
import { isAuth } from '../middlewear/isauth.js';
import { CreatePost, deletePost, editPost, getAllPost, getPostById, getUserPost } from '../controller/postController.js';
import upload from '../config/multerConfig.js';
import { likeordislike } from '../controller/likeController.js';
const postRouter=express.Router();
postRouter.post('/createpost',isAuth,upload.single('content'), CreatePost);
postRouter.post("/editpost/:id",isAuth,upload.single('content'),editPost);
postRouter.get("/getallpost",isAuth,getAllPost);
postRouter.get("/getuserpost",isAuth,getUserPost);
postRouter.delete("/deletepost/:id",isAuth,deletePost);
postRouter.get('/getpostbyid/:id',isAuth,getPostById);
postRouter.post('/likeordislike/:id',isAuth,likeordislike)
export default postRouter ; 