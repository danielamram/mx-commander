import Command from "./Command";

class CreateMX extends Command {
  validate(...args: string[]) {
    console.log("validated");
    throw Error(`args are missing for command ${this.cmd}`);
  }

  invoke(...args: string[]) {
    console.log(args);
  }
}

export default CreateMX;
