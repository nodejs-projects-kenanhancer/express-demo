const express = require("express");
const { users } = require("../models");
const { validateUser, isNumeric } = require("../util");

module.exports = () => {
    const userRouter = express.Router();

    // middleware that is specific to this router
    userRouter.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now());
        next();
    });

    // GET /api/users
    userRouter.get("/", (req, res) => {
        res.json(users);
    });

    // GET /api/users/:id
    userRouter.get("/:id", (req, res) => {
        let { id: userId } = req.params;

        userId = isNumeric(userId) && parseInt(userId);

        if (!userId) {
            return res.status(400).send("The provided id is not numeric");
        }

        const user = users.find(user => user.id === userId);

        if (!user) {
            return res.status(404).send("The user with provided id does not exist");
        }

        res.json(user);
    });

    // POST /api/users
    userRouter.post("/", (req, res) => {
        const { error, value: body } = validateUser(req.body);

        if (error) {
            return res.status(400).send(error.message);
        }

        const newUser = { id: users.length + 1, ...body };

        users.push(newUser);

        res.send(newUser);
    });

    // PUT /api/users/:id
    userRouter.put("/:id", (req, res) => {
        let { id: userId } = req.params;

        userId = isNumeric(userId) && parseInt(userId);

        if (!userId) {
            return res.status(400).send("The provided id is not numeric");
        }

        const user = users.find(user => user.id === userId);

        if (!user) {
            return res.status(404).send("The user with provided id does not exist");
        }

        const { error, value: body } = validateUser(req.body);

        if (error) {
            return res.status(404).send(error.message);
        }

        Object.assign(user, body);

        res.json(user);
    });

    // PATCH /api/users/:id
    userRouter.patch("/:id", (req, res) => {
        
    });

    // DELETE /api/users/:id
    userRouter.delete("/:id", (req, res) => {
        let { id: userId } = req.params;

        userId = isNumeric(userId) && parseInt(userId);

        if (!userId) {
            return res.status(400).send("The provided id is not numeric");
        }

        const user = users.find(user => user.id === userId);

        if (!user) {
            return res.status(404).send("The user with provided id does not exist");
        }

        const index = users.indexOf(user);

        users.splice(index, 1);

        res.json(user);
    });

    return userRouter;
};