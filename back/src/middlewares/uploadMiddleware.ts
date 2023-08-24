import { MulterError } from 'multer';
import { insertFile, replacePlaceholder } from '../utils/uploads/upload';
import { Request, Response, NextFunction } from 'express';
import { FileObjects, FileRequest } from "../types/upload";
import { imageUpload } from './fileUploadMiddleware';

export function handleFileUpload(req: FileRequest, res: Response, next: NextFunction) {
    const upload = imageUpload.array('imageUrls', 5);
    upload(req as Request, res, async function (err: any) {
        try {
            console.log(req.file);
            if (err instanceof MulterError) {
                return next(err);
            } else if (err) {
                return next(err);
            }

            const files: FileObjects[] = req.files ? ([] as FileObjects[]).concat(...Object.values(req.files)) : [];
            const uploadFile = files.map(file => file.filename);

            if ((req as Request).method === 'POST') {
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
            } else if ((req as Request).method === 'PUT') {
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

            req.uploadFile = uploadFile;

            next();
        } catch (error) {
            next(error);
        }
    });
}
