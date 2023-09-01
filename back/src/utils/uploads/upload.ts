import { FileObjects } from "../../types/upload";
import fs from 'fs';
import path from 'path';
import { NextFunction } from "express";

// 새 파일 정보를 기존 파일 정보에 병합하는 함수
function insertFile(placeholder : FileObjects, file : FileObjects){
    Object.assign(placeholder, file);
}

// 이미지 파일을 삭제하고 새로운 파일 정보를 업데이트하는 함수
const imageUploadPath = path.join(__dirname, '../../../imageUpload');
function replacePlaceholder(placeholder : FileObjects, filenameToDelete : string, file : FileObjects, next : NextFunction){
    // 기존 파일 삭제 및 업데이트
    if(filenameToDelete){
        // 파일명에서 'uploads/'인 부분을 제거하여 실제 파일 이름 추출
        const filename = filenameToDelete.replace("uploads/", "");
        // 삭제할 파일의 경로 생성
    const filePathToDelete = path.join(imageUploadPath, filename);
    // 파일 삭제 시도
    fs.unlink(filePathToDelete, (err) => {
        if (err) {
            console.error('Error deleting old file:', err);
        } else {
            next();
        }
    });
    }
    // 필드명 삭제 및 새 파일 정보 병합
    delete placeholder.fieldname;
    Object.assign(placeholder, file);
}

export { insertFile, replacePlaceholder };
