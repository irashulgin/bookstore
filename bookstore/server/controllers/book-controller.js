const bookService = require("../services/book-service");

class BookController {
  async createBook(req, res, next) {
    const bookData = req.body;
    try {
      const result = await bookService.create(bookData);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteBook(req, res, next) {
    const bookId = req.params.id;
    try {
      const result = await bookService.delete(bookId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
      const data = await bookService.get();
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
   
}

module.exports = new BookController();
