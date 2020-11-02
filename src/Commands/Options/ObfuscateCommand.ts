import { Options } from '../../Args';
import { ConsoleManager, PathManager, Spinner } from '../../utils';
import { ICommandOption } from '../ICommandOption';

const Log: ConsoleManager = ConsoleManager.get();
const cmd: ConsoleManager = Log;

export class ObfuscateCommand implements ICommandOption {
  name: string;
  private equalsSourceAndTarget = false;

  constructor() {
    this.name = 'obfuscate';
  }

  async execute(options: Options): Promise<void> {
    Log.log(`obfuscate ${options.source} => ${options.target} \n`);
    const spinner = new Spinner('Starting obfuscate');
    await this.executeParcel(options);
    await this.executeObf(options, spinner);
    this.lastCorrectGenerated(options, spinner);
    this.copyOtherFilesSourceToTarget(options);
    this.deletedGenerated(spinner);
    this.happyMessage();
  }

  private async executeParcel(options: Options): Promise<void> {
    const selectExtensionObf = options.ts ? '/**/*.ts' : '/**/*.js';
    const command = `npx parcel build ${options.source}${selectExtensionObf} -d tmp --target node --no-minify --no-source-maps`;
    await cmd.executeCommand(command);
  }

  private async executeObf(options: Options, spinner: Spinner): Promise<void> {
    let target = options.target;
    if (options.source === options.target) {
      target = './tmp';
      this.equalsSourceAndTarget = true;
    }
    const command = `npx javascript-obfuscator tmp --output ${target}`;
    await cmd.executeCommand(command);
    spinner.markedSuccessAndInitNewTask('Finishing Obfuscate');
  }

  private lastCorrectGenerated(options: Options, spinner: Spinner): void {
    spinner.markedSuccessAndInitNewTask('Check Generate');
    if (this.equalsSourceAndTarget) {
      let tmpRoute = `./tmp/tmp`;
      if (!PathManager.checkIfExistFile(tmpRoute)) tmpRoute = './tmp';
      cmd.copyFile(`${tmpRoute}/*`, options.target);
    } else {
      const tmpRoute = `${options.target}/tmp`;
      if (PathManager.checkIfExistFile(tmpRoute)) {
        cmd.moveFile(`${tmpRoute}/*`, `${options.target}`);
        cmd.deleteFile(tmpRoute);
      }
    }
  }

  private copyOtherFilesSourceToTarget(options: Options) {
    if (!this.equalsSourceAndTarget)
      cmd.copyFileNotOverWrite(`${options.source}/*`, options.target);
  }

  private deletedGenerated(spinner: Spinner): void {
    cmd.deleteFile('./tmp');
    cmd.deleteFile('./.cache');
    spinner.markedSuccessAndInitNewTask('Correct generate');
    spinner.stopSpinner();
  }

  private happyMessage(): void {
    Log.log('\n Obfuscate Successfully!!  🤟🤟🤟🤟');
    Log.exit(0);
  }
}
