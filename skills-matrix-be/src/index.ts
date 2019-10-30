import {ErrorHandler, handleError} from "./common/Error";
import "./db/db";
import app from "./server";

app.use((err: any , req: any, res: any, next: any) => {
  handleError(err, res);
});
app.listen(3000, (err: any) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server is listening on port: 3000`);
});
