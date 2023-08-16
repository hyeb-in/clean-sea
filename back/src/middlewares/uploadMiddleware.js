const multer = require('multer');
const extend = require('xtend');
const appendField = require('append-field');
const onFinished = require('on-finished');
const removeUploadedFiles = require('../utils/uplodas/removeUpload');

const Counter = require('./counter');
const MulterError = require('./multer-error');
const FileAppender = require('../utils/uplodas/fileAppend');

const upload = multer({storage});

async function handleImageUpload(req,res,next){
    this.strategy
}