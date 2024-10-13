import pino from "pino";

export class Logger {
  private logger: pino.Logger;

  constructor() {
    this.logger = pino();
  }

  info(message: string, data?: any) {
    this.logger.info(message, data);
  }

  warn(message: string, data?: any) {
    this.logger.warn(message, data);
  }

  error(message: string, data?: any) {
    this.logger.error(message, data);
  }

  debug(message: string, data?: any) {
    this.logger.debug(message, data);
  }
}
