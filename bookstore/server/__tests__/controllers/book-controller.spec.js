const BookController = require('../../controllers/book-controller');
const bookService = require('../../services/book-service');

jest.mock('../../services/book-service');

describe('BookController', () => {
  describe('createBook', () => {
    it('should create a new book and respond with result', async () => {
      const req = { body: { title: 'Test Book', author: 'Test Author' } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      
      const mockResult = { _id: '123', ...req.body };
      bookService.create.mockResolvedValue(mockResult);

      await BookController.createBook(req, res, next);

      // Assert that bookService.create was called with correct data
      expect(bookService.create).toHaveBeenCalledWith(req.body);

      // Assert that res.json was called with the result
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should call next with error if bookService.create throws an error', async () => {
      // Mock request, response, and next objects
      const req = { body: { title: 'Test Book', author: 'Test Author' } };
      const res = { json: jest.fn() };
      const next = jest.fn();

      // Mock the behavior 
      const mockError = new Error('Internal Server Error');
      bookService.create.mockRejectedValue(mockError);

      // Call the createBook method of BookController
      await BookController.createBook(req, res, next);

      // Assert that next was called with the error
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
  describe('deleteBook', () => {
    it('should delete a book and respond with result', async () => {
      // Mock request, response, and next objects
      const req = { params: { id: '123' } };
      const res = { json: jest.fn() };
      const next = jest.fn();

      // Mock the behavior of bookService.delete
      const mockResult = { _id: '123', title: 'Test Book', author: 'Test Author' };
      bookService.delete.mockResolvedValue(mockResult);

      // Call the deleteBook method of BookController
      await BookController.deleteBook(req, res, next);

      // Assert that bookService.delete was called with correct book ID
      expect(bookService.delete).toHaveBeenCalledWith(req.params.id);

      // Assert that res.json was called with the result
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should call next with error if bookService.delete throws an error', async () => {
      // Mock request, response, and next objects
      const req = { params: { id: '123' } };
      const res = { json: jest.fn() };
      const next = jest.fn();

      // Mock the behavior of bookService.delete to throw an error
      const mockError = new Error('Internal Server Error');
      bookService.delete.mockRejectedValue(mockError);

      // Call the deleteBook method of BookController
      await BookController.deleteBook(req, res, next);

      // Assert that next was called with the error
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
  describe('get', () => {
    it('should return all books', async () => {
      // Mock request, response, and next objects
      const req = {};
      const res = { json: jest.fn() };
      const next = jest.fn();

      // Mock the behavior of bookService.get
      const mockBooks = [
        { _id: '1', title: 'Book 1', author: 'Author 1' },
        { _id: '2', title: 'Book 2', author: 'Author 2' },
      ];
      bookService.get.mockResolvedValue(mockBooks);

      // Call the get method of BookController
      await BookController.get(req, res, next);

      // Assert that bookService.get was called
      expect(bookService.get).toHaveBeenCalled();

      // Assert that res.json was called with the result
      expect(res.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should call next with error if bookService.get throws an error', async () => {
      // Mock request, response, and next objects
      const req = {};
      const res = { json: jest.fn() };
      const next = jest.fn();

      // Mock the behavior of bookService.get to throw an error
      const mockError = new Error('Internal Server Error');
      bookService.get.mockRejectedValue(mockError);

      // Call the get method of BookController
      await BookController.get(req, res, next);

      // Assert that next was called with the error
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
   
});
