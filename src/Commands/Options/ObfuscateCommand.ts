import { Options } from '../../Args';
import { ConsoleManager, PathManager } from '../../utils';
import { ICommandOption } from '../ICommandOption';

const Log: ConsoleManager = ConsoleManager.get();
const cmd: ConsoleManager = Log;

export class ObfuscateCommand implements ICommandOption {
  name: string;

  constructor() {
    this.name = 'obfuscate';
  }

  async execute(options: Options): Promise<void> {
    await this.executeParcel(options);
    await this.executeObf(options);
    this.checkGenerated(options);
    this.deletedGenerated();
  }

  private async executeParcel(options: Options): Promise<void> {
    const selectExtensionObf = options.ts ? '/**/*.ts' : '/**/*.js';
    const command = `npx parcel build ${options.source}${selectExtensionObf} -d tmp --target node --no-minify --no-source-maps`;
    await cmd.executeCommand(command);
  }

  private async executeObf(options: Options): Promise<void> {
    const command = `npx javascript-obfuscator ./tmp --output ${options.output}`;
    await cmd.executeCommand(command);
  }

  private checkGenerated(options: Options): void {
    const tmpRoute = `${options.output}/tmp`;
    if (PathManager.checkIfExistFile(tmpRoute)) {
      cmd.moveFile(`${tmpRoute}/*`, `${options.output}`);
      cmd.deleteFile(tmpRoute);
    }
  }

  private deletedGenerated(): void {
    cmd.deleteFile('./tmp');
    cmd.deleteFile('./.cache');
  }
}
