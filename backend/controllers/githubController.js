import qs from 'querystring';
import randomString from 'randomstring';
import request from 'request';

const redirect_uri = process.env.HOST + '/auth/github/callback';

export default class GithubController {
  static async githubLogin(req, res, next) {
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
  }

  static async githubCallback(req, res) {
    const code = req.query.code;
    const returnedState = req.query.state;

    if (req.session.csrf_string === returnedState) {
      request.post({
        url: 'https://github.com/login/oauth/access_token?' +
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
      res.redirect('/');
    }
  }

  static async githubUser(req, res) {
    request.get({
      url: 'https://api.github.com/user',
      headers: {
        Authorization: 'token ' + req.session.access_token,
        'User-Agent': 'Login-App'
      }
    },
      (_error, _response, body) => {
        const bodyjson = JSON.parse(body);

        res.redirect(`/library?user=${bodyjson.login}&avatar_url=${bodyjson.avatar_url}`);
      }
    );
  }
}