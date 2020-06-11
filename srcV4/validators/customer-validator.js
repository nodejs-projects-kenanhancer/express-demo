const Joi = require('@hapi/joi');

const customerSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    age: Joi.number().required()
});

module.exports.validateCustomer = (task) => customerSchema.validate(task);