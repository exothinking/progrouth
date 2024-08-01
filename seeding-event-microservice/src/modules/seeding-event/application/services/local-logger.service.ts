import { Injectable, Scope } from '@nestjs/common';
import { LoggerService } from '../service-interfaces/logger-service.interface';

@Injectable({ scope: Scope.REQUEST })
export class LocalLoggerService implements LoggerService {
  logs?: string[];
  logTraceId: string;

  constructor() {
    this.logTraceId = crypto.randomUUID();
    this.logs = [];
  }

  async release(): Promise<void> {
    // just display on console
    for (const message of this.logs || []) {
      console.log(message);
    }
  }

  info(message: string): void {
    this.logs.push(`logTraceId: ${this.logTraceId} info: ${message}`);
  }

  warn(message: string): void {
    this.logs.push(`logTraceId: ${this.logTraceId} warning: ${message}`);
  }

  error(stack: string): void {
    this.logs.push(`logTraceId: ${this.logTraceId} error: ${stack}\n\n`);
  }
}
