"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _express = require("express");

var router = new _express.Router();

router.get('/', function (req, res) {
  res.send(Object.values(req.context.models.users));
});

router.get('/:userId', function (req, res) {
  res.send(req.context.models.users[req.params.userId]);
});var _default =

router;exports["default"] = _default;
//# sourceMappingURL=user.js.map