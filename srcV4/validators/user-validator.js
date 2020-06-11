const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    mail: Joi.string().email().required(),
    userName: Joi.string().required(),
    password: Joi.string().required()
});

module.exports.validateUser = (task) => userSchema.validate(task)