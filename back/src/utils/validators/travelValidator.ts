import joi, { Schema } from 'joi';

class TravelValidator {
    static postTravel() : Schema {
        return joi.object({
            author : joi.required(),
            beachId: joi.required(),
            date : joi.date().iso().required(),
        });
    }

    static putTravel() : Schema {
        return joi.object({
            beachId: joi.required(),
            date : joi.date().iso().required(),
        });
    }
}

export { TravelValidator };
