"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.teamIndexes = exports.emojis = exports.pugEvents = exports.offline = exports.captainTimeout = exports.tagLength = exports.strongPlayerRatingThreshold = exports.teamEmojis = exports.teams = exports.privilegedRoles = exports.prefix = void 0;
var prefix = '.';
exports.prefix = prefix;
var privilegedRoles = ['Admins', 'Moderators'];
exports.privilegedRoles = privilegedRoles;
var teams = {
  team_0: 'Red Team',
  team_1: 'Blue Team',
  team_2: 'Green Team',
  team_3: 'Gold Team',
  team_255: 'Players',
  spec: 'Spectators'
};
exports.teams = teams;
var teamEmojis = {
  team_0: '<:AGONY:610820370617991198>',
  team_1: '<:FROSTAGONY:610820381778903052>',
  team_2: '<:DISGUSTAGONY:610820391786774546>',
  team_3: '<:GOLDENAGONY:610826861165150221>'
};
exports.teamEmojis = teamEmojis;
var strongPlayerRatingThreshold = 3.5;
exports.strongPlayerRatingThreshold = strongPlayerRatingThreshold;
var tagLength = 30;
exports.tagLength = tagLength;
var captainTimeout = 30000;
exports.captainTimeout = captainTimeout;
var offline = 'unplugged';
exports.offline = offline;
var pugEvents = {
  captainsReady: 'captainsReady'
};
exports.pugEvents = pugEvents;
var emojis = {
  moskva: '<:moskva:610047429634686976>',
  tearddy: '<:tearddy:601092340865564673>',
  pupcurn: '<a:pupcurn:610049697402454016>',
  residentsleeper: '<:residentsleeper:601092229343215646>',
  trumpXD: '<:trumpXD:610050412749258754>',
  smart: '<:smart:601094351770353664>',
  bannechu: '<:bannechu:601092624962682881>',
  peepoComfy: '<:peepoComfy:626060643895607296>'
};
exports.emojis = emojis;
var teamIndexes = {
  red: 0,
  blue: 1,
  green: 2,
  gold: 3
};
exports.teamIndexes = teamIndexes;
//# sourceMappingURL=constants.js.map