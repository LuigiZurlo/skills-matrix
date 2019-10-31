import {Request, Response} from "express";
import app from "../server";

// @ts-ignore
declare function require(name: string);
// tslint:disable-next-line:no-var-requires
const winston = require("../config/winston");

export class ErrorHandler extends Error {
  constructor(public statusCode: any, messages: string) {
    super();
    this.statusCode = statusCode;
    this.message = messages;
  }
}
/*export const handleError = (err: any, res: Response, req: Request) => {
  const {message, statusCode} = err;

  winston.error( err.statusCode + " - " + err.message + " - " + req.originalUrl + " - " +
  + req.method + " - " + req.ip);
  // @ts-ignore
  res.status(statusCode).json({
    message,
    status: "error",
    statusCode,
  });
};*/

export const handleError = (err: any, req: Request, res: Response, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  const {message, statusCode} = err;
  // add this line to include winston logging
  winston.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.statusCode).json({
    message,
    status: "error",
    statusCode,
  });
};
