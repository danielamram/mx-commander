import { CommandType } from "./Command";
import { commands } from "./commands";

const invokeCommand = (cmd: CommandType, ...args) => {
  commands[cmd].validate(...args);
  commands[cmd].invoke(...args);
};

const getCommands = () => Object.keys(commands);

export { invokeCommand, getCommands };
