import * as mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

export default (async () => {
  try {

    await mongoose.connect(
      "mongodb://localhost:27017/skills-matrix",
      { useNewUrlParser: true }
    );

    console.log('Connection to the Database successful.');

  } catch (err) {

    console.log(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();

  }
})();
