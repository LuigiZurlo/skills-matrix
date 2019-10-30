
export class ErrorHandler extends Error {
  constructor(public statusCode: any, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
export const handleError = (err: any, res: any) => {
  const {message, statusCode} = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
