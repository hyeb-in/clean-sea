// import multer, { MulterError } from 'multer';
// import { FileAppender } from '../utils/uploads/upload';
// import { Request, Response, NextFunction } from 'express';
// import { storage } from '../utils/uploads/storage';
// import { FileObject, FileRequest } from "../types/upload";

// const upload = multer({ storage });

// const fileStrategy: string = "VALUE";

// async function handleFileUpload(req: FileRequest, res: Response, next: NextFunction) {
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
//                     // req.file을 FileObject 타입으로 변환하여 전달
//                     const fileObject: FileObject = {
//                         fieldname: req.file.fieldname,
//                         originalname: req.file.originalname,
//                         encoding: req.file.encoding,
//                         mimetype: req.file.mimetype,
//                         size: req.file.size,
//                         destination: req.file.destination,
//                         filename: req.file.filename,
//                         path: req.file.path
//                     };
//                     appender.replacePlaceholder(req.file, fileObject);
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
