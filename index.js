const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const BookControllers = require('./controllers/BookControllers');
const UserControllers = require('./controllers/UserControllers');
const CommentControllers = require('./controllers/CommentController');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/**
 * Connection to the database
 */
mongoose
  .connect(
    'mongodb://localhost/bookapidb',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Successfully signed into the database');
  })
  .catch(err => {
    console.log(err);
  });

/**
 * Applying Controllers
 */
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API! 📚 🚀' });
});

BookControllers(app);
UserControllers(app);
CommentControllers(app);

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
