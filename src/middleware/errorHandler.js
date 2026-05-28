const errorHandler = (err, req, res, next) => {
  console.log({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  const StatusCode = err.statusCode || 500;

  const isProduction = process.env.NODE_ENV === "production";

  const clientMessage =
    statucCode >= 500 && isProduction
      ? "An internal server error occured"
      : err.message;

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_ERROR",
      message: clientMessage,
      ...StatusCode(
        process.env.NODE_ENV === "development" && { stack: err.stack },
      ),
    },
  });
};

module.exports = errorHandler;
