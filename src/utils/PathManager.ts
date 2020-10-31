import path from 'path';
import fs from 'fs';
import os from 'os';
import root from 'app-root-path';
import { ConsoleManager } from './ConsoleManager';

enum SO_TYPES {
  LINUX = 'Linux',
  MAC = 'Darwin',
  WINDOWS = 'Windows_NT',
}

const cmd: ConsoleManager = ConsoleManager.get();

export class PathManager {
  private folderDist = 'dist';

  static pathManagerInstance: PathManager;

  getCurrentUserDirectory(): string {
    return path.resolve(process.cwd());
  }

  getOsType(): string {
    return os.type();
  }

  getThisCliPath(): string {
    let path = `${root}`;
    if (this.getOsType() === SO_TYPES.WINDOWS)
      path = __dirname.split(this.folderDist)[0];
    return path;
  }

  pathJoin(ownerPath: string, childPath: string): string {
    return path.join(ownerPath, childPath);
  }

  readFile(pathToFile: string): string {
    return fs.readFileSync(pathToFile).toString();
  }

  writeFile(pathToFile: string, content: any, options = {}): void {
    fs.writeFileSync(pathToFile, content, { ...options });
  }

  checkIfExistFile(pathToFile: string): boolean {
    return fs.existsSync(pathToFile);
  }

  createFolder(path: string, options = {}): void {
    fs.mkdirSync(path, { ...options });
  }

  readFilesOnFolder(path: string, messageError = ''): string[] | undefined {
    try {
      return fs.readdirSync(path);
    } catch (error) {
      cmd.error(messageError || error.message);
      cmd.exit(1);
    }
  }

  readFilesAndConvertJson(pathToFiles: string, file: string): any {
    let response = {};
    try {
      response = JSON.parse(this.readFile(this.pathJoin(pathToFiles, file)));
    } catch (error) {}
    return response;
  }

  static get(): PathManager {
    if (!this.pathManagerInstance) this.pathManagerInstance = new PathManager();
    return this.pathManagerInstance;
  }
}
