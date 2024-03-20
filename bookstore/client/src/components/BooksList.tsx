import styled from "@emotion/styled";
import useBookManagement from "hooks/useBookManagment";
import { BookData } from "interfaces/book";
import { FC } from "react";
import BookCard from "./BookCard";

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const BooksList: FC = () => {
  const {
    books,
    deleteBook,
  } = useBookManagement();
  return (
    <StyledList>
      {books.map((book: BookData) => (
        <BookCard
          key={book._id}
          book={book}
          onDelete={(id: string) => deleteBook(id)}
        />
      ))}
    </StyledList>
  );
};

export default BooksList;
