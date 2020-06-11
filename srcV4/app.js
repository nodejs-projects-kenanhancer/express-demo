const express = require("express");
const { usersRouter, tasksRouter, booksRouter, customersRouter } = require("./routes");

const { getBooks, postBook, getBook, replaceBook, updateBook, deleteBook } = booksRouter;



const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());



// 1. Way: usersRouter module export one function which returns
// new router.
app.use("/api/users", usersRouter());


// 2. Way: tasksRouter module exports one function that
// accepts express `app`. Everything is handled in this module.
tasksRouter(app);

customersRouter(app);



// 3. Way: booksRouter module exports functions 
// so that i can bind get, post, put etc methods with paths.
const bookRouter = express.Router();
bookRouter.get("/", getBooks).post("/", postBook);
bookRouter.get("/:id", getBook).put("/:id", replaceBook).patch("/:id", updateBook).delete("/:id", deleteBook);
app.use("/api/books", bookRouter);



// Error Handler
app.use((err, req, res, next) => {
    res.status(err.statusCode).send(err.message);
});


const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;