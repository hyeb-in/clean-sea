import multer from 'multer';
import path from 'path';

const imageFilter = (req : any, file : Express.Multer.File, cb : any) =>{
    if( file.mimetype.startsWith('video/') || (file.mimetype.startsWith('image/') && (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'))){
        cb(null,true);
    }else{
        cb(new Error('Only jpeg, and png 파일이여야만 합니다.'), false);
    }
};
// 이미지 업로드 저장 경로
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../imageUpload/'),
    filename : function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = `${Date.now()}${ext}`;
        cb(null, fileName);
    },
});

const uploadMiddleware = multer({
    storage : storage,
    fileFilter : imageFilter,
}).array('uploadFile[]',5);



// 동영상 업로드 저장 경로
const videoStorage = multer.diskStorage({
    destination : path.join(__dirname, '../videoUpload/'),
    filename : function(req,file,cb){
        const ext = path.extname(file.originalname);
        const fileName = `${Date.now()}${ext}`;
        cb(null, fileName);
    }
});

const videoFilter = (req : any, file : Express.Multer.File, cb : any) => {
    if(file.mimetype.startsWith('video/')){
        cb(null,true);
    }else{
        cb(new Error('비디오만 업로드 가능합니다.'), false);
    }
};

const videoUploadMiddleware = multer({
    storage : videoStorage,
    fileFilter : videoFilter,
}).array('uploadVideo[]',5);

export { uploadMiddleware, videoUploadMiddleware };
