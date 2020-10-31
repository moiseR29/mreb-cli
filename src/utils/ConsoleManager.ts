import execa from 'execa';
import shell from 'shelljs';
import { Log4JS, Log4JsConfigure, LoggerLevel } from './Logger';

export class ConsoleManager implements LoggerLevel {
  private logger: Log4JS = Log4JsConfigure.get();

  static consoleManagerInstance: ConsoleManager;

  log(message: string, extra?: any): void {
    this.logger.info(message, ...extra);
  }

  warn(message: string, extra?: any): void {
    this.logger.warn(message, ...extra);
  }

  error(message: string, extra?: any): void {
    this.logger.error(message, ...extra);
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
