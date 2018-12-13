const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Book = require('../models/User');
const config = require('../config');

module.exports = app => {
  app.post('/api/user/register', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.user.password, 8);
    const usr = new User({
      username: req.body.user.username,
      email: req.body.user.email,
      name: req.body.user.name,
      password: hashedPassword
    });

    usr.save((err, user) => {
      if (err) {
        console.log(err);
        return res.redirect('/');
      }

      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400
      });

      res.status(200).send({ auth: true, token });
    });
  });

  app.get('/api/user/me', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });
      res.status(200).send(decoded);
    });
  });
};
