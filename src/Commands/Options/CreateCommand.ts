import { ICommandOption } from '../ICommandOption';

export class CreateOption implements ICommandOption {
  name: string;

  constructor() {
    this.name = 'create';
  }

  execute(): void {
    this.createTemplateJS();
    this.createTemplateTs();
  }

  private createTemplateJS(): void {
    console.log('object');
  }

  private createTemplateTs(): void {
    console.log('object');
  }
}
