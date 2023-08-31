import { FileRequest, FileObjects } from "../types/upload";
import { insertFile, replacePlaceholder } from "../utils/uploads/upload";
import { MulterError } from "multer";
import { Request } from 'express';
import { RequestHandler } from "express-serve-static-core";
import { uploadMiddleware } from "./fileUploadMiddleware";

async function handleFileOperation(files: FileObjects[], operation: (placeholder: FileObjects, file: FileObjects) => void) {
    const fileUrls: string[] = [];
    const fileObjects: FileObjects[] = [];
    for (const file of files) {
        fileUrls.push(file.filename as string);
        const fileObject: FileObjects = {
            fieldname: file.fieldname,
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            size: file.size,
            destination: file.destination,
            filename: file.filename,
            path: file.filename
        };
        fileObjects.push(fileObject);
        operation(file, fileObject);
    }
}


// export const fileUpload: RequestHandler<FileRequest> = (req, res, next) => {
//     const middleware = req.originalUrl.includes('video/') ? uploadMiddleware : videoUploadMiddleware;
//     middleware(req as Request, res, async function(err: any){
//         try {   
//             if (err instanceof MulterError || err) {
//                 return next(err);
//             }
//             const files: FileObjects[] = req.files ? ([] as FileObjects[]).concat(...Object.values(req.files)) : [];
//             const uploadVideo = files.map(file => file.filename);

//             if (req.method === 'POST') {
//                 await handleFileOperation(files, insertFile);
//             } else if (req.method === 'PUT') {
//                 await handleFileOperation(files, replacePlaceholder);
//             }

//             req.body.uploadVideo = uploadVideo.map(filename => `${filename}`);
//             next();
//         } catch (error) {
//             next(error);
//         }
//     })
// }



export const fileUpload: RequestHandler<FileRequest> = (req, res, next) => {
    uploadMiddleware(req as Request, res, async function (err: any) {

        try {
            if (err instanceof MulterError || err) {
                return next(err);
            }
            console.log(req.files);
            const files: FileObjects[] = req.files ? ([] as FileObjects[]).concat(...Object.values(req.files)) : [];
            console.log(req.files);
            const uploadFile = files.map(file => file.filename);

            if (req.method === 'POST') {
                await handleFileOperation(files, insertFile);
                req.body.uploadFile = uploadFile.map(filename => `${filename}`);
            } else if (req.method === 'PUT' && files.length > 0) {
                console.log(files.length);
                await handleFileOperation(files, replacePlaceholder);
                req.body.uploadFile = uploadFile.map(filename => `${filename}`);
            }
            next();
        } catch (error) {
            next(error);
        }
    });
}


// export const videoFileUpload: RequestHandler<FileRequest> = (req, res, next) => {
//     videoUploadMiddleware(req as Request, res, async function (err: any) {

//         try {
//             if (err instanceof MulterError || err) {
//                 return next(err);
//             }
//             const files: FileObjects[] = req.files ? ([] as FileObjects[]).concat(...Object.values(req.files)) : [];
//             const uploadVideo = files.map(file => file.filename);

//             if (req.method === 'POST') {
//                 await handleFileOperation(files, insertFile);
//             } else if (req.method === 'PUT') {
//                 await handleFileOperation(files, replacePlaceholder);
//             }

//             req.body.uploadVideo = uploadVideo.map(filename => `${filename}`);
//             next();
//         } catch (error) {
//             next(error);
//         }
//     });
// }