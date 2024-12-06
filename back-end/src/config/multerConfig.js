import multer from 'multer'
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')

    },
    filename:function (req,file,cb){
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1e9);
        cb(null,file.fieldname+uniqueSuffix+file.originalname)
    }
})
const upload=multer({storage:storage});
export default upload;