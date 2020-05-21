"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _routes = _interopRequireDefault(require("./routes"));
var _models = _interopRequireDefault(require("./models"));

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;

app.use((0, _cors["default"])()); // enabling CORS(Cross-origin resource sharing) for all requests
app.use((0, _helmet["default"])()); // adding Helmet to enhance your API's security
app.use(_bodyParser["default"].json()); // using bodyParser to parse JSON bodies into JS objects
app.use((0, _morgan["default"])('combined')); // adding morgan to log HTTP requests
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({ extended: true }));
app.use(_express["default"]["static"](__dirname + '/resources'));

app.use(function (req, res, next) {
  req.context = {
    models: _models["default"],
    me: _models["default"].users[1] };


  next();
});

app.use('/session', _routes["default"].session);
app.use('/users', _routes["default"].user);
app.use('/messages', _routes["default"].message);

app.listen(port, function () {
  console.log("Listening at http://localhost:".concat(port));
});
//# sourceMappingURL=app.js.map