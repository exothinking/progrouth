import { Result } from 'src/common/result.type';
import { PlayerEntity } from '../entities/player.entity';
import { DomainError } from 'src/common/errors/domain/domain.error';

export interface PlayerRepository {
  findPlayerById(eventId: string): Promise<Result<PlayerEntity, DomainError>>;
}
