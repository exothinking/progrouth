import { IError } from './error.interface';

export abstract class KnownError extends Error implements IError {
  isUnknown: boolean = false;

  constructor(message?: string) {
    super(message);
  }

  is(type: any) {
    return this instanceof type;
  }

  isNot(type: any) {
    return !(this instanceof type);
  }
}
