import multer, { MulterError } from 'multer';
import { FileAppender } from '../utils/uploads/upload';
import { Request, Response, NextFunction } from 'express';
import { FileObject, FileRequest } from "../types/upload";
import { storage } from "../utils/uploads/storage";

const upload = multer({ storage });

export function handleFileUpload(req: Request, res: Response, next: NextFunction) {
    const appender = new FileAppender("VALUE");

    upload.single('uploadFile')(req, res, async function (err: any) {
        try {
            if (err instanceof MulterError) {
                return next(err);
            } else if (err) {
                return next(err);
            }


            if(req.method === 'POST'){
                const fileUrl = req.file.filename;

                const fileObject: FileObject = {
                    fieldname: req.file.fieldname,
                    originalname: req.file.originalname,
                    encoding: req.file.encoding,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                    destination: req.file.destination,
                    filename: req.file.filename,
                    path: fileUrl
                };
                appender.inserFile(req.file,fileObject);
            }else if(req.method === 'PUT'){
                const fileUrl = req.file.filename;

                const fileObject: FileObject = {
                    fieldname: req.file.fieldname,
                    originalname: req.file.originalname,
                    encoding: req.file.encoding,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                    destination: req.file.destination,
                    filename: req.file.filename,
                    path: fileUrl
                };
                appender.replacePlaceholder(req.file, fileObject);
            }else if (req.method === 'DELETE'){
                appender.removeFile(req.file);
            }

            next();
        } catch (error) {
            next(error);
        }
    });
}
