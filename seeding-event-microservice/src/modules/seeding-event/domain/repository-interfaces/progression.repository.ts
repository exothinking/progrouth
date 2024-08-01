import { DomainError } from 'src/common/errors/domain/domain.error';
import { ProgressionEntity } from '../entities/progression.entity';
import { Result } from 'src/common/result.type';
import { IError } from 'src/common/errors/error.interface';

export interface ProgressionRepository {
  saveProgressions(
    progressions: ProgressionEntity[],
  ): Promise<Result<void, IError>>;
}
