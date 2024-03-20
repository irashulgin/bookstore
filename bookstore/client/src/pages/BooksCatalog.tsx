import { FC } from "react";
import BookForm from "../components/BookForm";
import useBookManagement from "hooks/useBookManagment";
import AddButton from "../commons/AddButton";
import InfoMessage from "../commons/InfoMessage";
import BooksList from "components/BooksList";

const BooksCatalog: FC = () => {
  const { loading, error, open, addBook, handleOpen, handleClose } =
    useBookManagement();
  const addBookText = "Add new book to catalog";
  return (
    <>
      <AddButton handleOpen={handleOpen} text={addBookText} />
      {loading ? <div>Loading...</div> : <BooksList />}
      <BookForm open={open} handleClose={handleClose} handleAdd={addBook} />
      {error && error.length > 0 && <InfoMessage message={error} isError />}
    </>
  );
};
export default BooksCatalog;
