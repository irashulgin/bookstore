const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);  
    let status = 500;
    let message = 'Internal Server Error';
  
    // Check if the error has a specific status and message
    if (err.status) {
      status = err.status;
    }
    if (err.message) {
      message = err.message;
    }
  
    // Send the error response
    res.status(status).json({
      error: {
        message: message,
      },
    });
  };
  
  module.exports = errorMiddleware;
  