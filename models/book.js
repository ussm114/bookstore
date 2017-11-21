var mongoose = require('mongoose');

// book schema

var bookSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
	genre:{
		type: String,
    required: true
	},
	description:{
		type: String
	},
	author: {
		type: String,
    required: true
	},
	publisher:{
		type: String
	},
	pages:{
		type: String
	},
	image_url:{
		type: String
	},
	buy_url:{
		type: String
	},
  create_date:{
    type: Date,
    default: Date.now
  }
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// get books
module.exports.getBooks = function(callback, limit) {
  Book.find(callback).limit(limit);
}

// get book by id
module.exports.getBookById = function(_id, callback) {
	Book.findById(_id, callback);
}

//add book
module.exports.addBook = function(book, callback) {
  Book.create(book, callback);
}

module.exports.updateBook = function(id, book, options, callback) {
  var query = {_id: id};
  var update = {
    title:book.title,
    genre:book.genre,
    description:book.description,
    author:book.author,
    publisher:book.publisher,
    pages:book.pages,
    image_url:book.image_url,
    buy_url:book.buy_url
  }
  Book.findOneAndUpdate(query, update, options, callback);
}


module.exports.updateBook = function(id, book, options, callback) {
  book3 = Book.findById(id, function(err, book2) {
    return book2;
  });
  var query = {_id: id};
  var update = {
    title:book.title  || book3.title,
    genre:book.genre || book3.genre,
    description:book.description || book3.description,
    author:book.author || book3.author,
    publisher:book.publisher || book3.publisher,
    pages:book.pages || book3.pages,
    image_url:book.image_url || book3.image_url,
    buy_url:book.buy_url || book3.buy_url
  }
  Book.findOneAndUpdate(query, update, options, callback);
}



//delete books
module.exports.removeBook = function(id, callback) {
  var query = {_id: id};
  Book.remove(query, callback);
}
