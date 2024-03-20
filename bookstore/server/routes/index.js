const Router = require("express").Router;

const bookController = require("../controllers/book-controller");
const router = new Router();

// GET all books
router.get("/books", bookController.get);
// GET a single book by ID
// router.get("/books/:id", bookController.getBookById);
// POST a new book
router.post("/create-book", bookController.createBook);
// DELETE
router.delete("/books/:id", bookController.deleteBook);

module.exports = router;
