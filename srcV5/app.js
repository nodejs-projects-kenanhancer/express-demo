const express = require('express');

require('./dataSources/mongoDS');
require('./dataSources/redisDS');

const bookRouter = require('./routes/book');

const app = express();

const port = process.env.PORT || 3000;

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