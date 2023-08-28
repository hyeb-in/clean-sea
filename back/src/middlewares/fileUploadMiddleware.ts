import multer from 'multer';
import path from 'path';
const imageFilter = (req : any, file : Express.Multer.File, cb : any) =>{
    if( file.mimetype.startsWith('image/') && (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')){
        cb(null,true);
    }else{
        cb(new Error('Only jpeg, and png 이미지 파일이여야만 합니다.'), false);
    }
};


const imageUpload = multer({
    storage : multer.diskStorage({
    destination: './imageUpload/',
    filename : function (req, file, cb) {
        const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}${ext}`;
        cb(null, fileName);
    },

    }),
    fileFilter : imageFilter,
});

const profileImages = multer({
    storage : multer.diskStorage({
        destination: './profileImages/',
        filename : function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const fileName = `${Date.now()}${ext}`;
            cb(null, fileName);
        },

    }),
    fileFilter : imageFilter,
}).array('files', 10);

export { imageUpload, profileImages };
