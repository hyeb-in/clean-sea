import joi, { Schema } from 'joi';

class ReviewValidator {
    static postReview() : Schema {
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

    static putReview() : Schema {
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

export { ReviewValidator };