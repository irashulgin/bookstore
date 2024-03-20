import styled from "@emotion/styled";
import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { BookData } from "interfaces/book";

interface FormProps {
  open: boolean;
  handleClose: () => void;
  handleAdd: (book: BookData) => void;
}
const StyledForm = styled.form`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;
const StyledDate = styled(Field)`
  border: none;
  color: blue;
  cursor: pointer;
  margin-left:1rem;
}`;

const StyledTextarea = styled(Field)`
  padding: 0.875rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1.5;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #1976d2; /* Match focused state of TextField */
  }
`;
const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  genre: yup.string().required("Genre is required"),
  description: yup.string().required("Description is required"),
  publicationDate: yup.date().required("Publication Date is required"),
  price: yup
    .string()
    .matches(/^\d+(\.\d+)?$/, "Price must be a valid number")
    .required("Price is required"),
});

const BookForm: React.FC<FormProps> = ({ open, handleClose, handleAdd }) => {
  const genres = [
    "Science fiction",
    "Satire",
    "Drama",
    "Action",
    "Romance",
    "Mystery",
    "Horror",
  ];

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Book.</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the form to add a new book.
        </DialogContentText>
        <Formik
          initialValues={{
            title: "",
            author: "",
            genre: "",
            description: "",
            publicationDate: "",
            price: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values: any) => {
            handleAdd(values);
            handleClose();
          }}
        >
          {({ handleSubmit }) => (
            <StyledForm onSubmit={handleSubmit}>
              <Field as={TextField} name="title" label="Title" fullWidth />
              <ErrorMessage name="title" component="div"/>
              <Field as={TextField} name="author" label="Author" fullWidth />
              <ErrorMessage name="author" component="div" />
              <Field as={TextField} name="price" label="Price" fullWidth />
              <ErrorMessage name="price" component="div" />
              <StyledTextarea
                as={TextareaAutosize}
                name="description"
                label="description"
                placeholder="Enter your description here..."
              />
              <ErrorMessage name="description" component="div" />
              <Box> Please Select Genre:</Box>
              <Field as={Select} name="genre" fullWidth>
                <MenuItem value="" disabled>
                  Please Select Genre
                </MenuItem>
                {genres.map((genre: string) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage name="genre" component="div" />
              <Box>
                <label>Select publication date:</label>
                <StyledDate type="date" name="publicationDate" />
                <ErrorMessage name="publicationDate" component="div" />
              </Box>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
              </DialogActions>
            </StyledForm>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default BookForm;
