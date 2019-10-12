import { DiscordServers, UT99QueryServers, Blocks, GameTypes } from '../models';
import store from '../store';
import {
  INIT,
  setQueryChannel,
  setPugChannel,
  ignoreGroupCommands as ignoreGroupCommandsAction,
  unignoreGroupCommands as unignoreGroupCommandsAction
} from '../store/actions';
import { privilegedRoles } from '../constants';
import { hasPrivilegedRole } from '../utils';
import { commands } from '../commands';

export const registerServer = async (message, _, serverId, { roles }) => {
  try {
    if (!hasPrivilegedRole(privilegedRoles, roles)) return;
    const res = await DiscordServers.findOne({
      server_id: serverId,
    }).exec();

    if (res)
      return message.channel.send(
        'Server is already registered with bBot :wink:'
      );

    await Promise.all([
      new DiscordServers({ server_id: serverId }).save(),
      new UT99QueryServers({ server_id: serverId }).save(),
      new Blocks({ server_id: serverId }).save(),
      new GameTypes({ server_id: serverId }).save(),
    ]);
    store.dispatch(INIT({ serverId }));
    message.channel.send('Server registered with bBot!');
  } catch (err) {
    message.channel.send('Something went wrong');
    console.log(err);
  }
};

export const registerQueryChannel = async (message, _, serverId, { roles }) => {
  try {
    if (!hasPrivilegedRole(privilegedRoles, roles)) return;
    const res = await DiscordServers.findOne({
      server_id: serverId,
    }).exec();

    if (!res)
      return message.channel.send(
        'Please register the server with the bot! Type .register'
      );

    await DiscordServers.findOneAndUpdate(
      { server_id: serverId },
      { query_channel: message.channel.id }
    ).exec();

    store.dispatch(
      setQueryChannel({ serverId, queryChannel: message.channel.id })
    );

    message.channel.send(
      `<#${message.channel.id}> has been set as the query channel`
    );
  } catch (err) {
    message.channel.send('Something went wrong');
    console.log(err);
  }
};

export const registerPugChannel = async (message, _, serverId, { roles }) => {
  try {
    if (!hasPrivilegedRole(privilegedRoles, roles)) return;
    const res = await DiscordServers.findOne({
      server_id: serverId,
    }).exec();

    if (!res)
      return message.channel.send(
        'Please register the server with the bot! Type .register'
      );

    await DiscordServers.findOneAndUpdate(
      { server_id: serverId },
      { pug_channel: message.channel.id }
    ).exec();

    store.dispatch(setPugChannel({ serverId, pugChannel: message.channel.id }));

    message.channel.send(
      `<#${message.channel.id}> has been set as the pug channel`
    );
  } catch (err) {
    message.channel.send('Something went wrong');
    console.log(err);
  }
};

export const ignoreGroupCommands = async (message, [proposedGroup], serverId, { roles }) => {
  try {
    if (!hasPrivilegedRole(privilegedRoles, roles)) return;
    const res = await DiscordServers.findOne({
      server_id: serverId,
    }).exec();

    if (!res) return;
    if (!proposedGroup) {
      message.channel.send('Not enough paramters.');
      return;
    }

    const normalizedProposedGroup = proposedGroup.toLowerCase();
    const allCommandsGroups = new Set(commands.filter(c => c.group).map(c => c.group));
    if (!allCommandsGroups.has(normalizedProposedGroup)) {
      message.channel.send(`**${proposedGroup}** is not in the available *ignored group commands*. try using: *listGroupCommands*`);
      return;
    }

    const ignoredGroupCommands = new Set(res.ignored_group_commands);
    if (ignoredGroupCommands.has(normalizedProposedGroup)) {
      message.channel.send(`**${proposedGroup}** is already present in the *ignored groups commands*.`);
      return;
    }

    store.dispatch(ignoreGroupCommandsAction({ serverId, groupCommands: normalizedProposedGroup }));
    await DiscordServers.findOneAndUpdate(
      { server_id: serverId },
      { ignored_group_commands: [...ignoredGroupCommands.add(normalizedProposedGroup)] }
    ).exec();

    message.channel.send(`**${proposedGroup}** has been added to *ignore group commands* list.`);
  }
  catch (err) {
    message.channel.send('Something went wrong');
    console.log(err);
  }
}

export const unignoreGroupCommands = async (message, [proposedGroup], serverId, { roles }) => {
  try {
    if (!hasPrivilegedRole(privilegedRoles, roles)) return;
    const res = await DiscordServers.findOne({
      server_id: serverId,
    }).exec();

    if (!res) return;
    if (!proposedGroup) {
      message.channel.send('Not enough paramters.');
      return;
    }

    const normalizedProposedGroup = proposedGroup.toLowerCase();
    const ignoredGroupCommands = new Set(res.ignored_group_commands);
    if (ignoredGroupCommands.delete(normalizedProposedGroup)) {
      store.dispatch(unignoreGroupCommandsAction({ serverId, groupCommands: normalizedProposedGroup }));
      await DiscordServers.findOneAndUpdate(
        { server_id: serverId },
        { ignored_group_commands: [...ignoredGroupCommands] }
      ).exec();
      
      message.channel.send(`**${proposedGroup}** has been removed from *ignore group commands* list.`);
    }
    else {
      message.channel.send(`**${proposedGroup}** is already **not** present in the *ignore group commands*.`);
    }
  }
  catch (err) {
    message.channel.send('Something went wrong');
    console.log(err);
  }
}

export const listGroupCommands = async (message, _, serverId, { roles }) => {
  try {
    if (!hasPrivilegedRole(privilegedRoles, roles)) return;
    const res = await DiscordServers.findOne({
      server_id: serverId,
    }).exec();

    if (!res) return;

    const commandsByGroup = {};
    commands.forEach(cmd => {
      if (cmd.group) {
        if (!commandsByGroup[cmd.group]) {
          commandsByGroup[cmd.group] = [];
        }
        commandsByGroup[cmd.group].push(cmd.key.toLowerCase());
      }
    })
    
    const availableCommands = Object.keys(commandsByGroup).filter(key => res.ignored_group_commands.indexOf(key) == -1);
    const unavailableCommands = Object.keys(commandsByGroup).filter(key => res.ignored_group_commands.indexOf(key) > -1);

    const availableCommandsDisplay = availableCommands.map(ac => `**${ac}**[${commandsByGroup[ac]}]`);
    const unavailableCommandsDisplay = unavailableCommands.map(ac => `**${ac}**[${commandsByGroup[ac]}]`);
    
    const result = [];
    if (availableCommands.length > 0) {
      result.push(`__**Available:**__ ${availableCommandsDisplay}`);
    }
    if (unavailableCommands.length > 0) {
      result.push(`__**Ignored:**__ ${unavailableCommandsDisplay}`);
    }
    message.channel.send(`Group Commands List:\r\n${result.join('\r\n')}.`);
  }
  catch (err) {
    message.channel.send('Something went wrong');
    console.log(err);
  }
}