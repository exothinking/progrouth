import { UnknownError } from './unknown.error';

export class BaseError extends Error {
  constructor(message?: string) {
    super(message);
  }
  is(type: any) {
    return this instanceof type;
  }
  isNot(type: any) {
    return !(this instanceof type);
  }
  isUnknown() {
    return this instanceof UnknownError;
  }
}
