const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const withAuth = (req, res, next) => {
  console.log('withAuthhmmm');
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

    console.log('token', token);
  if (!token) res.status(401).send('Unauthorized: No token provided');
  else {
    jwt.verify(token, secret, function (err, decoded) {
      console.log('decoded', decoded);
      if (err) res.status(401).send('Unauthorized: Invalid token');
      else {
        req.email = decoded.email;
        next();
      }
    });
  }
}
module.exports = withAuth;