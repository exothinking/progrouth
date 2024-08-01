// nestjs free logger service
export interface LoggerService {
  info(message: string): void;
  warn(message: string): void;
  error(message: string, stack: string): void;
  release(): Promise<void>;
}
