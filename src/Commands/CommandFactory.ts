import {
  CreateOption,
  VersionOption,
  NullCommand,
  ObfuscateCommand,
} from './Options';
import { ICommandOption } from './ICommandOption';
import { ConsoleManager } from '../utils';

const Log: ConsoleManager = ConsoleManager.get();

class CommandOptionFactory {
  private commands = new Map<string, ICommandOption>();

  constructor() {
    this.register([
      new VersionOption(),
      new CreateOption(),
      new NullCommand(),
      new ObfuscateCommand(),
    ]);
  }

  register(commandsOptions: ICommandOption[]): void {
    commandsOptions.forEach((command: ICommandOption) => {
      this.commands.set(command.name, command);
    });
  }

  get(nameCommand = 'null'): ICommandOption | any {
    if (!this.commands.has(nameCommand)) {
      Log.error(`Please select enabled command`);
      Log.exit(1);
    }
    return this.commands.get(nameCommand);
  }
}

const s = new CommandOptionFactory();
export { s as CommandOptionFactory };
