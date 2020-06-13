module.exports = ({
    books = require("../repositories/book")({}),
    isNumeric = require("../helpers/util").isNumeric,
    createError = require("../helpers/util").createError,
    errors = require("../constants/errors")
}) =>
    ({
        find: async ({ id }) => {
            id = isNumeric(id) && parseInt(id);

            if (!id) {
                throw createError(errors.ID_IS_NOT_NUMERIC);
            }

            const book = await books.find(id);

            if (!book) {
                // throw new Error(errors.BOOK_DOES_NOT_EXISTS);
                throw createError(errors.BOOK_DOES_NOT_EXISTS);
            }

            return book;
        },
        create: async ({ body }) => await books.create({ data: body }),
        update: async ({ id, body }) => {
            id = isNumeric(id) && parseInt(id);

            if (!id) {
                throw errors.ID_IS_NOT_NUMERIC;
            }

            const book = await books.find({ id });

            if (!book) {
                throw errors.BOOK_DOES_NOT_EXISTS;
            }

            return await books.update({ id, data: body });
        },
        delete: async ({ id }) => {
            id = isNumeric(id) && parseInt(id);

            if (!id) {
                throw createError(errors.ID_IS_NOT_NUMERIC);
            }

            const book = await books.find({ id });

            if (!book) {
                throw createError(errors.BOOK_DOES_NOT_EXISTS);
            }

            return await books.delete({ id });
        }
    });