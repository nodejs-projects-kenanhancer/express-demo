const express = require('express');
const { validateTask } = require('./task-util');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const tasks = [
    {
        id: 1,
        name: "Task 1",
        completed: false
    },
    {
        id: 2,
        name: "Task 2",
        completed: false
    },
    {
        id: 3,
        name: "Task 3",
        completed: false
    }
];

const isNumeric = (value) => {
    if (value.match(/^-{0,1}\d+$/)) {
        //valid integer (positive or negative)
        return true;
    } else if (value.match(/^\d+\.\d+$/)) {
        //valid float
        return true;
    } else {
        //not valid number
        return false;
    }
};


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

// DELETE


app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;