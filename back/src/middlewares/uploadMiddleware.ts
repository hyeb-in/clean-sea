import { FileRequest, FileObjects } from "../types/upload";
import { replacePlaceholder } from "../utils/uploads/upload";
import { MulterError } from "multer";
import { Request } from "express";
import { RequestHandler } from "express-serve-static-core";
import { uploadMiddleware } from "./fileUploadMiddleware";
import { ReviewModel } from "../db/schemas/reviewSchema";
import UserModel from "../db/schemas/userSchema";

// 파일 작업을 수행하는 함수
async function handleFileOperation(
  files: FileObjects[],
  operation: (placeholder: FileObjects, file: FileObjects) => void
) {
  const uploadFilePromises = files.map(async (file) => {
    const fileObject = { ...file };
    operation(file, fileObject);
    return file.filename;
  });

  return Promise.all(uploadFilePromises);
}

// 파일 업로드 처리 미들웨어
export const fileUpload: RequestHandler<FileRequest> = (req, res, next) => {
  uploadMiddleware(req as Request, res, async (err: any) => {
    try {
      if (err instanceof MulterError || err) {
        return next(err);
      }

      const files: FileObjects[] = req.files ? ([] as FileObjects[]).concat(...Object.values(req.files)) : [];

      if (req.method === 'POST' || (req.method === 'PUT' && files.length > 0)) {

        let uploadFiles: string[];

        if (req.originalUrl.includes('/users/')) {
          const { userId } = req.params;
          const foundUser = await UserModel.findOne({ _id: userId });

          if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
          }

          uploadFiles = foundUser.uploadFile;
        } else if (req.originalUrl.includes('/reviews/')) {
          const { reviewId } = req.params;
          const foundReview = await ReviewModel.findOne({ _id: reviewId });

          if (!foundReview) {
            return res.status(404).json({ message: 'Review not found' });
          }

          uploadFiles = foundReview.uploadFile;
        }

        const uploadedFilenames = await handleFileOperation(files, (placeholder, file) =>
          replacePlaceholder(placeholder, uploadFiles[uploadFiles.length - 1], file, () => {})
        );

        req.body.uploadFile = uploadedFilenames.map((filename) => `uploads/${filename}`);
      }
      next();
    } catch (error) {
      next(error);
    }
  });
};









// import { FileRequest, FileObjects } from "../types/upload";
// import { insertFile, replacePlaceholder } from "../utils/uploads/upload";
// import { MulterError } from "multer";
// import { Request } from "express";
// import { RequestHandler } from "express-serve-static-core";
// import { uploadMiddleware } from "./fileUploadMiddleware";
// import { ReviewModel } from "../db/schemas/reviewSchema";
// import UserModel from "../db/schemas/userSchema";

// // 파일 작업을 수행하는 함수
// async function handleFileOperation(
//   files: FileObjects[],
//   operation: (placeholder: FileObjects, file: FileObjects) => void
// ) {
//   const fileUrls: string[] = [];
//   const fileObjects: FileObjects[] = [];

//   // 각 파일에 대한 작업 수행 및 정보 수집
//   for (const file of files) {
//     fileUrls.push(file.filename as string);
//     const fileObject: FileObjects = {
//       fieldname: file.fieldname,
//       originalname: file.originalname,
//       encoding: file.encoding,
//       mimetype: file.mimetype,
//       size: file.size,
//       destination: file.destination,
//       filename: file.filename,
//       path: file.filename,
//     };
//     fileObjects.push(fileObject);
//     operation(file, fileObject);
//   }
// }

// // 파일 업로드 처리 미들웨어
// export const fileUpload: RequestHandler<FileRequest> = (req, res, next) => {
//   uploadMiddleware(req as Request, res, async function (err: any) {
//     try {
//         // 업로드 에러 처리
//         if (err instanceof MulterError || err) {
//             return next(err);
//         }

//       const files: FileObjects[] = req.files
//         ? ([] as FileObjects[]).concat(...Object.values(req.files))
//         : [];

//       const uploadFile = files.map((file) => file.filename);

//       if (req.method === "POST") {
//         await handleFileOperation(files, insertFile);
//         req.body.uploadFile = uploadFile.map(
//           (filename) => `uploads/${filename}`
//         );
//       }
//       // put요청일 때 빈배열이 들어올 경우 -> 기존에 있던 이미지가 삭제되지 않기위해 length로 조건추가
//        else if (req.method === "PUT" && files.length > 0) {
//         // 사용자 정보 업데이트 요청 처리
//         if (req.originalUrl.includes('/users/')) {
//             const {userId} = req.params;
//             try {
//                 const foundUser = await UserModel.findOne({ _id: userId });

//                 if (!foundUser) {
//                     return res.status(404).json({ message: 'User not found' });
//                 }
//                 const userUloadFiles = foundUser.uploadFile;
//                 await handleFileOperation(files, (placeholder, file) => replacePlaceholder(placeholder, userUloadFiles[0], file, () =>{}));
//             } catch (error) {
//                 console.error('Error finding user:', error);
//                 return res.status(500).json({ message: 'Internal server error' });
//             }

//         }
//         // 게시물 정보 업데이트 요청 처리
//         else if (req.originalUrl.includes('/reviews/')) {
//             const {reviewId} = req.params;
//             try {
//                 const foundReview = await ReviewModel.findOne({ _id: reviewId });

//                 if (!foundReview) {
//                     return res.status(404).json({ message: 'Review not found' });
//                 }
//                 const reviewUploadFiles = foundReview.uploadFile;
//                 // 파일이 여러개 들어올 경우 그 길이에 맞춰서 조건 실행
//                 await handleFileOperation(files, (placeholder, file) => {
//                     const filenameToDelete = reviewUploadFiles[reviewUploadFiles.length - 1];
//                     replacePlaceholder(placeholder, filenameToDelete, file, () =>{});
//                 });
//             } catch (error) {
//                 console.error('Error finding review:', error);
//                 return res.status(500).json({ message: 'Internal server error' });
//             }

//         }
//         req.body.uploadFile = uploadFile.map(
//           (filename) => `uploads/${filename}`
//         );
//       }
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
// };
