import express from 'express'
import { CreateAccount, deleteProfile, editProfile, Logout, Signin } from '../controller/userController.js';
import { isAuth } from '../middlewear/isauth.js';
import upload from '../config/multerConfig.js';
const userRouter=express.Router();
userRouter.post('/register',CreateAccount)
userRouter.post('/login',Signin)
userRouter.post('/logout',isAuth,Logout)
userRouter.put('/editprofile',isAuth,upload.single('profile'),editProfile)
userRouter.delete('/deleteaccount',isAuth,deleteProfile)
export default userRouter 