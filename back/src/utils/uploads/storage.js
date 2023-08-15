const multer = require('multer');

const storage = multer.diskStorage({
    destination: './imageUpload/',
    imageName : function (req, file, cb) {
        const imageName = new Date().getTime() + "-" + file.originalname;
        cb(null, imageName);
    }
});

export { storage };