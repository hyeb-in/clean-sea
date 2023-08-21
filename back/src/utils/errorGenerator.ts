import { IError } from "error";

export const errorGenerator = (
  errorMessage: string,
  statusCode: number
): IError => {
  const error: IError = new Error(errorMessage);
  error.statusCode = statusCode;
  return error;
};
