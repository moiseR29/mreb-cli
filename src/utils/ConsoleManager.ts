import execa from 'execa';
import shell from 'shelljs';
import clear from 'clear';
import { LoggerLevel, Logger } from './Logger';

export class ConsoleManager implements LoggerLevel {
  private logger: Logger;

  static consoleManagerInstance: ConsoleManager;

  constructor() {
    this.logger = new Logger();
  }

  log(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  clear(): void {
    clear();
  }

  exit(code: number): void {
    shell.exit(code);
  }

  async executeCommand(
    command: string,
    message?: string,
    forceExit = false,
  ): Promise<void> {
    try {
      await execa.command(command);
    } catch (error) {
      if (error) {
        this.error(error.message);
        this.exit(1);
      }
    }

    if (message) this.log(message);

    if (forceExit) this.exit(1);
  }

  moveFile(oldPath: string, newPath: string): void {
    shell.mv(oldPath, newPath);
  }

  copyFile(sourcePath: string, targetPath: string): void {
    shell.cp('-R', sourcePath, targetPath);
  }

  copyFileNotOverWrite(sourcePath: string, targetPath: string): void {
    shell.config.silent = true;
    shell.cp('-Rn', sourcePath, targetPath);
  }

  deleteFile(path: string): void {
    shell.rm('-rf', path);
  }

  async sleep(mm: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, mm));
  }

  static get(): ConsoleManager {
    if (!this.consoleManagerInstance)
      this.consoleManagerInstance = new ConsoleManager();
    return this.consoleManagerInstance;
  }
}
