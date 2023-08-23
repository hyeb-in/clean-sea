import { FileObjects } from "../../types/upload";

function insertFile(placeholder : FileObjects, file : FileObjects){
    Object.assign(placeholder, file);
}

function replacePlaceholder(placeholder : FileObjects, file : FileObjects){
    delete placeholder.fieldname;
    Object.assign(placeholder, file);
}

export { insertFile, replacePlaceholder };