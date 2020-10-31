export interface ICommandOption {
  name: string;
  execute(options?: string[]): void | Promise<void>;
}
