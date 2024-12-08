import express from 'express';
import userRouter from './userRouter.js';
import postRouter from './postRouter.js';
import commentRouter from './commentRouter.js';
const apiRouter=express.Router();
apiRouter.use('/user',userRouter)
apiRouter.use ('/post',postRouter);
apiRouter.use('/comment',commentRouter);
export default apiRouter;