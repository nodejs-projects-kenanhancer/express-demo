const Joi = require('@hapi/joi');

const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.number().required(),
    pages: Joi.number().required()
});

module.exports.validateBook = (task) => bookSchema.validate(task)