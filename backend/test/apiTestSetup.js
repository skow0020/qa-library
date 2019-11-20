/* eslint no-console: 0*/

import { } from 'dotenv/config';

import Article from '../models/article';
import Book from '../models/book';
import OfficeLibraryBook from '../models/officeLibraryBook';
import ResourceLink from '../models/resourceLink';
import { Seeder } from 'mongo-seeding';
import Tutorial from '../models/tutorial';
import path from 'path';

const { DB_USER, DB_PASS, NODE_ENV } = process.env;

before(async () => {
  if (NODE_ENV === 'production') throw 'Do not seed production!';
  await Article.remove({}, (err) => { if (err) throw err; });
  await Book.remove({}, (err) => { if (err) throw err; });
  await OfficeLibraryBook.remove({}, (err) => { if (err) throw err; });
  await ResourceLink.remove({}, (err) => { if (err) throw err; });
  await Tutorial.remove({}, (err) => { if (err) throw err; });

  console.log('Database cleaned');
  const config = {
    database: `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-ybtzm.mongodb.net/${NODE_ENV}?retryWrites=true`
  };

  const seeder = new Seeder(config);
  let collections;
  try {
    collections = await seeder.readCollectionsFromPath(
      path.resolve('./backend/test/data-import'),
      {
        transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
      }
    );
  } catch (err) {
    throw err;
  }

  try {
    await seeder.import(collections);
    console.log(`Successfuly seeded database: ${NODE_ENV}`);
  } catch (err) {
    throw `Error seeding database: ${NODE_ENV}`, err;
  }
});