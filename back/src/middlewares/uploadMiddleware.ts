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
            } else if (req.method === 'PUT'  && files.length > 0) {
                await handleFileOperation(files, replacePlaceholder);
                // if (req.originalUrl.includes('/photo/')) {
                //     console.log('Update user photo logic');
                // } else if (req.originalUrl.includes('/reviews/')) {
                //     const {reviewId} = req.params;
                //     try {
                //         const foundReview = await ReviewModel.findOne({ _id: reviewId });
                
                //         if (!foundReview) {
                //             return res.status(404).json({ message: 'Review not found' });
                //         }
                //         const reviewUploadFiles = foundReview.uploadFile;
                //         console.log(reviewUploadFiles);
                //         console.log(222222222);
                //         await handleFileOperation(files, (placeholder, file) => replacePlaceholder(placeholder, reviewUploadFiles[0], file));
                //         next();
                //     } catch (error) {
                //         console.error('Error finding review:', error);
                //         return res.status(500).json({ message: 'Internal server error' });
                //     }
                // }
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