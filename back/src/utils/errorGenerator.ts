const errorGenerator = (errorMessage: string, statusCode: number) => {
  let error = new Error(errorMessage);
  error = error as Error & { statusCode: number };
  return error;
};
