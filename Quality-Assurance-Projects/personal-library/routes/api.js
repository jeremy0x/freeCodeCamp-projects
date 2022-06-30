/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict'

// import the book model
const Book = require('../models').Book

module.exports = function (app) {
	app
		.route('/api/books')
		.get(function (req, res) {
			//response will be array of book objects
			//json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
			Book.find({}, function (err, books) {
				if (!books) {
					res.json([])
				} else {
					const mappedBooks = books.map((book) => {
						return {
							_id: book._id,
							title: book.title,
							commentcount: book.comments.length,
						}
					})
					res.json(mappedBooks)
				}
			})
		})

		.post(function (req, res) {
			let title = req.body.title
			if (!title) {
				res.send('missing required field title')
				return
			}
			//response will contain new book object including atleast _id and title
			const newBook = new Book({
				title,
				comments: [],
			})
			newBook.save(function (err, book) {
				if (err) {
					res.send('an error has occurred')
					return
				}
				res.json({ _id: book._id, title: book.title })
			})
		})

		.delete(function (req, res) {
			//if successful response will be 'complete delete successful'
      	Book.deleteMany({}, function (err, books) {
				if (err) {
					res.send('an error has occurred')
					return
				}
				res.send('complete delete successful')
			})
		})

	app
		.route('/api/books/:id')
		.get(function (req, res) {
      let bookid = req.params.id
      if (!bookid) {
        res.send('missing required field id')
        return
      }
			//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      Book.findById(bookid, function (err, book) {
        if (!book) {
          res.send('no book exists')
          return
        }
        if (err) {
          res.send('an error has occurred')
          return
        }
        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments,
        })
      })
		})

		.post(function (req, res) {
			let bookid = req.params.id
			let comment = req.body.comment
      if (!bookid) {
        res.send('missing required field id')
        return
      }
      if (!comment) {
        res.send('missing required field comment')
        return
      }
      //json res format same as .get
      Book.findById(bookid, function (err, book) {
        if (!book) {
          res.send('no book exists')
          return
        }
        if (err) {
          res.send('an error has occurred')
          return
        }
        book.comments.push(comment)
        book.save(function (err, book) {
          if (err) {
            res.send('an error has occurred')
            return
          }
          res.json({
            _id: book._id,
            title: book.title,
            comments: book.comments,
          })
        })
      })
		})

		.delete(function (req, res) {
			let bookid = req.params.id
			//if successful response will be 'delete successful'
      if (!bookid) {
        res.send('missing required field id')
        return
      }
      Book.findByIdAndDelete(bookid, function (err, book) {
        if (!book) {
          res.send('no book exists')
          return
        }
        if (err) {
          res.send('an error has occurred')
          return
        }
        res.send('delete successful')
      })
		})
}
