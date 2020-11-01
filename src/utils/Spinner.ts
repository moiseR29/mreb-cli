import ora from 'ora';

export class Spinner {
  private spinner: ora.Ora;

  constructor(message: string) {
    this.spinner = ora({ text: message, spinner: 'bouncingBar' });
    this.spinner.start();
  }

  markedSuccessAndInitNewTask(message: string): void {
    this.spinner.succeed();
    this.spinner.start(message);
  }

  stopSpinner(): void {
    this.spinner.succeed();
    this.spinner.stop();
  }
}
