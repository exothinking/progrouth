import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateProgressionUseCase } from './application/usecases/create-progression.usecase';

@Controller('seeding-event')
export class SeedingEventController {
  constructor(
    @Inject(CreateProgressionUseCase)
    private readonly createProgressionUseCase: CreateProgressionUseCase,
  ) {}

  @Post('create-progression')
  async createProgression(@Body() body: any) {
    return await this.createProgressionUseCase.execute(body);
  }
}
