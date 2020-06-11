const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../srcV4/app");

const should = chai.should();
chai.use(chaiHttp);

describe("Customers API", () => {

    let requester;

    before(() => {
        requester = chai.request(app).keepOpen();
    });

    after(() => {
        requester.close();
    });

    describe("GET /api/customers", () => {
        it("it should GET all the customers", (done) => {
            requester
                .get("/api/customers")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.above(1);
                    done();
                });
        });

        it("it should not GET all the customers", (done) => {
            requester
                .get("/api/customer")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.deep.equal({});
                    done();
                });
        });
    });

    describe("POST /api/customers", () => {
        it("it should POST a new customer", (done) => {
            const customer = {
                // id: 1,
                firstName: "Haydar",
                lastName: "Bas",
                age: 55
            };

            requester
                .post("/api/customers")
                .send(customer)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').above(1);
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('age');

                    requester
                        .get(`/api/customers/${res.body.id}`)
                        .end((err2, res2) => {
                            res2.should.have.status(200);
                            res2.body.should.be.a('object');
                            res2.body.should.deep.equal(res.body);
                            done();
                        });
                });
        });

        it("it should NOT POST a new customer without age field", (done) => {
            const customer = {
                // id: 1,
                firstName: "Kadir",
                lastName: "Tatar"
            };

            requester
                .post("/api/customers")
                .send(customer)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.equal(`"age" is required`)
                    done();
                });
        });
    });

    describe("GET /api/customers/:id", () => {
        it("it should GET a customer by the given id", (done) => {
            const customerId = 1;

            requester
                .get(`/api/customers/${customerId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eql(customerId);
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('age');
                    done();
                });
        });

        it("it should NOT GET a customer by the given id", (done) => {
            const customerId = 38;

            requester
                .get(`/api/customers/${customerId}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');

                    done();
                });
        });
    });

    describe("PUT /api/customers/:id", () => {
        it("it should REPLACE a customer given the id", (done) => {
            const customerId = 1;

            const customer = {
                // id: 1,
                firstName: "Yakup",
                lastName: "Balta",
                age: 37
            };

            requester
                .put(`/api/customers/${customerId}`)
                .send(customer)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.deep.equal({ id: customerId, ...customer });

                    requester
                        .get(`/api/customers/${customerId}`)
                        .end((err2, res2) => {
                            res2.should.have.status(200);
                            res2.body.should.be.a('object');
                            res2.body.should.deep.equal({ id: customerId, ...res.body });
                            done();
                        });
                });
        });
    });

    describe("DELETE /api/customers/:id", () => {
        it("it should DELETE a customer given the id", (done) => {
            const customerId = 1;

            requester
                .delete(`/api/customers/${customerId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");

                    requester
                        .get(`/api/customers/${customerId}`)
                        .end((err2, res2) => {
                            res2.should.have.status(404);
                            done();
                        });
                });
        });
    });

});