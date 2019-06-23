"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = _mongoose["default"].Schema({
  server_id: String,
  pug_channel: String,
  query_channel: String
});

var _default = _mongoose["default"].model('discord_servers', schema);

exports["default"] = _default;
//# sourceMappingURL=discordServers.js.map