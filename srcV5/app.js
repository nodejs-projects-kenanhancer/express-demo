const express = require('express');

const mongoose = require('mongoose');

const bookRouter = require('./routes/book');

const app = express();

const port = process.env.PORT || 3000;



const url = 'mongodb://127.0.0.1:27017/mongo-test-database';

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', _ => console.log('Database connected:', url));

db.on('error', err => console.error('connection error:', err));




app.use(express.json());

bookRouter({ app });

// Error Handler
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.message);
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

server.on("close", () => {
    console.log('Http server closed.');
});

// module.exports = server;