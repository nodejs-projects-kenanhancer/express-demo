"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));var _uuid = require("uuid");
var _express = require("express");function _toPropertyKey(arg) {var key = _toPrimitive(arg, "string");return (0, _typeof2["default"])(key) === "symbol" ? key : String(key);}function _toPrimitive(input, hint) {if ((0, _typeof2["default"])(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {var res = prim.call(input, hint || "default");if ((0, _typeof2["default"])(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");}return (hint === "string" ? String : Number)(input);}

var router = new _express.Router();

router.get('/', function (req, res) {
  res.send(Object.values(req.context.models.messages));
});

router.get('/:messageId', function (req, res) {
  res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', function (req, res) {
  var id = uuidv4();
  var message = {
    id: id,
    text: req.body.text,
    userId: req.context.me.id };


  req.context.models.messages[id] = message;

  res.send(message);
});

router["delete"]('/:messageId', function (req, res) {var _req$context$models$m =



  req.context.models.messages,_req$params$messageId = req.params.messageId,message = _req$context$models$m[_req$params$messageId],otherMessages = (0, _objectWithoutProperties2["default"])(_req$context$models$m, [_req$params$messageId].map(_toPropertyKey));

  res.send(message);
});var _default =

router;exports["default"] = _default;
//# sourceMappingURL=message.js.map