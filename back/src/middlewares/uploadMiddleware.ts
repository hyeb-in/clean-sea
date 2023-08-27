import { FileRequest, FileObjects } from "../types/upload";
import { insertFile, replacePlaceholder } from "../utils/uploads/upload";
import { MulterError } from "multer";
import { Request } from 'express';
import { RequestHandler } from "express-serve-static-core";
import { uploadMiddleware } from "./fileUploadMiddleware";



export const handleFileUpload : RequestHandler<FileRequest> = (req, res, next) => {
    uploadMiddleware(req as Request, res, async function (err: any) {
        try {
            if (err instanceof MulterError || err) {
                return next(err);
            }
            const files: FileObjects[] = req.files ? ([] as FileObjects[]).concat(...Object.values(req.files)) : [];
            const uploadFile = files.map(file => file.filename);

            
            if (req.method === 'POST') {
                const fileUrls: string[] = [];
                const fileObjects: FileObjects[] = [];

                for (const file of files) {
                    fileUrls.push(file.filename as string);
                    fileObjects.push({
                        fieldname: file.fieldname,
                        originalname: file.originalname,
                        encoding: file.encoding,
                        mimetype: file.mimetype,
                        size: file.size,
                        destination: file.destination,
                        filename: file.filename,
                        path: file.filename
                    });
                    insertFile(file, {
                        fieldname: file.fieldname,
                        originalname: file.originalname,
                        encoding: file.encoding,
                        mimetype: file.mimetype,
                        size: file.size,
                        destination: file.destination,
                        filename: file.filename,
                        path: file.filename
                    });
                }
            } else if (req.method === 'PUT') {
                const fileUrls: string[] = [];
                const fileObjects: FileObjects[] = [];

                for (const file of files) {
                    fileUrls.push(file.filename as string);
                    fileObjects.push({
                        fieldname: file.fieldname,
                        originalname: file.originalname,
                        encoding: file.encoding,
                        mimetype: file.mimetype,
                        size: file.size,
                        destination: file.destination,
                        filename: file.filename,
                        path: file.filename
                    });
                    replacePlaceholder(file, {
                        fieldname: file.fieldname,
                        originalname: file.originalname,
                        encoding: file.encoding,
                        mimetype: file.mimetype,
                        size: file.size,
                        destination: file.destination,
                        filename: file.filename,
                        path: file.filename
                    });
                }
            }
            req.body.uploadFile = uploadFile.map(filename => `/team/imageUpload/${filename}`);
            next();
        } catch (error) {
            next(error);
        }
    });
}