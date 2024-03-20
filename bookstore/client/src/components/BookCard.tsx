import { useState } from "react";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { BookCardProps } from "../interfaces/book";
import { Box, Button, Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import BookDetailsPopup from "./BookDetails";
import { StyledCard, StyledCardContent } from "styles/StyledComponents";
import usePopup from "../hooks/usePopup";
import DeleteConfirmationDialog from "../commons/DeleteConfirmationDialog";
const StyledIconButton = styled(IconButton)``;
const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  margin-top: 0.5rem;
  justify-content: space-between;
`;
const StyledText = styled(Typography)`
  margin: 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 10rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;

const BookCard: React.FC<BookCardProps> = ({ book, onDelete }) => {
  const { title, price, _id } = book;
  const { open, handleOpen, handleClose } = usePopup();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const message = "Are you sure you want to delete this book?";

  const handleDeleteConfirmationOpen = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleDeleteConfirmationClose = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleDelete = () => {
    onDelete(_id);
    setOpenDeleteConfirmation(false);
  };
  return (
    <>
      <StyledCard>
        <StyledCardContent>
          <StyledText variant="h5">
            {title}
          </StyledText>
          <StyledText color="textSecondary">Price: {price}</StyledText>

          <Divider variant="fullWidth" color="#1976d2" />
          <BookDetailsPopup open={open} onClose={handleClose} book={book} />
          <StyledBox>
            <Button onClick={handleOpen}>View Details</Button>
            <StyledIconButton
              aria-label="delete"
              onClick={handleDeleteConfirmationOpen}
            >
              <DeleteIcon />
            </StyledIconButton>
          </StyledBox>
        </StyledCardContent>
      </StyledCard>
      <DeleteConfirmationDialog
        open={openDeleteConfirmation}
        onClose={handleDeleteConfirmationClose}
        onConfirm={handleDelete}
        message={message}
      />
    </>
  );
};
export default BookCard;
