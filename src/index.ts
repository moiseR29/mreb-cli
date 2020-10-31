import { CommandManager, ICommandOption } from './Commands';

export class Cli {
  static init(): void {
    const command: ICommandOption = CommandManager.getCommand();
    command.execute();
  }
}
