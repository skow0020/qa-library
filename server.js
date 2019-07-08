require('dotenv').config();
require('./backend/db-conn');

const express = require('express'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  cors = require('cors'),
  path = require('path');

const booksRouter = require('./backend/routes/booksRouter'),
  articlesRouter = require('./backend/routes/articlesRouter'),
  tutorialsRouter = require('./backend/routes/tutorialsRouter'),
  resourceLinksRouter = require('./backend/routes/resourceLinksRouter'),
  officeLibraryBooksRouter = require('./backend/routes/officeLibraryBooksRouter'),
  usersRouter = require('./backend/routes/usersRouter');

const app = express();

const session = require('express-session');
const request = require('request');
const qs = require('querystring');
const randomString = require('randomstring');
const redirect_uri = process.env.HOST + '/auth/github/callback';
app.use(express.static('views'));

app.use(
  session({
    secret: randomString.generate(),
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

app.get('/login', (req, res, next) => {
  req.session.csrf_string = randomString.generate();

  const githubAuthUrl =
    'https://github.com/login/oauth/authorize?' +
    qs.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri: redirect_uri,
      state: req.session.csrf_string,
      scope: 'user:email'
    });

  res.redirect(githubAuthUrl);
});

app.all('/auth/github/callback', (req, res) => {
  const code = req.query.code;
  const returnedState = req.query.state;

  if (req.session.csrf_string === returnedState) {
    request.post(
      {
        url:
          'https://github.com/login/oauth/access_token?' +
          qs.stringify({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: code,
            redirect_uri: redirect_uri,
            state: req.session.csrf_string
          })
      },
      (error, response, body) => {
        req.session.access_token = qs.parse(body).access_token;
        res.redirect('/user');
      }
    );
  } else {
    console.log('SOMETHIN WRONG')
    res.redirect('/');
  }
});

app.get('/user', (req, res) => {
  request.get(
    {
      url: 'https://api.github.com/user',
      headers: {
        Authorization: 'token ' + req.session.access_token,
        'User-Agent': 'Login-App'
      }
    },
    (error, response, body) => {
      const bodyjson = JSON.parse(body);

      const userToPost = {
        githubName: bodyjson.login,
        githubAvatarUrl: bodyjson.avatar_url,
        email: bodyjson.email
      }

      request.get({ url: `${process.env.HOST}/api/users/${bodyjson.email}` }, (error, response, body) => {
        let bodyObj = JSON.parse(body)
        if (Object.keys(bodyObj.data).length === 0) {
          request.post({ url: `${process.env.HOST}/api/users`, form: userToPost },
            (error, response, body) => {
              if (error) {
                console.log(error)
              }
            }
          );
        }       
      })
      res.redirect(`/library?user=${bodyjson.login}&avatar_url=${bodyjson.avatar_url}`)
    }
  );
});

const router = express.Router();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'local') {
  app.use(logger('dev'));
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);
app.use('/api/articles', articlesRouter);
app.use('/api/books', booksRouter);
app.use('/api/tutorials', tutorialsRouter);
app.use('/api/resourceLinks', resourceLinksRouter);
app.use('/api/officeLibraryBooks', officeLibraryBooksRouter);
app.use('/api/users', usersRouter);

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

module.exports = app;

app.listen(process.env.PORT, () => console.log(`Blowing chunks on port ${process.env.PORT} using the ${process.env.NODE_ENV} environment`))