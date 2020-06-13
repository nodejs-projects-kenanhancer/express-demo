module.exports = ({
    app,
    validateBook = require('../validators/book-validator'),
    bookController = require('../controllers/book')({}),
    catchAsync = require('../helpers/util').catchAsync
}) => {

    app.use("/api/books", (req, res, next) => {
        const { method } = req;

        if (["POST", "PATCH", "PUT"].includes(method)) {
            const { error } = validateBook(req.body);

            if (error) {
                return res.status(400).send(error.message);
            }
        }

        next();
    });

    app.route("/api/books")
        .get(async (req, res) => {
            // const result = bookController.findAll({ ...req.params });

            res.status(200).send([]);
        })
        .post(async (req, res) => {
            const result = await bookController.create({ ...req.params, body: req.body });

            res.status(201).send(result);
        });


    app.route("/api/books/:id")
        .get(catchAsync(async (req, res, next) => {
            try {
                const result = await bookController.find({ ...req.params });
                res.status(200).send(result);
            }
            catch (err) {
                next(err);
            }
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