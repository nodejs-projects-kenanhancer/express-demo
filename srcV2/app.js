import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';
import models from './models';

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
})