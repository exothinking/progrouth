import { Injectable } from '@nestjs/common';
import { SeedingEventRepository } from '../../domain/repository-interfaces/seeding-event.repository';
import { PlayerRepository } from '../../domain/repository-interfaces/player.repository';
import { ProgressionRepository } from '../../domain/repository-interfaces/progression.repository';
import { Result } from 'src/common/result.type';
import { DataValidationError } from 'src/common/errors/application/data-validation.error';
import { UnknownError } from 'src/common/errors/unknown.error';

export type SeedingEventMessage = {
  eventId: string;
  playerId: string;
};

@Injectable()
export class CreateProgressionUseCase {
  constructor(
    private readonly eventRepo: SeedingEventRepository,
    private readonly playerRepo: PlayerRepository,
    private readonly progressionsRepo: ProgressionRepository,
  ) {}

  async execute(message: SeedingEventMessage) {
    const [body, parseBodyError] = this.parseMessage(message);
    if (parseBodyError?.isUnknown()) {
      return;
    }

    const [eventResult, playerResult] = await Promise.all([
      this.eventRepo.findEventById(body.eventId),
      this.playerRepo.findPlayerById(body.playerId),
    ]);

    const [event, eventError] = eventResult;
    if (eventError?.isUnknown()) {
      return;
    }

    const [player, playerError] = playerResult;
    if (playerError?.isUnknown()) {
      return;
    }

    const [progressions, progressionsError] =
      event.generateProgressionsToPlayer(player);
    if (progressionsError?.isUnknown()) {
      return;
    }

    const [_, errorSaveProgressions] =
      await this.progressionsRepo.saveProgressions(progressions);
    if (errorSaveProgressions?.isUnknown()) {
      return;
    }
  }

  parseMessage(
    message: SeedingEventMessage,
  ): Result<SeedingEventMessage, DataValidationError> {
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
