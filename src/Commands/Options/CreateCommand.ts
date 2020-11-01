import { Options } from '../../Args';
import { ConsoleManager, PathManager } from '../../utils';
import { ICommandOption } from '../ICommandOption';

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
      await this.createTemplateCommon();
      await this.createTemplateDecition(options);
      this.happyMessage();
    }

    Log.error(
      `Please use --create, write other command, mreb --create [command]`,
    );
    Log.exit(1);
  }

  private async createTemplateCommon(): Promise<void> {
    const routeCli = PathManager.getThisCliPath();
    const routeTemplateCommon = '/template/common/.*';
    const routeCurrentUser = PathManager.getCurrentUserDirectory();
    const normalizeRouteTempCommon = PathManager.pathJoin(
      routeCli,
      routeTemplateCommon,
    );
    cmd.copyFile(normalizeRouteTempCommon, routeCurrentUser);
    const initNpmCommand = 'npm init -y';
    await cmd.executeCommand(initNpmCommand);
  }

  private async createTemplateDecition(options: Options): Promise<void> {
    const routeCli = PathManager.getThisCliPath();
    const routeTemplate = options.js ? '/template/js/.*' : '/template/ts/.*';
    const routeCurrentUser = PathManager.getCurrentUserDirectory();
    const normalizeRouteTemplate = PathManager.pathJoin(
      routeCli,
      routeTemplate,
    );
    cmd.copyFile(normalizeRouteTemplate, routeCurrentUser);

    const installDependenciesCommandJS = `npm i babel-eslint eslint eslint-config-prettier eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-prettier eslint-plugin-standard esm prettier standard -D`;
    const installDependenciesCommandTS = `npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier prettier typescript -D`;
    const initGit = 'git init';

    const installDependenciesCommand = options.js
      ? installDependenciesCommandJS
      : installDependenciesCommandTS;

    await cmd.executeCommand(installDependenciesCommand);
    await cmd.executeCommand(initGit);
  }

  private happyMessage(): void {
    Log.log(`Happy Coding 💻💻💻`);
    Log.exit(0);
  }
}
