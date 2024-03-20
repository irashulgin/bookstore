const request = require('supertest');
const express = require('express');
const router = require('../../routes/index');
const bookController = require('../../controllers/book-controller');
const bookService = require('../../services/book-service');

// Create a mock Express app
const app = express();

// Mock the bookService module
jest.mock('../../services/book-service');

// Mock the bookController.get method
bookController.get = jest.fn();

// Use the router in the Express app
app.use(router);

describe('GET /books', () => {
  it('should respond with all books', async () => {
    // Mock the behavior of bookService.get
    const mockBooks = [
      { _id: '1', title: 'Book 1', author: 'Author 1' },
      { _id: '2', title: 'Book 2', author: 'Author 2' },
    ];
    bookService.get.mockResolvedValue(mockBooks);

    // Make a GET request to the route
    const response = await request(app).get('/books');

    // Assert that the response status code is 200
    expect(response.status).toBe(200);

    // Assert that the response body matches the expected array of books
    expect(response.body).toEqual(mockBooks);
  });
});

describe('POST /create-book', () => {
    it('should create a new book', async () => {
      // Mock request, response, and next objects
      const reqBody = { title: 'New Book', author: 'New Author' };
      const req = { body: reqBody };
      const res = { json: jest.fn() };
      const next = jest.fn();
  
      // Mock the behavior of bookService.create
      const mockResult = { _id: '123', ...reqBody };
      bookService.create.mockResolvedValue(mockResult);
  
      // Make a POST request to the route
      const response = await request(app)
        .post('/create-book')
        .send(reqBody);
  
       // Assert that the response status code is 200
      expect(response.status).toBe(200);
  
      // Assert that the response body matches the expected result
      expect(response.body).toEqual(mockResult);
    });
});
it('should delete the book corresponding to the provided ID', async () => {
    // Mock the ID parameter
    const bookId = '123';

    // Mock request, response, and next objects
    const req = { params: { id: bookId } };
    const res = { json: jest.fn() };
    const next = jest.fn();

    // Make a DELETE request to the route with the ID parameter
    const response = await request(app).delete(`/books/${bookId}`);

     // Assert that the response status code is 200
    expect(response.status).toBe(200);
 
  });
