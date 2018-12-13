const Book = require('../models/Book');

module.exports = (app) => {

    /**
     * Retrieve all publicly available books 
     */
    app.get("/api/book", (req, res) => {
        Book.find({ private: false }, (err, books) => {
            if (err) {
                console.log(err);
                return res.redirect('/');
            }
            return res.json(books)
        });
    });

    /**
     * Create a book 
     */

    app.post("/api/book/new", (req, res) => {
        let NewBook = new Book(req.body);
        NewBook.save((err) => {
            if (err) console.log(err);
            return res.redirect('/');
        });
        return res.json({ object: req.body, message: "Was saved" });
    });

    /**
     * Read a book
     */
    app.get("/api/book/read/:id", (req, res) => {
        Book.findById({ _id: req.param.id }, (err, book) => {
            if (err) {
                console.log(err);
                return res.redirect('/')
            }
            return res.json(book);
        });
    });

    /**
     * Update a book as owner
     */
    app.put("/api/book/update", (req, res) => {
        Book.findByIdAndUpdate({ _id: req.body.id }, req.body.book, (err, book) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            }
            console.log(`Book ${req.body.id} updated`);
            res.json(`${book} was updated`);
        });
    });

    /**
     * Delete a book as owner
     */

    app.delete("/api/book/delete", (req, res) => {
        Book.findByIdAndDelete({ _id: req.body.id }, (err, book) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            }
            res.json({ message: `Successfully deleted ${req.body.id}` })
        })
    })



}