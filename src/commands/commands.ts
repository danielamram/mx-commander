import Command, { CommandType } from "./Command";
import CreateMX from "./CreateMX";

const commands: Record<CommandType, Command> = {
  createMX: new CreateMX("createMX")
};

export { commands };
