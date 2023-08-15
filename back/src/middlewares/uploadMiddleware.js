const multer = require('multer');
const storage = require('../utils/uploads/storage');
const ImageAppender = require('../utils/uploads/upload');

const upload = multer({storage});

async function handleImageUpload(req,res,next){
    this.strategy
}