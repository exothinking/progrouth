import { IError } from './errors/error.interface';
import { DomainError } from './errors/domain/domain.error';
import { UnknownError } from './errors/unknown.error';
import { Result } from './result.type';

export class UniqueEntityId {
  #value: string;

  private constructor() {}

  static create(): Result<UniqueEntityId, IError> {
    try {
      const instance = new UniqueEntityId();
      instance.#value = crypto.randomUUID();
      return [instance, null];
    } catch (err: any) {
      return [null, new UnknownError(err)];
    }
  }

  static load(value: string): Result<UniqueEntityId, IError> {
    const instance = new UniqueEntityId();
    if (typeof value !== 'string')
      return [null, new DomainError('Unique Entity Id must be string')];
    const compare = crypto.randomUUID();
    if (value.length !== compare.length)
      return [null, new DomainError('Unique Entity Id invalid format')];
    instance.#value = value;
    return [instance, null];
  }

  get value(): string {
    return this.#value;
  }
}
