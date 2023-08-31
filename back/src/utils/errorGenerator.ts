import { IError } from "error";

/**
 * @param errorMessage
 * @param statusCode
 * @description 에러 생성 함수
 * @returns error
 */
export const errorGenerator = (
  errorMessage: string,
  statusCode: number
): IError => {
  const error: IError = new Error(errorMessage);
  error.statusCode = statusCode;
  return error;
};
