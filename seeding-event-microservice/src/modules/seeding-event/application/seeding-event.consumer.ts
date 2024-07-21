import { Injectable } from '@nestjs/common';
import { Result } from 'src/common/result.type';
import { SeedingEventAggregate } from '../domain/aggregates/seeding-event.aggregate';
import { PlayerEntity } from '../domain/entities/player.entity';
import { ProgressionEntity } from '../domain/entities/progression.entity';
import { DataValidationError } from 'src/common/errors/application/data-validation.error';
import { UnknownError } from 'src/common/errors/unknown.error';
import { DomainError } from '../../../common/errors/domain/domain.error';

export interface SeedingEventRepository {
  findEventById(
    eventId: string,
  ): Promise<Result<SeedingEventAggregate, DomainError>>;
}

export interface PlayerRepository {
  findPlayerById(eventId: string): Promise<Result<PlayerEntity, DomainError>>;
}

export interface ProgressionRepository {
  saveProgressions(
    progressions: ProgressionEntity[],
  ): Promise<Result<void, DomainError>>;
}

export type SeedingEventMessage = {
  eventId: string;
  playerId: string;
};

@Injectable()
export class SeedingEventConsumer {
  constructor(
    private readonly eventRepo: SeedingEventRepository,
    private readonly playerRepo: PlayerRepository,
    private readonly progressionsRepo: ProgressionRepository,
  ) {}

  async consumeSQSSeedingEvent(message: SeedingEventMessage) {
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
