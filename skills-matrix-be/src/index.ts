import "./db/db";
import app from "./server";

app.listen(3000, (err: any) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server is listening on port: 3000`);
});
