const { customers } = require("../models");
const { isNumeric } = require("../util");

module.exports = {
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
            throw new Error("The provided id is not numeric");
        }

        const customer = customers.find(customer => customer.id === id);

        if (!customer) {
            throw new Error("The customer with provided id does not exist");
        }

        return customer;
    },
    update: ({ id, body }) => {
        id = isNumeric(id) && parseInt(id);

        if (!id) {
            throw new Error("The provided id is not numeric");
        }

        const customer = customers.find(customer => customer.id === id);

        if (!customer) {
            throw new Error("The customer with provided id does not exist");
        }

        Object.assign(customer, body);

        return customer;
    },
    delete: ({ id }) => {
        id = isNumeric(id) && parseInt(id);

        if (!id) {
            throw new Error("The provided id is not numeric");
        }

        const customer = customers.find(customer => customer.id === id);

        if (!customer) {
            throw new Error("The customer with provided id does not exist");
        }

        const index = customers.indexOf(customer);

        customers.splice(index, 1);

        return customer;
    }
};