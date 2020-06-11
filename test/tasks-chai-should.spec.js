const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../srcV4/app");

const should = chai.should();
chai.use(chaiHttp);

describe("Tasks API", () => {

    let requester;

    before(() => {
        requester = chai.request(app).keepOpen();
    });

    after(() => {
        requester.close();
    });

    describe("GET /api/tasks", () => {
        it("it should GET all the tasks", (done) => {
            requester
                .get("/api/tasks")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.above(1);
                    done();
                });
        });

        it("it should not GET all the tasks", (done) => {
            requester
                .get("/api/task")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.deep.equal({});
                    done();
                });
        });
    });

    describe("POST /api/tasks", () => {
        it("it should POST a new task", (done) => {
            const task = {
                // id: 1,
                name: "Task 4",
                completed: false
            };

            requester
                .post("/api/tasks")
                .send(task)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').above(1);
                    res.body.should.have.property('name');
                    res.body.should.have.property('completed').equal(false);

                    requester
                        .get(`/api/tasks/${res.body.id}`)
                        .end((err2, res2) => {
                            res2.should.have.status(200);
                            res2.body.should.be.a('object');
                            res2.body.should.deep.equal({ id: res.body.id, ...task });
                            done();
                        })
                });
        });

        it("it should NOT POST a new task without completed field", (done) => {
            const task = {
                name: "Task 5"
            };

            requester
                .post("/api/tasks")
                .send(task)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.equal(`"completed" is required`)
                    done();
                });
        });
    });

    describe("GET /api/tasks/:id", () => {
        it("it should GET a task by the given id", (done) => {
            const taskId = 1;

            requester
                .get(`/api/tasks/${taskId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eql(taskId);
                    res.body.should.have.property('name');
                    res.body.should.have.property('completed');
                    done();
                });
        });

        it("it should NOT GET a task by the given id", (done) => {
            const taskId = 38;

            requester
                .get(`/api/tasks/${taskId}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');

                    done();
                });
        });
    });

    describe("PUT /api/tasks/:id", () => {
        it("it should REPLACE a task given the id", (done) => {
            const taskId = 1;

            const task = {
                // id: 1,
                name: "Task 4",
                completed: false
            };

            requester
                .put(`/api/tasks/${taskId}`)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.deep.equal({ id: taskId, ...task });
                    done();
                });
        });
    });

    describe("PATCH /api/tasks/:id", () => {
        it("it should UPDATE a task given the id", (done) => {
            const taskId = 1;

            const task = {
                // id: 1,
                name: "Task 4",
                completed: false
            };

            requester
                .patch(`/api/tasks/${taskId}`)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.deep.equal({ id: taskId, ...task });

                    requester
                        .get(`/api/tasks/${taskId}`)
                        .end((err2, res2) => {
                            res2.should.have.status(200);
                            res2.body.should.be.a('object');
                            res2.body.should.deep.equal({ id: taskId, ...res.body });
                            done();
                        });
                });
        });
    });

    describe("DELETE /api/tasks/:id", () => {
        it("it should DELETE a task given the id", (done) => {
            const taskId = 1;

            requester
                .delete(`/api/tasks/${taskId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");

                    requester
                        .get(`/api/tasks/${taskId}`)
                        .end((err2, res2) => {
                            res2.should.have.status(404);
                            done();
                        });
                });
        });
    });

});