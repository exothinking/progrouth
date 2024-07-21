export class UnknownError extends Error {
  name = 'UnknownError';
  constructor(error: any) {
    super(error?.message);
    this.stack =
      error?.stack?.replace(
        `${error?.name}: `,
        `${this.name}<${error?.name}>: `,
      ) || 'unknown stack';
  }
  is(type: any) {
    return this instanceof type;
  }
  isNot(type: any) {
    return !(this instanceof type);
  }
  isUnknown() {
    return true;
  }
}
