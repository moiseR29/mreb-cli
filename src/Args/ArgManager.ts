import arg from 'arg';
import { ConsoleManager, PathManager } from '../utils';

const Log: ConsoleManager = ConsoleManager.get();

export type Options = {
  version: boolean;
  create: boolean;
  js: boolean;
  ts: boolean;
  obfuscate: boolean;
  target: string;
  source: string;
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

          // obfuscate commad
          '--obfuscate': Boolean,
          '--target': String,
          '--source': String,

          // common to create and obfuscate
          '--js': Boolean,
          '--ts': Boolean,

          // Alias
          '-v': '--version',
          '-c': '--create',
          '-o': '--obfuscate',
          '-t': '--target',
          '-s': '--source',
        },
        {
          argv: process.argv.slice(2),
        },
      );

      // default
      const defaultOutput = PathManager.pathJoin(
        PathManager.getCurrentUserDirectory(),
        './dist',
      );
      const defaultSource = PathManager.pathJoin(
        PathManager.getCurrentUserDirectory(),
        './src',
      );

      return {
        version: args['--version'] || false,
        create: args['--create'] || false,
        js: args['--js'] || false,
        ts: args['--ts'] || false,
        obfuscate: args['--obfuscate'] || false,
        target: args['--target'] || defaultOutput,
        source: args['--source'] || defaultSource,
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
