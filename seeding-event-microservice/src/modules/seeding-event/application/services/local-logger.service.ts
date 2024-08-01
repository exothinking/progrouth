import { LoggerService } from '../service-interfaces/logger-service.interface';

export class LocalLoggerService implements LoggerService {
  logs?: string[];
  logTraceId: string;

  constructor() {
    this.logTraceId = crypto.randomUUID();
  }

  async release(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  info(message: string): void {
    this.logs.push(`logTraceId: ${this.logTraceId} info: ${message}`);
  }

  warn(message: string): void {
    this.logs.push(`logTraceId: ${this.logTraceId} warning: ${message}`);
  }

  error(message: string, stack: string): void {
    this.logs.push(
      `logTraceId: ${this.logTraceId} error: ${message} \n StackTrace: ${stack}`,
    );
  }
}
