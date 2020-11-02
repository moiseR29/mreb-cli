import { Options } from '../../Args';
import { ConsoleManager, PathManager, Spinner } from '../../utils';
import { ICommandOption } from '../ICommandOption';
import {
  editorConfig,
  eslintIgnoreJS,
  eslintIgnoreTs,
  eslintRcJs,
  eslintRcTs,
  gitIgnore,
  prettierRc,
  tsConfig,
} from '../../Files';

const Log: ConsoleManager = ConsoleManager.get();
const cmd: ConsoleManager = Log;

export class CreateOption implements ICommandOption {
  name: string;

  constructor() {
    this.name = 'create';
  }

  async execute(options: Options): Promise<void> {
    await this.validArgs(options);
  }

  private async validArgs(options: Options): Promise<void> {
    if (options.js || options.ts) {
      const spinner: Spinner = new Spinner('Creating Project');
      await this.createTemplateCommon(spinner);
      await this.createTemplateDecition(options, spinner);
      this.happyMessage();
    }

    Log.error(
      `Please use --create, write other command, mreb --create [command]`,
    );
    Log.exit(1);
  }

  private async createTemplateCommon(spinner: Spinner): Promise<void> {
    const writeFile = PathManager.writeFile;

    writeFile(
      this.normalizePathUserCliWrite(editorConfig.name),
      editorConfig.content,
    );

    writeFile(
      this.normalizePathUserCliWrite(gitIgnore.name),
      gitIgnore.content,
    );

    writeFile(
      this.normalizePathUserCliWrite(prettierRc.name),
      prettierRc.content,
    );

    spinner.markedSuccessAndInitNewTask('Starting npm');
    const initNpmCommand = 'npm init -y';
    await cmd.executeCommand(initNpmCommand);
  }

  private async createTemplateDecition(
    options: Options,
    spinner: Spinner,
  ): Promise<void> {
    const writeFile = PathManager.writeFile;

    const eslintRc = options.js ? eslintRcJs : eslintRcTs;
    const eslintIgnore = options.js ? eslintIgnoreJS : eslintIgnoreTs;

    writeFile(this.normalizePathUserCliWrite(eslintRc.name), eslintRc.content);
    writeFile(
      this.normalizePathUserCliWrite(eslintIgnore.name),
      eslintIgnore.content,
    );

    if (options.ts) {
      writeFile(
        this.normalizePathUserCliWrite(tsConfig.name),
        tsConfig.content,
      );
    }

    const installDependenciesCommandJS = `npm i babel-eslint eslint eslint-config-prettier eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-prettier eslint-plugin-standard esm prettier standard -D`;
    const installDependenciesCommandTS = `npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier prettier typescript -D`;
    const initGit = 'git init';

    spinner.markedSuccessAndInitNewTask('Installing Dependencies');

    const installDependenciesCommand = options.js
      ? installDependenciesCommandJS
      : installDependenciesCommandTS;

    await cmd.executeCommand(installDependenciesCommand);

    spinner.markedSuccessAndInitNewTask('Starting git');

    await cmd.executeCommand(initGit);
    spinner.stopSpinner();
  }

  private happyMessage(): void {
    Log.log(`\n Happy Coding 💻💻💻`);
    Log.exit(0);
  }

  private normalizePathUserCliWrite(newFile: string): string {
    const routeCurrentUser = PathManager.getCurrentUserDirectory();
    return PathManager.pathJoin(routeCurrentUser, newFile);
  }
}
