const Joi = require('@hapi/joi');

const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.number().required(),
    pages: Joi.number().required()
});

module.exports = (book) => bookSchema.validate(book)