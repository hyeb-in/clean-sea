// import multer, { MulterError } from 'multer';
// import { FileAppender } from '../utils/uploads/upload';
// import { Request, Response, NextFunction } from 'express';
// const storage = require('../utils/uploads/storage');
// const upload = multer({ storage });
// const fileStrategy: string = "VALUE";
// async function handleFileUpload(req: Request, res: Response, next: NextFunction) {
//     try {
//         // 형변환하여 FileRequest로 타입 변경
//         const fileReq = req as FileRequest;
//         const appender = new FileAppender(fileStrategy, fileReq);
//         // 미들웨어 함수에 callback 함수를 전달하여 사용
//         upload.single('uploadFile')(req, res, async function (err: any) {
//             try {
//                 if (err instanceof MulterError) {
//                     // Handle MulterError
//                     return next(err);
//                 } else if (err) {
//                     return next(err);
//                 }
//                 if (req.file) {
//                     // placeholder 생성 시에 req.file 객체 전체를 전달
//                     appender.replacePlaceholder(req.file, req.file);
//                 }
//                 next();
//             } catch (error) {
//                 next(error);
//             }
//         });
//     } catch (error) {
//         next(error);
//     }
// }
// export { handleFileUpload };
//# sourceMappingURL=uploadMiddleware.js.map