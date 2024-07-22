import { Injectable } from '@nestjs/common';
import { CreateProgressionUseCase } from './application/usecases/create-progression.usecase';

@Injectable()
export class SeedingEventConsumer {
  constructor(
    private readonly createProgressionUseCase: CreateProgressionUseCase,
  ) {}

  async consumeSQSSeedingEvent(message: any) {
    await this.createProgressionUseCase.execute(message);
  }
}
