"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leaveAllGameTypes = exports.leaveGameTypes = exports.joinGameTypes = exports.listAllCurrentGameTypes = exports.listGameTypes = exports.delGameType = exports.addGameType = void 0;

var _store = _interopRequireDefault(require("../store"));

var _models = require("../models");

var _utils = require("../utils");

var _constants = require("../constants");

var _formats = require("../formats");

var _actions = require("../store/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Pug =
/*#__PURE__*/
function () {
  function Pug(_ref) {
    var name = _ref.name,
        noOfPlayers = _ref.noOfPlayers,
        noOfTeams = _ref.noOfTeams,
        pickingOrder = _ref.pickingOrder;

    _classCallCheck(this, Pug);

    this.name = name;
    this.noOfPlayers = noOfPlayers;
    this.noOfTeams = noOfTeams;
    this.pickingOrder = pickingOrder;
    this.turn = 0;
    this.picking = false;
    this.players = [];
    this.captains = [];
    this.timer = null;
  } // 0 if couldn't join, 1 if joined, 2 if already in


  _createClass(Pug, [{
    key: "addPlayer",
    value: function addPlayer(user) {
      if (!this.picking) {
        if (this.findPlayer(user)) return 2;
        this.players.push(_objectSpread({
          team: null,
          captain: null,
          pick: null,
          tag: null,
          rating: 0
        }, user));
        this.players.length === this.noOfPlayers ? this.fillPug() : null;
        return 1;
      }

      return 0;
    }
  }, {
    key: "removePlayer",
    value: function removePlayer(user) {
      var playerIndex = this.players.findIndex(function (p) {
        return p.id === user.id;
      });
      this.players.splice(playerIndex, 1);
      if (this.picking) this.stopPug();
    }
  }, {
    key: "fillPug",
    value: function fillPug() {
      var _this = this;

      this.picking = true;
      this.timer = setTimeout(function () {
        var remaining = _this.noOfPlayers - _this.captains.length;

        var playersWithoutCaptain = _this.noOfPlayers.filter(function (p) {
          return p.captain === null;
        });

        var poolForCaptains = (0, _utils.shuffle)(playersWithoutCaptain).slice(0, remaining * 0.8).sort(function (a, b) {
          return a.rating - b.rating;
        }); //  TODO
      }, _constants.captainTimeout);
    }
  }, {
    key: "stopPug",
    value: function stopPug() {
      this.cleanup();
    }
  }, {
    key: "findPlayer",
    value: function findPlayer(user) {
      return this.players.find(function (u) {
        return u.id === user.id;
      });
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.players.length === 0 ? true : false;
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      //  TODO
      this.picking = false;
      this.turn = 0;
      this.captains = [];
      this.players.forEach(function (user) {
        return user.captain = user.team = user.pick = null;
      });
      clearTimeout(this.timer);
    }
  }]);

  return Pug;
}();

var addGameType =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2, _ref3, serverId, _ref4) {
    var channel, _ref6, gameName, noOfPlayers, noOfTeams, roles, state, gameTypes, pickingOrder, newGameType;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            channel = _ref2.channel;
            _ref6 = _slicedToArray(_ref3, 3), gameName = _ref6[0], noOfPlayers = _ref6[1], noOfTeams = _ref6[2];
            roles = _ref4.roles;
            _context.prev = 3;

            if ((0, _utils.hasPrivilegedRole)(_constants.privilegedRoles, roles)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            if (!(isNaN(noOfPlayers) || isNaN(noOfTeams) || !gameName)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", channel.send('Invalid command'));

          case 8:
            state = _store["default"].getState();
            gameTypes = state.pugs[serverId].gameTypes;

            if (!gameTypes.some(function (g) {
              return g.name === gameName.toLowerCase();
            })) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", channel.send('Gametype already exists'));

          case 12:
            pickingOrder = (0, _utils.computePickingOrder)(parseInt(noOfPlayers), parseInt(noOfTeams));

            if (pickingOrder) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", channel.send('Invalid No. of players/teams. Picking order cannot be computed'));

          case 15:
            newGameType = {
              name: gameName.toLowerCase(),
              pickingOrder: pickingOrder,
              noOfPlayers: parseInt(noOfPlayers),
              noOfTeams: parseInt(noOfTeams)
            };
            _context.next = 18;
            return _models.GameTypes.findOneAndUpdate({
              server_id: serverId
            }, {
              $push: {
                game_types: newGameType
              }
            }).exec();

          case 18:
            _store["default"].dispatch((0, _actions.assignGameTypes)({
              serverId: serverId,
              gameTypes: [].concat(_toConsumableArray(game_types), [newGameType])
            }));

            channel.send("**".concat(gameName, "** has been added"));
            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](3);
            channel.send('Something went wrong');
            console.log(_context.t0);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 22]]);
  }));

  return function addGameType(_x, _x2, _x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();

exports.addGameType = addGameType;

var delGameType =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref7, _ref8, serverId, _ref9) {
    var channel, _ref11, gameName, rest, roles, state, gameTypes, updatedGameTypes;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            channel = _ref7.channel;
            _ref11 = _toArray(_ref8), gameName = _ref11[0], rest = _ref11.slice(1);
            roles = _ref9.roles;
            _context2.prev = 3;

            if ((0, _utils.hasPrivilegedRole)(_constants.privilegedRoles, roles)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return");

          case 6:
            state = _store["default"].getState();
            gameTypes = state.pugs[serverId].gameTypes;

            if (gameTypes.some(function (g) {
              return g.name === gameName.toLowerCase();
            })) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", channel.send("Gametype doesn't exist"));

          case 10:
            updatedGameTypes = gameTypes.filter(function (g) {
              return g.name !== gameName.toLowerCase();
            });
            _context2.next = 13;
            return _models.GameTypes.findOneAndUpdate({
              server_id: serverId
            }, {
              game_types: updatedGameTypes
            }).exec();

          case 13:
            _store["default"].dispatch((0, _actions.assignGameTypes)({
              serverId: serverId,
              gameTypes: updatedGameTypes
            }));

            channel.send("**".concat(gameName, "** has been removed"));
            _context2.next = 21;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](3);
            channel.send('Something went wrong');
            console.log(_context2.t0);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 17]]);
  }));

  return function delGameType(_x5, _x6, _x7, _x8) {
    return _ref10.apply(this, arguments);
  };
}();

exports.delGameType = delGameType;

var listGameTypes =
/*#__PURE__*/
function () {
  var _ref13 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref12, _, serverId, __) {
    var channel, state, _state$pugs$serverId, pugChannel, gameTypes, list, tempList, gamesList;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            channel = _ref12.channel;
            _context3.prev = 1;
            state = _store["default"].getState();
            _state$pugs$serverId = state.pugs[serverId], pugChannel = _state$pugs$serverId.pugChannel, gameTypes = _state$pugs$serverId.gameTypes, list = _state$pugs$serverId.list;

            if (!(pugChannel !== channel.id)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", channel.send("Active channel for pugs is <#".concat(pugChannel, ">")));

          case 6:
            tempList = gameTypes.map(function (g) {
              return {
                name: g.name,
                players: 0,
                maxPlayers: g.noOfPlayers
              };
            });
            gamesList = tempList.reduce(function (acc, curr) {
              var existingPug = list.find(function (p) {
                return p.name === curr.name;
              });

              if (existingPug) {
                acc.push({
                  name: existingPug.name,
                  maxPlayers: existingPug.noOfPlayers,
                  players: existingPug.players.length
                });
              } else {
                acc.push(curr);
              }

              return acc;
            }, []);
            channel.send((0, _formats.formatListGameTypes)(channel.guild.name, gamesList));
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);
            channel.send('Something went wrong');
            console.log(_context3.t0);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 11]]);
  }));

  return function listGameTypes(_x9, _x10, _x11, _x12) {
    return _ref13.apply(this, arguments);
  };
}();

exports.listGameTypes = listGameTypes;

var listAllCurrentGameTypes =
/*#__PURE__*/
function () {
  var _ref15 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref14, _, serverId, __) {
    var channel, state, _state$pugs$serverId2, pugChannel, list;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            channel = _ref14.channel;
            _context4.prev = 1;
            state = _store["default"].getState();
            _state$pugs$serverId2 = state.pugs[serverId], pugChannel = _state$pugs$serverId2.pugChannel, list = _state$pugs$serverId2.list;

            if (!(pugChannel !== channel.id)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", channel.send("Active channel for pugs is <#".concat(pugChannel, ">")));

          case 6:
            channel.send((0, _formats.formatListAllCurrentGameTypes)(list, channel.guild.name));
            _context4.next = 13;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            channel.send('Something went wrong');
            console.log(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));

  return function listAllCurrentGameTypes(_x13, _x14, _x15, _x16) {
    return _ref15.apply(this, arguments);
  };
}();

exports.listAllCurrentGameTypes = listAllCurrentGameTypes;

var joinGameTypes =
/*#__PURE__*/
function () {
  var _ref18 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref16, args, serverId, _ref17) {
    var channel, id, username, roles, state, _state$pugs$serverId3, pugChannel, list, gameTypes, isPartOfFilledPug, toBroadcast, user, statuses, allLeaveMsgs;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            channel = _ref16.channel;
            id = _ref17.id, username = _ref17.username, roles = _ref17.roles;
            _context5.prev = 2;
            state = _store["default"].getState();
            _state$pugs$serverId3 = state.pugs[serverId], pugChannel = _state$pugs$serverId3.pugChannel, list = _state$pugs$serverId3.list, gameTypes = _state$pugs$serverId3.gameTypes;

            if (!(pugChannel !== channel.id)) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", channel.send("Active channel for pugs is <#".concat(pugChannel, ">")));

          case 7:
            if (id) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", channel.send('No user was mentioned'));

          case 9:
            isPartOfFilledPug = list.find(function (p) {
              return p.picking && p.players.some(function (u) {
                return u.id === id;
              });
            });

            if (!isPartOfFilledPug) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", channel.send("Please leave **".concat(isPartOfFilledPug.name.toUpperCase(), "** first to join other pugs")));

          case 12:
            toBroadcast = null;
            user = {
              id: id,
              username: username,
              roles: roles
            };
            statuses = args.map(function (a) {
              if (!toBroadcast) {
                var game = a.toLowerCase();
                var gameType = gameTypes.find(function (g) {
                  return g.name === game;
                });
                if (!gameType) return {
                  user: user,
                  name: game,
                  joined: -1
                }; // -1 is for NOT FOUND

                var existingPug = list.find(function (p) {
                  return p.name === game;
                });
                var pug = existingPug || new Pug(gameType);
                var hasFilledBeforeJoining = pug.picking;
                var joined = pug.addPlayer(user);
                var hasFilledAfterJoining = pug.picking;

                if (!hasFilledBeforeJoining && hasFilledAfterJoining) {
                  toBroadcast = pug;
                }

                if (!existingPug && joined) {
                  _store["default"].dispatch((0, _actions.addNewPug)({
                    serverId: serverId,
                    newPug: pug
                  }));
                }

                return {
                  user: user,
                  joined: joined,
                  name: game,
                  activeCount: pug.players.length,
                  maxPlayers: pug.noOfPlayers
                };
              }
            });
            channel.send((0, _formats.formatJoinStatus)(statuses.filter(Boolean)));

            if (toBroadcast) {
              allLeaveMsgs = list.reduce(function (acc, op) {
                if (op.name !== toBroadcast.name) {
                  var allPugLeaveMsgs = toBroadcast.players.reduce(function (prev, player) {
                    if (op.findPlayer(player)) {
                      var msg = leaveGameTypes({
                        channel: channel
                      }, [op.name], serverId, user, null, true);
                      prev += "".concat(msg, " ");
                    }

                    return prev;
                  }, "");
                  acc += "".concat(allPugLeaveMsgs, " \n");
                }

                return acc;
              }, "");
              allLeaveMsgs && channel.send(allLeaveMsgs);
              channel.send((0, _formats.formatBroadcastPug)(toBroadcast));
            }

            _context5.next = 23;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5["catch"](2);
            channel.send('Something went wrong');
            console.log(_context5.t0);

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 19]]);
  }));

  return function joinGameTypes(_x17, _x18, _x19, _x20) {
    return _ref18.apply(this, arguments);
  };
}();

exports.joinGameTypes = joinGameTypes;

var leaveGameTypes =
/*#__PURE__*/
function () {
  var _ref21 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(_ref19, args, serverId, _ref20, isOffline, returnStatus) {
    var channel, id, username, roles, state, _state$pugs$serverId4, pugChannel, list, gameTypes, user, statuses, deadPugs, leaveStatus;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            channel = _ref19.channel;
            id = _ref20.id, username = _ref20.username, roles = _ref20.roles;
            _context6.prev = 2;
            state = _store["default"].getState();
            _state$pugs$serverId4 = state.pugs[serverId], pugChannel = _state$pugs$serverId4.pugChannel, list = _state$pugs$serverId4.list, gameTypes = _state$pugs$serverId4.gameTypes;

            if (!(pugChannel !== channel.id)) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", channel.send("Active channel for pugs is <#".concat(pugChannel, ">")));

          case 7:
            if (id) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", channel.send('No user was mentioned'));

          case 9:
            if (!(args.length === 0)) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", channel.send('Invalid, No pugs were mentioned'));

          case 11:
            user = {
              id: id,
              username: username,
              roles: roles
            };
            statuses = args.map(function (a) {
              var game = a.toLowerCase();
              var gameType = gameTypes.find(function (g) {
                return g.name === game;
              });
              if (!gameType) return {
                user: user,
                name: game,
                left: -1
              }; // -1 is for NOT FOUND

              var pug = list.find(function (p) {
                return p.name === game;
              });
              var isInPug = pug.findPlayer(user);

              if (isInPug) {
                pug.removePlayer(user);
                return {
                  user: user,
                  pug: pug,
                  name: game,
                  left: 1,
                  activeCount: pug.players.length,
                  maxPlayers: pug.noOfPlayers
                };
              }

              return {
                user: user,
                name: game,
                left: 0
              };
            }); // TODO Compute deadpugs

            deadPugs = statuses.reduce(function (acc, _ref22) {
              var user = _ref22.user,
                  pug = _ref22.pug,
                  name = _ref22.name,
                  activeCount = _ref22.activeCount,
                  maxPlayers = _ref22.maxPlayers;

              if (activeCount === maxPlayers - 1) {
                acc.push({
                  pug: pug,
                  user: user
                });
              }

              if (pug.isEmpty()) {
                _store["default"].dispatch((0, _actions.removePug)({
                  serverId: serverId,
                  name: name
                }));
              }

              return acc;
            }, []);
            leaveStatus = (0, _formats.formatLeaveStatus)(statuses, isOffline);

            if (!returnStatus) {
              _context6.next = 17;
              break;
            }

            return _context6.abrupt("return", leaveStatus);

          case 17:
            channel.send(leaveStatus);
            deadPugs.length > 0 ? channel.send(formatDeadPugs(deadPugs)) : null;
            _context6.next = 25;
            break;

          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6["catch"](2);
            channel.send('Something went wrong');
            console.log(_context6.t0);

          case 25:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 21]]);
  }));

  return function leaveGameTypes(_x21, _x22, _x23, _x24, _x25, _x26) {
    return _ref21.apply(this, arguments);
  };
}();

exports.leaveGameTypes = leaveGameTypes;

var leaveAllGameTypes =
/*#__PURE__*/
function () {
  var _ref23 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(message, args, serverId, user) {
    var state, _state$pugs$serverId5, pugChannel, list, hasGoneOffline, listToLeave;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            state = _store["default"].getState();
            _state$pugs$serverId5 = state.pugs[serverId], pugChannel = _state$pugs$serverId5.pugChannel, list = _state$pugs$serverId5.list;

            if (!(pugChannel !== message.channel.id)) {
              _context7.next = 5;
              break;
            }

            return _context7.abrupt("return", message.channel.send("Active channel for pugs is <#".concat(pugChannel, ">")));

          case 5:
            hasGoneOffline = args[0] === _constants.offline;
            listToLeave = list.reduce(function (acc, pug) {
              var isInPug = pug.findPlayer(user);

              if (isInPug) {
                acc.push(pug.name);
              }

              return acc;
            }, []);
            leaveGameTypes(message, listToLeave, serverId, user, hasGoneOffline);
            _context7.next = 14;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](0);
            message.channel.send('Something went wrong');
            console.log(_context7.t0);

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 10]]);
  }));

  return function leaveAllGameTypes(_x27, _x28, _x29, _x30) {
    return _ref23.apply(this, arguments);
  };
}();

exports.leaveAllGameTypes = leaveAllGameTypes;
//# sourceMappingURL=pugHandlers.js.map