export interface IError extends Error {
  statusCode?: number;
}

declare function errorGenerator(
  errorMessage: string,
  statusCode: number
): IError;
