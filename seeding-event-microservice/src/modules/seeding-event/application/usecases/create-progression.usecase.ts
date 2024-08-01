import { Inject, Injectable } from '@nestjs/common';
import { SeedingEventRepository } from '../../domain/repository-interfaces/seeding-event.repository';
import { PlayerRepository } from '../../domain/repository-interfaces/player.repository';
import { ProgressionRepository } from '../../domain/repository-interfaces/progression.repository';
import { Result } from 'src/common/result.type';
import { DataValidationError } from 'src/common/errors/application/data-validation.error';
import { UnknownError } from 'src/common/errors/unknown.error';
import { IError } from 'src/common/errors/error.interface';
import { LoggerService } from '../service-interfaces/logger-service.interface';
import { LocalLoggerService } from '../services/local-logger.service';

export type SeedingEventMessage = {
  eventId: string;
  playerId: string;
};

@Injectable()
export class CreateProgressionUseCase {
  constructor(
    @Inject('SeedingEventRepository')
    private readonly eventRepo: SeedingEventRepository,
    @Inject('PlayerRepository')
    private readonly playerRepo: PlayerRepository,
    @Inject('ProgressionRepository')
    private readonly progressionsRepo: ProgressionRepository,
    @Inject('LoggerService')
    private readonly logger: LoggerService,
  ) {}

  async execute(message: SeedingEventMessage) {
    this.logger.info(`Executing ${CreateProgressionUseCase.name}`);
    this.logger.info(`parsing body ${JSON.stringify(message)}`);
    const [body, parseBodyError] = this.parseMessage(message);
    if (parseBodyError) {
      // wrong messages should not be retried, they'll be wrong every retry
      this.logger.error(parseBodyError.stack);
      await this.logger.release();
      return;
    }

    this.logger.info(
      `Searching for eventId: ${body.eventId} and playerId: ${body.playerId}`,
    );
    const [eventResult, playerResult] = await Promise.all([
      this.eventRepo.findEventById(body.eventId),
      this.playerRepo.findPlayerById(body.playerId),
    ]);

    const [event, eventError] = eventResult;
    if (eventError) {
      this.logger.error(eventError.stack);
      await this.logger.release();
      // this can be a connection error, lets retry it
      if (eventError.isUnknown) throw eventError;
      // known errors coming from database-try-to-find methods should not be retried
      // the entity was not found or something like that, this will be every retry also
      return;
    }

    const [player, playerError] = playerResult;
    if (playerError) {
      // same for player error
      this.logger.error(eventError.stack);
      await this.logger.release();
      if (playerError.isUnknown) throw playerError;
      return;
    }

    const [progressions, generateProgressionsError] =
      event.generateProgressionsToPlayer(player);
    if (generateProgressionsError) {
      this.logger.error(generateProgressionsError.stack);
      await this.logger.release();
      // domain erros should not be retried, the input will always give the same output
      return;
    }

    const [_, saveProgressionsError] =
      await this.progressionsRepo.saveProgressions(progressions);
    if (saveProgressionsError) {
      this.logger.error(saveProgressionsError.stack);
      await this.logger.release();
      // lets retry in case of connection or infra problems
      if (saveProgressionsError.isUnknown) throw saveProgressionsError;
      return;
    }
  }

  parseMessage(
    message: SeedingEventMessage,
  ): Result<SeedingEventMessage, IError> {
    try {
      if (message) return [message, null];
      return [
        null,
        new DataValidationError('Something wrong with SQS Message Body'),
      ];
    } catch (error: any) {
      return [null, new UnknownError(error)];
    }
  }
}
