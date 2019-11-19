require('babel-core/register');
require('dotenv').config();
require('./backend/db-conn');

const express = require('express'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  cors = require('cors'),
  path = require('path'),
  session = require('express-session'),
  randomString = require('randomstring'),
  cookieParser = require('cookie-parser');

// Swagger API docs
const swaggerUi = require('swagger-ui-express'),
  swaggerDevDocument = require('./swaggerDev.json'),
  swaggerProdDocument = require('./swaggerProd.json');

// Routers
const booksRouter = require('./backend/routes/booksRouter'),
  articlesRouter = require('./backend/routes/articlesRouter'),
  tutorialsRouter = require('./backend/routes/tutorialsRouter'),
  resourceLinksRouter = require('./backend/routes/resourceLinksRouter'),
  officeLibraryBooksRouter = require('./backend/routes/officeLibraryBooksRouter'),
  usersRouter = require('./backend/routes/usersRouter'),
  githubRouter = require('./backend/routes/githubRouter');

const app = express();
const router = express.Router();

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'local') {
  app.use(logger('dev'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDevDocument));
} else {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerProdDocument));
}

app.use(cors());
app.use(express.static('views'));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: randomString.generate(),
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

const withAuth = require('./middleware');
app.use('/api', router);
app.use('/', githubRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/books', booksRouter);
app.use('/api/tutorials', tutorialsRouter);
app.use('/api/resourceLinks', resourceLinksRouter);
app.use('/api/officeLibraryBooks', officeLibraryBooksRouter);
app.use('/api/users', usersRouter);

app.get('/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

module.exports = app;

app.listen(process.env.PORT, () =>
  console.log(
    `Blowing chunks on port ${process.env.PORT} using the ${process.env.NODE_ENV} environment`
  )
);