// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message =
    err.message || "Something went wrong. Please try again later.";

  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;

