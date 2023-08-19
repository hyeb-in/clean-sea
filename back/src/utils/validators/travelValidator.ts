import joi, { Schema } from 'joi';

class TravelValidator {
    static postTravel() : Schema {
        return joi.object({
            date : joi.date().iso().required(),
        });
    }

    static putTravel() : Schema {
        return joi.object({
            date : joi.date().iso().optional(),
        });
    }
}

export { TravelValidator };