import express from 'express'
import { CreateAccount, deleteProfile, editProfile, followOrUnfollow, getAllUser, getProfileById, getUserProfile, Logout, Signin } from '../controller/userController.js';
import { isAuth } from '../middlewear/isauth.js';
import upload from '../config/multerConfig.js';
const userRouter=express.Router();
userRouter.post('/register',CreateAccount)
userRouter.post('/login',Signin)
userRouter.post('/logout',isAuth,Logout)
userRouter.put('/editprofile',isAuth,upload.single('profile'),editProfile)
userRouter.delete('/deleteaccount/:id',isAuth,deleteProfile)
userRouter.get('/getprofilebyid/:id',isAuth,getProfileById)
userRouter.get('/getuserprofile',isAuth,getUserProfile);
userRouter.get('/followorunfollow/:id',isAuth,followOrUnfollow)
userRouter.get('/getalluser',isAuth,getAllUser);


export default userRouter 