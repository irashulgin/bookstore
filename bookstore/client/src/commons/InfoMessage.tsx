import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const InfoMessage: React.FC<{ message: string, isError?: boolean }> = ({ message, isError = false }) => {
  const [open, setOpen] = useState(true);
    console.log(message,isError)
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      onClose={handleClose}
    >
      <SnackbarContent
        style={{ backgroundColor: isError ? '#f44336' : '#4caf50' }}
        message={message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default InfoMessage;
