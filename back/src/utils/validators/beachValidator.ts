import joi, { Schema } from 'joi';

class beachValidator {
  static getBeach() : Schema {
      return joi.object({
          _id : joi.string().min(2).required().messages({
              'string.base' : "글자를 확인해주세요.",
              'string.min' : '2글자 이상 작성해주세요.',
          }),
      });
  }

  static getBeachAndYear() : Schema {
      return joi.object({
          year : joi.number().min(4).optional().messages({
              'string.base' : "숫자로 입력해주세요.",
              'string.min' : '1999 형태로 작성해주세요',
          }),
          address : joi.string().min(2).optional().messages({
            'string.base' : "글자를 확인해주세요.",
            'string.min' : '2글자 이상 작성해주세요.',
        }),
      });
  }
}





export { beachValidator };
