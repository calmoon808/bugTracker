const jwt = require('jsonwebtoken');

const withAuth = function(req, res, next) {
  console.log(req.cookies);
  let token = `${req.cookies.headerPayload}.${req.cookies.signature}`

  if (!token[0]) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        console.log(decoded);
        next();
      }
    })
  }
}

module.exports = { withAuth };