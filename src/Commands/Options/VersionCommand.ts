import { ConsoleManager } from '../../utils';
import { ICommandOption } from '../ICommandOption';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: vpkg } = require('../../../package.json');

const Log: ConsoleManager = ConsoleManager.get();

export class VersionOption implements ICommandOption {
  name: string;

  constructor() {
    this.name = 'version';
  }

  execute(): void {
    Log.log(`version: ${vpkg}`);
    Log.exit(1);
  }
}
