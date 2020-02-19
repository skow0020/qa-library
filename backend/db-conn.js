/* eslint no-console: 0*/

import mongoose from 'mongoose';

const { DB_USER, DB_PASS, NODE_ENV } = process.env;

let dbConnectionURI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-ybtzm.mongodb.net/${NODE_ENV}?retryWrites=true`;
if (NODE_ENV === 'local') dbConnectionURI = 'mongodb://localhost:27017/local';

mongoose.connect(
  dbConnectionURI,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Successfully connected to the DB WOOP WOOP!'))
  .catch(console.error);
