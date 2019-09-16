import app from './server';
import './db/db';

app.listen(3000, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server is listening on port: 3000`);
});
