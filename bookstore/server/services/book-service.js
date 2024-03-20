const ApiError = require("../exceptions/api-error");
const bookModel = require("../models/book-model");

class bookService {
  async create(bookData) {
    const bookExists = await bookModel.findOne({
      title: bookData.title,
      author: bookData.author,
    });
    if (bookExists) {
      throw ApiError.BadRequest(`Book with name: ${bookData.title} exists`);
    }

    const book = await bookModel.create({
      ...bookData,
    });

    return book;
  }
  async delete(bookId) {
    const book = await bookModel.findByIdAndDelete(bookId);
    if (!book) {
      throw ApiError.BadRequest(`Book with id: ${bookId}doesn't exists`);
    }
    return book;
  }

  async get() {
    let books = bookModel.find();
    return books;
  }
}
module.exports = new bookService();
