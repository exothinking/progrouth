export interface IError {
  name: string;
  message: string;
  stack?: string;
  isUnknown: boolean;
  is(type: any): boolean;
  isNot(type: any): boolean;
}
