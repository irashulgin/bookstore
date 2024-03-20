
const bookService = require('../../services/book-service');
const bookModel = require('../../models/book-model');
const ApiError = require('../../exceptions/api-error');

// Mock the bookModel module
jest.mock('../../models/book-model');

describe('bookService', () => {
  describe('create', () => {
    it('should create a new book if book with same title does not exist', async () => {
      // Mock book data
      const bookData = { title: 'Test Book1', author: 'Test Author1' };

      // Mock the behavior of bookModel.findOne to return null (indicating book does not exist)
      bookModel.findOne.mockResolvedValue(null);

      // Mock the behavior of bookModel.create to return a new book
      const mockBook = { _id: '123', ...bookData };
      bookModel.create.mockResolvedValue(mockBook);

      // Call the create method of bookService
      const result = await bookService.create(bookData);

      // Assert that bookModel.findOne was called with correct data
      expect(bookModel.findOne).toHaveBeenCalledWith({ title: bookData.title, author: bookData.author });

      // Assert that bookModel.create was called with correct data
      expect(bookModel.create).toHaveBeenCalledWith(bookData);

      // Assert that the result matches the expected book
      expect(result).toEqual(mockBook);
    });

    it('should throw an error if book with same title already exists', async () => {
      // Mock book data
      const bookData = { title: 'Test Book1', author: 'Test Author1' };

      // Mock the behavior of bookModel.findOne to return an existing book
      const mockExistingBook = { _id: '123', ...bookData };
      bookModel.findOne.mockResolvedValue(mockExistingBook);

      // Call the create method of bookService and expect it to throw an error
     
      await expect(bookService.create(bookData)).rejects;
    });
  });
  describe('delete', () => {
    it('should delete a book if it exists and return the deleted book', async () => {
      // Mock book data and ID
      const bookId = '123';
      const mockBook = { _id: bookId, title: 'Test Book', author: 'Test Author' };

      // Mock the behavior of bookModel.findByIdAndDelete to return the deleted book
      bookModel.findByIdAndDelete.mockResolvedValue(mockBook);

      // Call the delete method of bookService
      const result = await bookService.delete(bookId);

      // Assert that bookModel.findByIdAndDelete was called with correct ID
      expect(bookModel.findByIdAndDelete).toHaveBeenCalledWith(bookId);

      // Assert that the result matches the expected deleted book
      expect(result).toEqual(mockBook);
    });

    it('should throw an error if book does not exist', async () => {
      // Mock book ID
      const bookId = '123';

      // Mock the behavior of bookModel.findByIdAndDelete to return null (indicating book does not exist)
      bookModel.findByIdAndDelete.mockResolvedValue(null);

      // Call the delete method of bookService and expect it to throw an error
      await expect(bookService.delete(bookId)).rejects;
    });
  });
  describe('get', () => {
    it('should return all books', async () => {
      // Mock the behavior of bookModel.find to return an array of books
      const mockBooks = [
        { _id: '1', title: 'Book 1', author: 'Author 1' },
        { _id: '2', title: 'Book 2', author: 'Author 2' },
      ];
      bookModel.find.mockResolvedValue(mockBooks);

      // Call the get method of bookService
      const result = await bookService.get();

      // Assert that bookModel.find was called
      expect(bookModel.find).toHaveBeenCalled();

      // Assert that the result matches the expected array of books
      expect(result).toEqual(mockBooks);
    });
  });
});