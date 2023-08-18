interface FileObject {
    fieldname : String;
    originalname : String;
    encoding : String;
    mimetype : String;
    size : Number;
    destination : string;
    filename : String;
    path : String;
}

interface FileRequest {
    file? : FileObject;
    files? : {[fieldname : string] : File[]};
}

export { FileObject, FileRequest };