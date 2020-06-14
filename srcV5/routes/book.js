module.exports = ({
    app,
    validateBook = require('../validators/book-validator'),
    bookController = require('../controllers/book')({}),
    catchAsync = require('../helpers/util').catchAsync,
    tryCatch = require('../helpers/util').tryCatch
}) => {

    app.use("/api/books", (req, res, next) => {
        const { method } = req;

        if (["POST", "PATCH", "PUT"].includes(method)) {
            const { error } = validateBook(req.body);

            if (error) {
                // this will return response to client directly
                // return res.status(400).send(error.message);
                error.statusCode = 400;

                // this will call error middleware in `app.js`
                next(error);
            }
        }

        next();
    });

    app.route("/api/books")
        .get(async (req, res) => {
            const result = await bookController.findAll({ ...req.params });

            res.status(200).send(result);
        })
        .post(catchAsync(async (req, res) => {
            const result = await bookController.create({ ...req.params, body: req.body });

            res.status(201).send(result);
        }));

    app.route("/api/books/:id")
        .get(catchAsync(async (req, res, next) => {
            const result = await bookController.find({ ...req.params });
            // .then(response => res.status(200).send(response));
            // .catch(error => {
            //     console.log('d');
            //     next(error);
            // });

            res.status(200).send(result);
        }))
        .put(async (req, res) => {
            const result = await bookController.update({ ...req.params, body: req.body });

            res.status(200).send(result);
        })
        .delete(async (req, res) => {
            const result = await bookController.delete({ ...req.params, body: req.body });

            res.status(200).send(result);
        });

};