const joi = require('joi');

class reviewValidator {
    static postReview(){
        return joi.object({
            title : joi.string().min(4).required().messages({
                'string.base' : "문자여야합니다.",
                'string.min' : '4글자이상이여야합니다.',
            }),
            content : joi.string().required().messages({
                'string.base' : "문자여야합니다.",
            }),
        });
    }

    static putReview(){
        return joi.object({
            title : joi.string().min(4).optional().messages({
                'string.base' : "문자여야합니다.",
                'string.min' : '4글자이상이여야합니다.',
            }),
            content : joi.string().optional().messages({
                'string.base' : "문자여야합니다.",
            }),
        });
    }
}

export { reviewValidator };