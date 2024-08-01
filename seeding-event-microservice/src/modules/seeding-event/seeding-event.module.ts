import { Module } from '@nestjs/common';
import { SeedingEventConsumer } from './seeding-event.consumer';
import { CreateProgressionUseCase } from './application/usecases/create-progression.usecase';
import { LocalLoggerService } from './application/services/local-logger.service';
import { SeedingEventController } from './seeding-event.controller';
import { UnknownError } from 'src/common/errors/unknown.error';
import { DataValidationError } from 'src/common/errors/application/data-validation.error';

const localSeedingEventRepo = {
  findEventById: () => [null, new DataValidationError('Event not found')],
};
const localPlayerRepo = {
  findPlayerById: () => [
    null,
    new UnknownError(new Error('connection timed out for player')),
  ],
};
const localProgressionRepo = {
  saveProgressions: () => [
    null,
    new UnknownError(new Error('connection timed out for progression')),
  ],
};

@Module({
  providers: [
    SeedingEventConsumer,
    CreateProgressionUseCase,
    {
      provide: 'LoggerService',
      useClass: LocalLoggerService,
    },
    {
      provide: 'SeedingEventRepository',
      useValue: localSeedingEventRepo,
    },
    {
      provide: 'PlayerRepository',
      useValue: localPlayerRepo,
    },
    {
      provide: 'ProgressionRepository',
      useValue: localProgressionRepo,
    },
  ],
  controllers: [SeedingEventController],
})
export class SeedingEventModule {}
