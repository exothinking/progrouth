import { Result } from 'src/common/result.type';

export class Name {
  #value: string;

  private constructor() {}

  static create(value: string): Result<Name, Error> {
    const instance = new Name();
    if (typeof value !== 'string' || !value.length || !isNaN(Number(value)))
      return [null, new Error('its not a string')];
    instance.#value = value;
    return [instance, null];
  }

  get value(): string {
    return this.#value;
  }
}
