import chalk from 'chalk';

export interface LoggerLevel {
  log(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

export class Logger {
  info(message: any) {
    console.log(chalk.green(message));
  }

  error(message: any) {
    console.log(chalk.red(message));
  }

  warn(message: any) {
    console.log(chalk.yellow(message));
  }
}
