"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _express = require("express");

var router = new _express.Router();

router.get('/', function (req, res) {
  res.send(req.context.models.users[req.context.me.id]);
});var _default =

router;exports["default"] = _default;
//# sourceMappingURL=session.js.map