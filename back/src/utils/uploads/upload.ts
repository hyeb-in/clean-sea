import { FileObject, FileRequest } from "../../types/upload";

class FileAppender{
    strategy : string;
    constructor(
        strategy : string,
         ){
        this.strategy = strategy;

        switch (strategy){
            case "NONE":
                break;
            case "VALUE":
                break;
            // case "ARRAY":
            //     this.req.files = [];
            //     break;

            default :
                throw new Error('Unknown file strategy :' + strategy);
        }
    }

    inserFile(placeholder : FileObject, file : FileObject){
        Object.assign(placeholder, file);
    }

    replacePlaceholder(placeholder : FileObject, file : FileObject){
        // if (this.strategy === "VALUE"){
        //     if('file' in this.req){
        //         this.req.file = file;
        //     }
        // }
        delete placeholder.fieldname;
        Object.assign(placeholder, file);
    }

    removeFile(placeholder : FileObject){
        for (const key in placeholder){
            if(Object.prototype.hasOwnProperty.call(placeholder,key)){
                placeholder[key as keyof FileObject] = undefined;
            }
        }
    }
}

export { FileAppender };