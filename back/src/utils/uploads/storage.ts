import multer from 'multer';

const storage = multer.diskStorage({
    destination: './uploadFile/',
    filename : function (req, file, cb) {
        const imageName = new Date().getTime() + "-" + file.originalname;
        cb(null, imageName);
    }
});

export { storage };