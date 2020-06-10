const Joi = require('@hapi/joi');

const taskSchema = Joi.object({
    name: Joi.string()
        // .alphanum()
        .min(3).max(30).required(),
    completed: Joi.boolean()
});

const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    mail: Joi.string().email().required(),
    userName: Joi.string().required(),
    password: Joi.string().required()
});

const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    mail: Joi.string().email().required(),
    year: Joi.number().required(),
    pages: Joi.number().required()
});

const customerSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    age: Joi.number().required()
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
    validateUser: (user) => userSchema.validate(user),
    validateBook: (book) => bookSchema.validate(book),
    validateCustomer: (customer) => customerSchema.validate(customer),
    isNumeric
};