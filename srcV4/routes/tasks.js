const { tasksProvider } = require("../models");
const { isNumeric } = require("../helpers/util");
const { validateTask } = require("../validators/task-validator");

module.exports = (app) => {

    // middleware that is specific to `/api/tasks` path
    // so if we want to intercept all starting with `/api/tasks` path, 
    // we should use this way
    // app.use("/api/tasks", (req, res, next) => {
    //     console.log("Tasks middleware time is ", Date.now());
    //     next();
    // });

    let tasks = tasksProvider();

    app.route("/api/tasks")
        // middleware that is specific to this router
        .all((req, res, next) => {
            // console.log("*** Tasks middleware time is ", Date.now());
            next();
        })
        .get((req, res) => {
            res.send(tasks);
        })
        .post((req, res) => {
            const { error, value: body } = validateTask(req.body);

            if (error) {
                return res.status(400).send(error.message);
            }

            const newTask = { id: tasks.length + 1, ...body };

            tasks.push(newTask);

            res.status(201).send(newTask);
        });






    app.route("/api/tasks/:id")
        .get((req, res) => {
            let { id: taskId } = req.params;

            taskId = isNumeric(taskId) && parseInt(taskId);

            if (!taskId) {
                return res.status(400).send("The provided id is not numeric");
            }

            const task = tasks.find(task => task.id === taskId);

            if (!task) {
                return res.status(404).send("The task with provided id does not exist");
            }

            res.send(task);
        })
        .delete((req, res) => {
            let { id: taskId } = req.params;

            taskId = isNumeric(taskId) && parseInt(taskId);

            if (!taskId) {
                return res.status(404).send("The provided id is not numeric");
            }

            const task = tasks.find(task => task.id === taskId);

            if (!task) {
                return res.status(400).send("The task with provided id does not exist");
            }

            const index = tasks.indexOf(task);

            tasks.splice(index, 1);

            res.send(task);
        })
        .put((req, res) => {
            let { id: taskId } = req.params;

            taskId = isNumeric(taskId) && parseInt(taskId);

            if (!taskId) {
                return res.status(404).send("The provided id is not numeric");
            }

            const task = tasks.find(task => task.id === taskId);

            if (!task) {
                return res.status(404).send("The task with provided id does not exist");
            }

            const { error, value: body } = validateTask(req.body);

            if (error) {
                return res.status(400).send(error.message);
            }

            Object.assign(task, body);

            res.send(task);
        })
        .patch((req, res) => {
            let { id: taskId } = req.params;

            taskId = isNumeric(taskId) && parseInt(taskId);

            if (!taskId) {
                return res.status(404).send("The provided id is not numeric");
            }

            const task = tasks.find(task => task.id === taskId);

            if (!task) {
                return res.send(404).send("The task with provided id does not exist");
            }

            const { error, value: body } = validateTask(req.body);

            if (error) {
                return res.status(400).send(error.message);
            }

            task.name = body.name;

            if (body.completed) {
                task.completed = true;
            }

            res.send(task);
        });
};