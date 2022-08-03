// helper function to provide full JSON response for errors (enables use of thowing errors in Controllers)

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; // if no status code provided use 500
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  }); // only provides full error stack if not in production env
};

// imported in server.js
module.exports = { errorHandler }; 
