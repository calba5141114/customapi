const Comment = require('../models/Comment');

module.exports = app => {
  /**
   * Get all comments associated with a book
   */

  app.get('/api/comment/:postid', (req, res) => {
    Comment.find({ book_ref: req.params.postid }, (err, comments) => {
      if (err) {
        console.log(err);
        return res.redirect('/');
      }
      return res.json(comments);
    });
  });

  /**
   * Create a new comment on a book
   */

  app.post('/api/comment/new', (req, res) => {
    const comm = new Comment(req.body.comment);
    comm.save(err => {
      if (err) {
        console.log(err);
        return res.redirect('/');
      }
    });
    return res.json({ object: req.body.comment, message: 'Saved' });
  });
};
