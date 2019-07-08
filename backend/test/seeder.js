/* eslint no-console: 0 */
require('dotenv').config();

const path = require('path');
const { Seeder } = require('mongo-seeding');

const { DB_USER, DB_PASS, NODE_ENV } = process.env;

let dbConnectionURI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-ybtzm.mongodb.net/${NODE_ENV}?retryWrites=true`;

const config = {
  database: dbConnectionURI,
  dropDatabase: true
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
  path.resolve('./backend/test/data-import'),
  {
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
  }
);

seeder
  .import(collections)
  .then(() => {
    console.log(`Successfuly seeded database: ${NODE_ENV}`);
  })
  .catch(err => {
    console.log(`Error seeding database: ${NODE_ENV}`, err);
  });