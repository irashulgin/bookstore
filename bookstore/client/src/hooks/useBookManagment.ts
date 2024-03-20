import { useState, useEffect } from "react";
import {
  getBooks,
  addBook as addNewBook,
  deleteBook as removeBook,
} from "../services/api";
import { BookData } from "../interfaces/book";

const useBookManagement = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const fetchedBooks = await getBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        if (error instanceof Error) {
          console.error("An error occurred:", error.message);
          setError(error.message);
        } else {
          console.error("An unknown error occurred:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const addBook = async (newBook: BookData) => {
    try {
      setLoading(true);
      const addedBook = await addNewBook(newBook);
      setBooks((prev) => [...prev, addedBook]);
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
        setError(error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      setLoading(true);
      await removeBook(id);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
        setError(error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    books,
    loading,
    error,
    open,
    addBook,
    deleteBook,
    handleOpen,
    handleClose,
  };
};

export default useBookManagement;
