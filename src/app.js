require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const models = require('./models');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // enabling CORS(Cross-origin resource sharing) for all requests
app.use(helmet()); // adding Helmet to enhance your API's security
app.use(bodyParser.json()); // using bodyParser to parse JSON bodies into JS objects
app.use(morgan('combined')); // adding morgan to log HTTP requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/static', express.static(path.join(__dirname, 'public')));

app.get("/homepage", (req, res) => {
    res.render("homepage", {
        user: req.user,
        vegetables: [
            "carrot",
            "potato",
            "beet"
        ]
    });
});

app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1]
    };

    next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});