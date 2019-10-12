import * as genericHandlers from './genericHandlers';
import * as ut99Handlers from './ut99Handlers';
import * as pugHandlers from './pugHandlers';

const emitters = {
  pugEventEmitter: pugHandlers.pugEventEmitter,
};

const handlers = {
  ...genericHandlers,
  ...ut99Handlers,
  ...pugHandlers,
};

const commands = [
  {
    key: 'registerServer',
    description: '',
    aliases: ['register'],
    solo: 1,
  },
  {
    key: 'registerQueryChannel',
    description: '',
    aliases: ['setquerychannel'],
    solo: 1,
  },
  {
    key: 'registerPugChannel',
    description: '',
    aliases: ['setpugchannel'],
    solo: 1,
  },
  {
    key: 'ignoreGroupCommands',
    description: '',
    aliases: ['ignoregroupcommands', 'igc'],
    solo: 0,
  },
  {
    key: 'unignoreGroupCommands',
    description: '',
    aliases: ['unignoregroupcommands', 'uigc', '-igc'],
    solo: 0,
  },
  {
    key: 'listGroupCommands',
    description: '',
    aliases: ['listgroupcommands', 'lgc'],
    solo: 1,
  },
  {
    group: 'query',
    key: 'addQueryServer',
    description: '',
    aliases: ['addqueryserver'],
    solo: 0,
  },
  {
    group: 'query',
    key: 'delQueryServer',
    description: '',
    aliases: ['delqueryserver'],
    solo: 0,
  },
  {
    group: 'query',
    key: 'queryUT99Server',
    description: '',
    aliases: ['q', 'query'],
    solo: 0,
  },
  {
    group: 'query',
    key: 'servers',
    description: '',
    aliases: ['servers'],
    solo: 1,
  },
  {
    group: 'pug',
    key: 'addGameType',
    description: '',
    aliases: ['addgametype', 'agm'],
    solo: 0,
  },
  {
    group: 'pug',
    key: 'delGameType',
    description: '',
    aliases: ['delgametype', 'dgm'],
    solo: 0,
  },
  {
    group: 'pug',
    key: 'listGameTypes',
    description: '',
    aliases: ['list', 'ls'],
    solo: 2,
  },
  {
    group: 'pug',
    key: 'listAllCurrentGameTypes',
    description: '',
    aliases: ['lsa'],
    solo: 1,
  },
  {
    group: 'pug',
    key: 'decideDefaultOrJoin',
    description: '',
    aliases: ['j', 'join'],
    solo: 2,
  },
  {
    group: 'pug',
    key: 'leaveGameTypes',
    description: '',
    aliases: ['l', 'leave'],
    solo: 0,
  },
  {
    group: 'pug',
    key: 'leaveAllGameTypes',
    description: '',
    aliases: ['lva'],
    solo: 1,
  },
  {
    group: 'pug',
    key: 'addCaptain',
    description: '',
    aliases: ['captain', 'capt'],
    solo: 1,
  },
  {
    group: 'pug',
    key: 'decidePromoteOrPick',
    description: '',
    aliases: ['p', 'pick', 'promote'],
    solo: 2,
  },
  {
    group: 'pug',
    key: 'pugPicking',
    description: '',
    aliases: ['picking'],
    solo: 1,
  },
  {
    group: 'pug',
    key: 'checkLastPugs',
    description: '',
    aliases: ['last'],
    solo: 2,
    regex(action) {
      return RegExp(`^${action}(\d|t)*`, 'g');
    },
  },
  {
    group: 'pug',
    key: 'resetPug',
    description: '',
    aliases: ['reset'],
    solo: 0,
  },
  {
    group: 'pug',
    key: 'checkStats',
    description: '',
    aliases: ['stats'],
    solo: 2,
  },
  {
    group: 'pug',
    key: 'addOrRemoveTag',
    description: '',
    aliases: ['tag'],
    solo: 2,
  },
  {
    group: 'pug',
    key: 'adminAddPlayer',
    description: '',
    aliases: ['adminadd'],
    solo: 0,
  },
  {
    group: 'pug',
    key: 'adminRemovePlayer',
    description: '',
    aliases: ['adminremove'],
    solo: 0,
  },
  {
    group: 'pug',
    key: 'adminPickPlayer',
    description: '',
    aliases: ['adminpick'],
    solo: 0,
  },
  {
    group: 'pug',
    key: 'blockPlayer',
    description: '',
    aliases: ['block'],
    solo: 0,
  },
  {
    group: 'pug',
    key: 'unblockPlayer',
    description: '',
    aliases: ['unblock'],
    solo: 0,
  },
  {
    group: 'pug',
    key: 'showBlockedUsers',
    description: '',
    aliases: ['showblocked'],
    solo: 1,
  },
  {
    group: 'pug',
    key: 'setDefaultJoin',
    description: '',
    aliases: ['defaultjoin'],
    solo: 0,
  },
  {
    group: 'pug',
    key: 'declareWinner',
    description: '',
    aliases: ['winner'],
    solo: 0,
  },
  {
    group: 'pug',
    key: 'getTop10',
    descriptipn: '',
    aliases: ['top10'],
    solo: 0,
  },
];

export { commands, handlers, emitters };
