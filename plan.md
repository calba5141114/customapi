# 12/11/2018 - Plan for book api 
The book api is going to be my custom project which will 
Be used a pdf sharing site where users can sign up and post/read others pdfs the standard user will receive the ability to view public pdfs but will not be able to save private pdfs unless they watch a 30 second ad.

### Book Schema
This will be the main way we store books  

``` json
{
"_id": Schema.Types.ObjectID,
"summary of book" : String,
"url": String,
"posted_at": Date,
"private": false,
"poster_ref": Schema.Types.ObjectID,
"comments": [Schema.Types.ObjectID]
}
```

### Comment Schema

``` json 
{
"book_ref":  Schema.Types.ObjectID,
"content": String,
"author_ref": Schema.Types.ObjectID
}
```

### User Schema

``` json
{
"username": String,
"email": String,
"name": String,
"image":  {data: Buffer, contentType: String},
"password": HashedString,
"premium": false,
"tagged": [Schema.types.ObjectID]
}
```

## Get all public books /api/books

``` javascript
Books.find({"private": false},(err, books)=>{
	if(err) console.log(err);
	return res.json(books)
});
```

## (if the book is public and exists you will be redirected to that book instead) Make a new book and tag it  /api/book/new

``` javascript
Book.findOne({"url": url, "private": false},(err,book)=>{
    if(err) throw err;
    if(book){
        // goes to existing book
        res.redirect(`/api/book/read/${book._id}`);
    }
    else{
        // creates a new book 
        Book.save(passedBook,(err,book)=>{
            if(err) throw err;
            res.redirect(`/api/book/read/${book._id}`);
        })
    }
});
```

##  (anyone can do this) Read a book /api/book/read/:id

``` javascript
Book.findByID(req.body.id,(err,document)=>{
    if(err) throw err;
    res.json(document);
});
```

## (only the person who pushed the book can do this) Update a book /api/book/update/:id

```javascript
if(user.isowner){
    Book.findAndUpdate(req.body.id,{"update":data}, (err,doc)=>{
        if(err) throw err;
        console.log("Donzo);
        res.redirect('/api/book/read/:id');
    });
};
```

## (only the person who shared the book can delete it) Delete a book /api/book/delete/:id

```javascript
if(user.isowner){
    Book.findAndDelete(req.body.id, (err)=>{
        if(err) throw err;
        console.log(`Deleted ${req.body.id}`);
    });
};
```

## (Viewable to all other users) Show all of users tagged books that are public /api/books/tagged/:userid

```javascript
User.findByID(id,(err,user)=>{
   let list = user.tagged.map((x)=>{
       if(x.private === false){
           return x;
       }
   });
   return res.json(list.json())
});
```

## (Only for the users viewing) Show all users tagged books public and private /api/books/closed/tagged/:userid

``` javascript
if(user.isowner){
    User.findByID(id,(err,user)=>{
        return res.json(user.tagged.json());
    });
};
```
