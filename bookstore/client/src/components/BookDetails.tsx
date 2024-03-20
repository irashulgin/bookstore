import { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import moment from "moment";
import styled from "@emotion/styled";
import { BookDetailsProps } from "interfaces/book";

const StyledBox = styled.div`
  background: #1976d2;
  color: #fff;
`;
const StyledDialogContent = styled(DialogContent)`
  // margin: 1.25rem;
`;
const CustomButton = styled(Button)`
  margin-top: 1rem;
`;
const StyledDivider = styled(Divider)`
  margin-bottom: 1rem;
`;

const BookDetails: FC<BookDetailsProps> = ({ open, onClose, book }) => {
  const { author, title, description, genre, publicationDate } = book;
  return (
    <Dialog open={open} onClose={onClose} >
      <StyledBox>
        <DialogTitle>Book Details</DialogTitle>
      </StyledBox>
      <StyledDialogContent>
        <Typography variant="h6">{title}</Typography>
        <StyledDivider />
        <Typography variant="subtitle1">Author: {author}</Typography>
        <Typography variant="subtitle1">Genre: {genre}</Typography>
        <Typography variant="subtitle1">Description: {description}</Typography>
        <Typography variant="subtitle1">
          Publication date: {`${moment(publicationDate).format("MM/DD/YYYY")}`}
        </Typography>
        <Typography variant="subtitle1"></Typography>
        <CustomButton variant="contained" color="primary" onClick={onClose}>
          Close
        </CustomButton>
      </StyledDialogContent>
    </Dialog>
  );
};

export default BookDetails;
