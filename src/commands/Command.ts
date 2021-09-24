export type CommandType = "createMX";

abstract class Command {
  cmd: CommandType;

  constructor(cmd: CommandType) {
    this.cmd = cmd;
  }

  abstract validate(...args: string[]): void;

  abstract invoke(...args: string[]): void;
}

export default Command;
