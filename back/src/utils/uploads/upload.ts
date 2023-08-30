import { FileObjects } from "../../types/upload";

function insertFile(placeholder : FileObjects, file : FileObjects){
    Object.assign(placeholder, file);
}

function replacePlaceholder(placeholder : FileObjects, file : FileObjects){
    delete placeholder.fieldname;
    Object.assign(placeholder, file);
}

export { insertFile, replacePlaceholder };


// import { FileObjects } from "../types/upload";
// import fs from 'fs';
// import path from 'path';

// function insertFile(placeholder : FileObjects, file : FileObjects){
//     Object.assign(placeholder, file);
// }

// function replacePlaceholder(placeholder : FileObjects, filenameToDelete : string, file : FileObjects){
//     console.log(filenameToDelete);
//     const filePathToDelete = path.join(__dirname, '../imageUpload/', filenameToDelete);
//     console.log(1111111111);
//     fs.unlink(filePathToDelete, (err) => {
//         if (err) {
//             console.error('Error deleting old file:', err);
//             return;
//         }
//     delete placeholder.fieldname;
//     Object.assign(placeholder, file);
//     });
// }

// export { insertFile, replacePlaceholder };