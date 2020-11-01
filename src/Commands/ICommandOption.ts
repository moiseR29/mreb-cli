import { Options } from '../Args';

export interface ICommandOption {
  name: string;
  execute(options?: Options): void | Promise<void>;
}
