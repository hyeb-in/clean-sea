import multer from 'multer';
import path from 'path';

// 이미지와 비디오 파일 필터링을 위한 함수
const imageFilter = (req : any, file : Express.Multer.File, cb : any) =>{
    // 파일의 mimetype검사하여 필터링 수행
    if( file.mimetype.startsWith('video/') || (file.mimetype.startsWith('image/') && (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'))){
        cb(null,true);
    }else{
        cb(new Error('Only jpeg, and png 파일이여야만 합니다.'), false);
    }
};
// 이미지 업로드 저장 경로
const storage = multer.diskStorage({
    destination: './imageUpload/',
    filename : function (req, file, cb) {
        const ext = path.extname(file.originalname); // 파일 확장자 추출
        const fileName = `${Date.now()}${ext}`; // 현재 시간 + 확장자로 파일명 생성
        cb(null, fileName);
    },
});

const uploadMiddleware = multer({
    storage : storage,
    fileFilter : imageFilter,
}).array('uploadFile[]',5); // 배열 형태의 업로드 필드 설정 (최대 5개)

export { uploadMiddleware };
