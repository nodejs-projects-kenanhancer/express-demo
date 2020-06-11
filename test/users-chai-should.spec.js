const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../srcV4/app");

const should = chai.should();
chai.use(chaiHttp);

describe("Users API", () => {

    let requester;

    before(() => {
        requester = chai.request(app).keepOpen();
    });

    after(() => {
        requester.close();
    });

    describe("GET /api/users", () => {
        it("it should GET all the users", (done) => {
            requester
                .get("/api/users")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.above(1);
                    done();
                });
        });

        it("it should not GET all the users", (done) => {
            requester
                .get("/api/user")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.deep.equal({});
                    done();
                });
        });
    });

    describe("POST /api/users", () => {
        it("it should POST a new user", (done) => {
            const user = {
                // id: 1,
                firstName: "Taner",
                lastName: "Yildirim",
                mail: "ty@hotmail.com",
                userName: "taneryildirim",
                password: "383843"
            };

            requester
                .post("/api/users")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').above(1);
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('mail');
                    res.body.should.have.property('userName');
                    res.body.should.have.property('password');

                    requester
                        .get(`/api/users/${res.body.id}`)
                        .end((err2, res2) => {
                            res2.should.have.status(200);
                            res2.body.should.be.a('object');
                            res2.body.should.deep.equal(res.body);
                            done();
                        });
                });
        });

        it("it should NOT POST a new user without password field", (done) => {
            const user = {
                // id: 1,
                firstName: "Taner",
                lastName: "Yildirim",
                mail: "ty@hotmail.com",
                userName: "taneryildirim"
            };

            requester
                .post("/api/users")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.equal(`"password" is required`)
                    done();
                });
        });
    });

    describe("GET /api/users/:id", () => {
        it("it should GET a user by the given id", (done) => {
            const userId = 1;

            requester
                .get(`/api/users/${userId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eql(userId);
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('mail');
                    res.body.should.have.property('userName');
                    res.body.should.have.property('password');
                    done();
                });
        });

        it("it should NOT GET a user by the given id", (done) => {
            const userId = 38;

            requester
                .get(`/api/users/${userId}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');

                    done();
                });
        });
    });

    describe("PUT /api/users/:id", () => {
        it("it should REPLACE a user given the id", (done) => {
            const userId = 1;

            const user = {
                // id: 1,
                firstName: "Hakki",
                lastName: "Cloud",
                mail: "hc@hotmail.com",
                userName: "hakkicloud",
                password: "883322"
            };

            requester
                .put(`/api/users/${userId}`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.deep.equal({ id: userId, ...user });

                    requester
                        .get(`/api/users/${userId}`)
                        .end((err2, res2) => {
                            res2.should.have.status(200);
                            res2.body.should.be.a('object');
                            res2.body.should.deep.equal({ id: userId, ...res.body });
                            done();
                        });
                });
        });
    });

    describe("DELETE /api/users/:id", () => {
        it("it should DELETE a user given the id", (done) => {
            const userId = 1;

            requester
                .delete(`/api/users/${userId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");

                    requester
                        .get(`/api/users/${userId}`)
                        .end((err2, res2) => {
                            res2.should.have.status(404);
                            done();
                        });
                });
        });
    });

});