import { DomainError } from 'src/common/errors/domain/domain.error';
import { ProgressionEntity } from '../entities/progression.entity';
import { Result } from 'src/common/result.type';

export interface ProgressionRepository {
  saveProgressions(
    progressions: ProgressionEntity[],
  ): Promise<Result<void, DomainError>>;
}
