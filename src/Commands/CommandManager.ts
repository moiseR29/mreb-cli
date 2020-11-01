import { ICommandOption } from './ICommandOption';
import { CommandOptionFactory } from './CommandFactory';
import { ArgsManager, Options } from '../Args';
import { ConsoleManager } from '../utils';

const cmd: ConsoleManager = ConsoleManager.get();

class CommandManager {
  private command: ICommandOption;
  private args: Options = ArgsManager.getOptions();

  constructor() {
    this.command = this.define();
  }

  private define(): ICommandOption {
    let commandSelected: ICommandOption = CommandOptionFactory.get();

    if (this.args.create) {
      commandSelected = CommandOptionFactory.get('create');
    }

    if (this.args.version) {
      commandSelected = CommandOptionFactory.get('version');
    }

    if (this.args.obfuscate) {
      commandSelected = CommandOptionFactory.get('obfuscate');
    }

    return commandSelected;
  }

  getCommand(): ICommandOption {
    cmd.clear();
    return this.command;
  }
}

const i: CommandManager = new CommandManager();
export { i as CommandManager };
