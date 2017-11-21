var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const _ = require('lodash');

app.use(bodyParser.json());

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
//

Genre = require('./models/genre');
Book = require('./models/book');

//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore', { useMongoClient: true });
var db = mongoose.connection;

app.get('/', function(req, res)  {
  res.send('welcome! please go to /api/books or api/genres');
});

function onlyNotEmpty(req, res, next) {
    const out = {};
    _(req.body).forEach((value, key) => {
        if (!_.isEmpty(value)) {
            out[key] = value;
        }
    });
    req.bodyNotEmpty = out;
    next();
};

function IdExist(req, res, next) {

};

//post book - dodaj książkę
app.post('/api/books', function(req, res) {
  var book = req.body;
  Book.addBook(book, function(err, book) {
    if(err) {
      throw err;
    }
    res.json(book);
  });
});

//update book - zaktualizuj książkę

// app.put('/api/books/:_id', function(req, res) {
//   var id = req.params._id;
//   var book = req.body;
//   Book.updateBook(id, book, {}, function(err, book) {
//     if(err) {
//       throw err;
//     }
//     res.json(book);
//   });
// });

//update book - zaktualizuj książkę
app.put('/api/books/:id', onlyNotEmpty, function(req, res) {
  const query = {_id: req.params.id};
  const update = {
      $set: req.bodyNotEmpty
  };
  Book.findOneAndUpdate(query, update, function(err, book) {
    if(err) {
      throw err;
    }
    res.json(book);
  });
});

//remove book
app.delete('/api/books/:_id', function(req, res) {
  var id = req.params._id;
  Book.removeBook(id, function(err, book) {
    if(err) {
      throw err;
    }
    res.json(book);
  });
});

app.get('/api/books', function(req, res) {
  Book.getBooks(function(err, books) {
    if(err) {
      throw err;
    }
    res.json(books);
  });
})

app.get('/api/books/:_id', function(req, res) {
  Book.getBookById(req.params._id, function(err, book) {
    if(err) {
      throw err;
    }
    res.json(book);
  });
});


//
app.get('/api/genres', function(req, res) {
  Genre.getGenres(function(err, genres) {
    if(err) {
      throw err;
    }
    res.json(genres);
  });
});

app.post('/api/genres', function(req, res) {
  var genre = req.body;
  Genre.addGenre(genre, function(err, genre) {
    if(err) {
      throw err;
    }
    res.json(genre);
  });
});

// update genre
app.put('/api/genres/:_id', function(req, res) {
  var id = req.params._id;
  var genre = req.body;
  Genre.updateGenres(id, genre, {}, function(err, genre) {
    if(err) {
      throw err;
    }
    res.json(genre);
  });
});

app.delete('/api/genres/:_id', function(req, res) {
  var id = req.params._id;
  Genre.removeGenre(id, function(err, genre) {
    if(err) {
      throw err;
    }
    res.json(genre);
  });
});


app.listen(process.env.PORT || 3000);
console.log('Running on port 3000....');
