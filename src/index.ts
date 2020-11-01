import { ArgsManager } from './Args';
import { CommandManager, ICommandOption } from './Commands';

export class Cli {
  static async init(): Promise<void> {
    const command: ICommandOption = CommandManager.getCommand();
    await command.execute(ArgsManager.getOptions());
  }
}
