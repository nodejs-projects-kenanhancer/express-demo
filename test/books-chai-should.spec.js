const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../srcV4/app");

const should = chai.should();
chai.use(chaiHttp);

describe("Books API", () => {

    describe("GET /api/books", () => {
        it("it should GET all the books", (done) => {
            chai.request(app)
                .get("/api/books")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(4);
                    done();
                });
        });

        it("it should not GET all the books", (done) => {
            chai.request(app)
                .get("/api/book")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("POST /api/books", (done) => {
        it("it should POST a new book", (done) => {
            const book = {
                // id: 1,
                title: "Head First Python",
                author: "Paul Barry",
                year: 2016,
                pages: 624
            };

            chai.request(app)
                .post("/api/books")
                .send(book)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').above(1);
                    res.body.should.have.property('title');
                    res.body.should.have.property('author');
                    res.body.should.have.property('year');
                    res.body.should.have.property('pages');

                    chai.request(app)
                        .get(`/api/books/${res.body.id}`)
                        .end((err2, res2) => {
                            res2.should.have.status(200);
                            res2.body.should.be.a('object');
                            res2.body.should.deep.equal({ id: res.body.id, ...book });
                            done();
                        });
                });
        });

        it("it should NOT POST a new book without pages field", (done) => {
            const book = {
                title: "Head First Learn to Code",
                author: "Eric Freeman",
                year: 2018
            };

            chai.request(app)
                .post("/api/books")
                .send(book)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.equal(`"pages" is required`);

                    done();
                });
        });
    });

    describe("GET /api/books/:id", (done) => {
        it("it should GET a book by the given id", (done) => {
            const bookId = 1;

            chai.request(app)
                .get(`/api/books/${bookId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eql(bookId);
                    res.body.should.have.property('title');
                    res.body.should.have.property('author');
                    res.body.should.have.property('year');
                    res.body.should.have.property('pages');
                    done();
                });
        });

        it("it should NOT GET a book by the given id", (done) => {
            const bookId = 38;

            chai.request(app)
                .get(`/api/books/${bookId}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');

                    done();
                });
        });
    });

    describe("PUT /api/books/:id", (done) => {
        it("it should REPLACE a book given the id", (done) => {
            const bookId = 1;

            const book = {
                // id: 1,
                title: "Head First C",
                author: "David Griffiths, Dawn Griffiths",
                year: 2012,
                pages: 632
            };

            chai.request(app)
                .put(`/api/books/${bookId}`)
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.deep.equal({ id: bookId, ...book });

                    chai.request(app)
                        .get(`/api/books/${bookId}`)
                        .end((err2, res2) => {
                            res2.should.have.status(200);
                            res2.body.should.be.a('object');
                            res2.body.should.deep.equal({ id: bookId, ...book });
                            done();
                        });
                });
        });
    });

    describe("PATCH /api/books/:id", () => {
        it("it should UPDATE a book given the id", (done) => {
            const bookId = 1;

            const book = {
                // id: 1,
                title: "Head First C",
                author: "David Griffiths, Dawn Griffiths",
                year: 2012,
                pages: 632
            };

            chai.request(app)
                .patch(`/api/books/${bookId}`)
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.deep.equal({ id: bookId, ...book });

                    chai.request(app)
                        .get(`/api/books/${bookId}`)
                        .end((err2, res2) => {
                            res2.should.have.status(200);
                            res2.body.should.be.a('object');
                            res2.body.should.deep.equal({ id: bookId, ...book });
                            done();
                        });
                });
        });
    });

    describe("DELETE /api/books/:id", (done) => {
        it("it should DELETE a book given the id", (done) => {
            const bookId = 1;

            chai.request(app)
                .delete(`/api/books/${bookId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");

                    chai.request(app)
                        .get(`/api/books/${bookId}`)
                        .end((err2, res2) => {
                            res2.should.have.status(404);
                            done();
                        });
                });
        });
    });

});