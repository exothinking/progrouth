import { Result } from 'src/common/result.type';
import { SeedingEventAggregate } from '../aggregates/seeding-event.aggregate';
import { DomainError } from 'src/common/errors/domain/domain.error';

export interface SeedingEventRepository {
  findEventById(
    eventId: string,
  ): Promise<Result<SeedingEventAggregate, DomainError>>;
}
