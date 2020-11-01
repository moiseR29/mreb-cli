import { ConsoleManager } from '../../utils';
import { ICommandOption } from '../ICommandOption';

const Log: ConsoleManager = ConsoleManager.get();

export class NullCommand implements ICommandOption {
  name: string;

  constructor() {
    this.name = 'null';
  }

  execute(): void {
    Log.error(`Not Selected a enabled command`);
    Log.exit(1);
  }
}
