const Joi = require('@hapi/joi');

const taskSchema = Joi.object({
    name: Joi.string()
        // .alphanum()
        .min(3)
        .max(30)
        .required(),
    completed: Joi.boolean()
});

const isNumeric = (value) => {
    if (value.match(/^-{0,1}\d+$/)) {
        //valid integer (positive or negative)
        return true;
    } else if (value.match(/^\d+\.\d+$/)) {
        //valid float
        return true;
    } else {
        //not valid number
        return false;
    }
};

module.exports = {
    validateTask: (task) => taskSchema.validate(task),
    isNumeric
};