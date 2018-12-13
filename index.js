const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const BookControllers = require('./controllers/BookControllers');
const UserControllers = require('./controllers/UserControllers');


/**
 * Connection to the databse
 */
mongoose.connect("mongodb://localhost/bookapidb")
    .then(() => {
        console.log("Successfully signed into the database");
    })
    .catch((err) => {
        console.log(err);
    })

/**
 * Applying Controllers 
 */
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my API! 📚 🚀" })
});

BookControllers(app);
UserControllers(app);
// CommentControllers(app);

app.listen(port, () => {
    console.log(`App running on ${port}`);
})