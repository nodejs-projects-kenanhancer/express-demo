const { books } = require("../models");
const { validateBook, isNumeric } = require("../util");

/*
 * GET /api/books to retrieve all the books
 */
const getBooks = (req, res) => {
    res.json(books);
};

/*
 * POST /api/books to save a new book
 */
const postBook = (req, res) => {
    const { error, value: body } = validateBook(req.body);

    if (error) {
        return res.status(404).send(error.message);
    }

    const newBook = { id: books.length + 1, ...body };

    books.push(newBook);

    res.send(newBook);
};

/*
 * GET /api/books/:id to retrieve a book given its id
 */
const getBook = (req, res) => {
    let { id: bookId } = req.params;

    bookId = isNumeric(bookId) && parseInt(bookId);

    if (!bookId) {
        return res.status(404).send("The provided id is not numeric");
    }

    const book = books.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).send("The book with provided id does not exist");
    }

    res.json(book);
};

/*
 * PUT /api/books/:id to replace a book given its id
 */
const replaceBook = (req, res) => {
    let { id: bookId } = req.params;

    bookId = isNumeric(bookId) && parseInt(bookId);

    if (!bookId) {
        return res.status(400).send("The provided id is not numeric");
    }

    const book = books.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).send("The book with provided id does not exist");
    }

    const { error, value: body } = validateBook(req.body);

    if (error) {
        return res.status(404).send(error.message);
    }

    Object.assign(book, body);

    res.json(book);
};

/*
 * PATCH /api/books/:id to update a book given its id
 */
const updateBook = (req, res) => {
    let { id: bookId } = req.params;

    bookId = isNumeric(bookId) && parseInt(bookId);

    if (!bookId) {
        return res.status(400).send("The provided id is not numeric");
    }

    const book = books.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).send("The book with provided id does not exist");
    }

    const { error, value: body } = validateBook(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }

    book.title = body.title;
    book.author = body.author;
    book.author = body.author;
    book.year = body.year;
    book.pages = body.pages;

    res.send(book);
};

/*
 * DELETE /api/books/:id to delete a book given its id
 */
const deleteBook = (req, res) => {
    let { id: bookId } = req.params;

    bookId = isNumeric(bookId) && parseInt(bookId);

    if (!bookId) {
        return res.status(404).send("The provided id is not numeric");
    }

    const book = books.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).send("The book with provided id does not exist");
    }

    const index = books.indexOf(book);

    books.splice(index, 1);

    res.send(book);
};

module.exports = { getBooks, postBook, getBook, replaceBook, updateBook, deleteBook };