// helper function to provide full JSON response for errors (enables use of 'throw error' in Controller)

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; // if no status code provided
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  }); // only provides full error stack if not in production env
};

module.exports = { errorHandler }; // imported in server.js
