const Joi = require('@hapi/joi');

const taskSchema = Joi.object({
    name: Joi.string()
        // .alphanum()
        .min(3).max(30).required(),
    completed: Joi.boolean().required()
});

module.exports.validateTask = (task) => taskSchema.validate(task)