import {Request, Response} from "express";
import {ErrorHandler, handleError} from "./common/Error";
import "./db/db";
import app from "./server";

// @ts-ignore
declare function require(name: string);
// tslint:disable-next-line:no-var-requires
const winston = require("./config/winston");
// tslint:disable-next-line:no-var-requires
const morgan = require("morgan");
// tslint:disable-next-line:no-var-requires
const expressWinston = require("express-winston");

app.use(morgan("combined", { stream: winston.stream }));
app.use((err: any , req: Request, res: Response, next: any) => {
  handleError(err, req, res, next);
});

app.listen(3000, (err: any) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server is listening on port: 3000`);
});
