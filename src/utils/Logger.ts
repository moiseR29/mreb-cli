import { addLayout, configure, getLogger, Logger } from 'log4js';

export interface LoggerLevel {
  log(message: string, extra?: any[]): void;
  warn(message: string, extra?: any[]): void;
  error(message: string, extra?: any[]): void;
}

export type Log4JS = Logger;

export class Log4JsConfigure {
  private logger: Log4JS;

  static Log4JsInstance: Log4JsConfigure;

  private constructor() {
    this.logger = this.defaultConfigureLogger();
  }

  private defaultConfigureLogger(): Log4JS {
    addLayout('json', () => (logEvent) => {
      const { data } = logEvent;
      const [log] = data;
      return log;
    });

    configure({
      appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
      categories: { default: { appenders: ['cheese'], level: 'error' } },
    });
    return getLogger();
  }

  static get(): Log4JS {
    if (!this.Log4JsInstance) this.Log4JsInstance = new Log4JsConfigure();
    return this.Log4JsInstance.logger;
  }
}
