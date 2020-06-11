const customersController = require("../controllers/customers")({});
const { validateCustomer } = require("../validators/customer-validator");

module.exports = (app) => {

    app.use("/api/customers", (req, res, next) => {
        const { method } = req;

        if (["POST", "PATCH", "PUT"].includes(method)) {
            const { error } = validateCustomer(req.body);

            if (error) {
                return res.status(400).send(error.message);
            }
        }

        next();
    });

    app.route("/api/customers")
        .get((req, res) => {
            const result = customersController.findAll({ ...req.params });

            res.status(200).send(result);
        })
        .post((req, res) => {
            const result = customersController.create({ ...req.params, body: req.body });

            res.status(201).send(result);
        });


    app.route("/api/customers/:id")
        .get((req, res) => {
            const result = customersController.find({ ...req.params });

            res.status(200).send(result);
        })
        .put((req, res) => {
            const result = customersController.update({ ...req.params, body: req.body });

            res.status(200).send(result);
        })
        .delete((req, res) => {
            const result = customersController.delete({ ...req.params, body: req.body });

            res.status(200).send(result);
        });


};