// import { FileObject, FileRequest } from "upload";
// class FileAppender{
//     strategy : string;
//     req : FileRequest;
//     constructor(strategy : string, req : FileRequest){
//         this.strategy = strategy;
//         this.req = req;
//         switch (strategy){
//             case "NONE":
//                 break;
//             case "VALUE":
//                 break;
//             case "ARRAY":
//                 req.files = [];
//                 break;
//             default :
//             throw new Error('Unknown file strategy :' + strategy);
//         }
//     }
//     replacePlaceholder(placeholder : FileObject, file : FileObject){
//         if (this.strategy === "VALUE"){
//             this.req.file = file;
//             return;
//         }
//         delete placeholder.fieldname;
//         Object.assign(placeholder, file);
//     }
// }
// export { FileAppender };
//# sourceMappingURL=upload.js.map