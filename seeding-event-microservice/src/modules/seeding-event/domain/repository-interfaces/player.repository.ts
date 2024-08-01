import { Result } from 'src/common/result.type';
import { PlayerEntity } from '../entities/player.entity';
import { DomainError } from 'src/common/errors/domain/domain.error';
import { IError } from 'src/common/errors/error.interface';

export interface PlayerRepository {
  findPlayerById(eventId: string): Promise<Result<PlayerEntity, IError>>;
}
