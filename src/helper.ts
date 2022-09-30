import { diskStorage } from "multer";


export const helper={
    storage:diskStorage({
        destination:'./uploads',
        filename:(req,res,callback)=>callback(null,`${Date.now()}.json`),
    }),
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==='application/json'){
            cb(null,true)
            return
        }
        cb(null,false)
        return
    }
}