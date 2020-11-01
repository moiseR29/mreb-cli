import arg from 'arg';
import { ConsoleManager } from '../utils';

const Log: ConsoleManager = ConsoleManager.get();

export type Options = {
  version: boolean;
  create: boolean;
  js: boolean;
  ts: boolean;
};

export class ArgsManager {
  static getOptions(): Options | any {
    try {
      // Config Args
      const args: any = arg(
        {
          // version command
          '--version': Boolean,

          // create command
          '--create': Boolean,
          '--js': Boolean,
          '--ts': Boolean,

          // Alias
          '-v': '--version',
          '-c': '--create',
        },
        {
          argv: process.argv.slice(2),
        },
      );

      return {
        version: args['--version'] || false,
        create: args['--create'] || false,
        js: args['--js'] || false,
        ts: args['--ts'] || false,
      };
    } catch (error) {
      if (error.code === 'ARG_UNKNOWN_OPTION') {
        const [, wrongCommand] = error.message.split(':');
        Log.error(
          `Command ["${wrongCommand.trim()}"] not supported, please check documentation`,
        );
        Log.exit(1);
      } else {
        throw error;
      }
    }
  }
}
