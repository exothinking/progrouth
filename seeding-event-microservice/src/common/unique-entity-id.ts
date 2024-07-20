import { Result } from './result.type';

export class UniqueEntityId {
  #value: string;

  private constructor() {}

  static create(): Result<UniqueEntityId, Error> {
    try {
      const instance = new UniqueEntityId();
      instance.#value = crypto.randomUUID();
      return [instance, null];
    } catch (err: any) {
      return [null, err];
    }
  }

  static load(value: string): Result<UniqueEntityId, Error> {
    const instance = new UniqueEntityId();
    if (typeof value !== 'string')
      return [null, new Error('Unique Entity Id must be string')];
    const compare = crypto.randomUUID();
    if (value.length !== compare.length)
      return [null, new Error('Unique Entity Id invalid format')];
    instance.#value = value;
    return [instance, null];
  }

  get value(): string {
    return this.#value;
  }
}
