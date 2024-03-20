import { BookData } from "../interfaces/book";
export const API_URL = "http://localhost:5000/api";

//  GET request to get all books
export const getBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// POST request to add a new book
export const addBook = async (newBook: BookData) => {
  try {
    const response = await fetch(`${API_URL}/create-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error.message);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error adding new book:", error);
    throw error;
  }
};

// DELETE request to delete a book
export const deleteBook = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
