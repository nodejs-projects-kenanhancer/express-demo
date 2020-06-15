module.exports = ({
    books = require("../repositories/book")({}),
    errors = require("../constants/errors")
}) =>
    ({
        find: async ({ id }) => {
            const book = await books.find(id);

            if (!book) {
                throw errors.BOOK_DOES_NOT_EXISTS;
            }

            return book;
        },
        create: async ({ body }) => {
            await books.create(body);
        },
        update: async ({ id, body }) => {
            const book = await books.find(id);

            if (!book) {
                throw errors.BOOK_DOES_NOT_EXISTS;
            }

            return await books.update(id, body);
        },
        delete: async ({ id }) => {
            const book = await books.find(id);

            if (!book) {
                throw errors.BOOK_DOES_NOT_EXISTS;
            }

            return await books.delete(id);
        }
    });