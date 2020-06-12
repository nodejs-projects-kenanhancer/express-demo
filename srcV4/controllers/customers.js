module.exports = ({
    customers = require("../models").customersProvider(),
    isNumeric = require("../helpers/util").isNumeric,
    createError = require("../helpers/util").createError,
    errors = require("../constants/errors")
}) =>
    ({
        create: ({ body }) => {
            const newCustomer = { id: customers.length + 1, ...body };

            customers.push(newCustomer);

            return newCustomer;
        },
        findAll: () => {
            return customers;
        },
        find: ({ id }) => {
            id = isNumeric(id) && parseInt(id);

            if (!id) {
                throw createError(errors.ID_IS_NOT_NUMERIC);
            }

            const customer = customers.find(customer => customer.id === id);

            if (!customer) {
                // throw new Error(errors.CUSTOMER_DOES_NOT_EXISTS);
                throw createError(errors.CUSTOMER_DOES_NOT_EXISTS);
            }

            return customer;
        },
        update: ({ id, body }) => {
            id = isNumeric(id) && parseInt(id);

            if (!id) {
                throw errors.ID_IS_NOT_NUMERIC;
            }

            const customer = customers.find(customer => customer.id === id);

            if (!customer) {
                throw errors.CUSTOMER_DOES_NOT_EXISTS;
            }

            Object.assign(customer, body);

            return customer;
        },
        delete: ({ id }) => {
            id = isNumeric(id) && parseInt(id);

            if (!id) {
                throw createError(errors.ID_IS_NOT_NUMERIC);
            }

            const customer = customers.find(customer => customer.id === id);

            if (!customer) {
                throw createError(errors.CUSTOMER_DOES_NOT_EXISTS);
            }

            const index = customers.indexOf(customer);

            customers.splice(index, 1);

            return customer;
        }
    });