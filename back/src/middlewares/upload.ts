// import { Request, Response, NextFunction } from "express";
// import { MulterError } from "multer";
// import { insertFile, replacePlaceholder } from "../path/to/fileFunctions"; // 실제 함수 경로에 맞게 수정해주세요

// interface FileObjects {
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   size: number;
//   destination: string;
//   filename: string;
//   path: string;
// }

// export async function handleFileUpload(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const upload = imageUpload.array("uploadFile", 5);

//   upload(req, res, async function (err: any) {
//     try {
//       if (err instanceof MulterError) {
//         return next(err);
//       } else if (err) {
//         return next(err);
//       }
//       const files: FileObjects[] = req.files
//         ? ([] as FileObjects[]).concat(...Object.values(req.files))
//         : [];
//       const uploadFile = files.map((file) => file.filename);

//       if (req.method === "POST") {
//         const fileUrls: string[] = [];
//         const fileObjects: FileObjects[] = [];

//         for (const file of files) {
//           fileUrls.push(file.filename as string);
//           fileObjects.push({
//             fieldname: file.fieldname,
//             originalname: file.originalname,
//             encoding: file.encoding,
//             mimetype: file.mimetype,
//             size: file.size,
//             destination: file.destination,
//             filename: file.filename,
//             path: file.filename,
//           });
//           insertFile(file, {
//             fieldname: file.fieldname,
//             originalname: file.originalname,
//             encoding: file.encoding,
//             mimetype: file.mimetype,
//             size: file.size,
//             destination: file.destination,
//             filename: file.filename,
//             path: file.filename,
//           });
//         }
//       } else if (req.method === "PUT") {
//         const fileUrls: string[] = [];
//         const fileObjects: FileObjects[] = [];

//         for (const file of files) {
//           fileUrls.push(file.filename as string);
//           fileObjects.push({
//             fieldname: file.fieldname,
//             originalname: file.originalname,
//             encoding: file.encoding,
//             mimetype: file.mimetype,
//             size: file.size,
//             destination: file.destination,
//             filename: file.filename,
//             path: file.filename,
//           });
//           replacePlaceholder(file, {
//             fieldname: file.fieldname,
//             originalname: file.originalname,
//             encoding: file.encoding,
//             mimetype: file.mimetype,
//             size: file.size,
//             destination: file.destination,
//             filename: file.filename,
//             path: file.filename,
//           });
//         }
//       }

//       req.uploadFile = uploadFile;

//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
// }
