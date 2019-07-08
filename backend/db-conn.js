/* eslint no-console: 0*/
const mongoose = require('mongoose'),
  express = require('express');

const { DB_USER, DB_PASS, NODE_ENV } = process.env;

let dbConnectionURI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-ybtzm.mongodb.net/${NODE_ENV}?retryWrites=true`;
if (NODE_ENV === 'local') dbConnectionURI = 'mongodb://localhost:27017/local';

//Environments: test, dev, prod

mongoose.connect(
  dbConnectionURI,
  { useNewUrlParser: true }
)
.then(() => console.log('Successfully connected to the DB WOOP WOOP!'))
.catch(console.error);
