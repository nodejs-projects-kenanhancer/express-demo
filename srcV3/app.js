const express = require('express');
const { validateTask, isNumeric } = require('./util');
const { tasks } = require("./model");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());



// GET /api/tasks
app.get("/api/tasks", (req, res) => {
    res.send(tasks);
});


// GET /api/tasks/:id
app.get("/api/tasks/:id", (req, res) => {
    let { id: taskId } = req.params;

    taskId = isNumeric(taskId) && parseInt(taskId);

    if (!taskId) {
        return res.status(404).send("The provided id is not numeric");
    }

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).send("The task with the provided id does not exist");
    }

    res.send(task);
});

// POST /api/tasks
app.post("/api/tasks", (req, res) => {
    const { error, value: body } = validateTask(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }

    const newTask = { id: tasks.length + 1, ...body };

    tasks.push(newTask);

    res.send(newTask);
});

// PUT /api/tasks/:id
app.put("/api/tasks/:id", (req, res) => {
    let { id: taskId } = req.params;

    taskId = isNumeric(taskId) && parseInt(taskId);

    if (!taskId) {
        return res.status(404).send("The provided id is not numeric");
    }

    let task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).send("The task with the provided id does not exist");
    }

    const { error, value: body } = validateTask(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }

    Object.assign(task, body);

    res.send(task);
});

// PATCH /api/tasks/:id
app.patch("/api/tasks/:id", (req, res) => {
    let { id: taskId } = req.params;

    taskId = isNumeric(taskId) && parseInt(taskId);

    if (!taskId) {
        return res.status(404).send("The provided id is not numeric");
    }

    let task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).send("The task with the provided id does not exists");
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

// DELETE /api/tasks/:id
app.delete("/api/tasks/:id", (req, res) => {
    let { id: taskId } = req.params;

    taskId = isNumeric(taskId) && parseInt(taskId);

    if (!taskId) {
        return res.status(404).send("The provided id is not numeric");
    }

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(400).send("The task with the provided id does not exists");
    }

    const index = tasks.indexOf(task);

    tasks.splice(index, 1);

    res.send(task);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;