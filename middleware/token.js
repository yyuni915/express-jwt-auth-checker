const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET; 

module.exports = {

  authToken: function (req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).send('Authorization header missing');


    const accessToken = header.split(' ')[1];
    if (!accessToken || accessToken === 'null') {
      return res.status(401).send('Not Authorized');
    } 

    jwt.verify(accessToken, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(403).send('Token Invalid');
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};
