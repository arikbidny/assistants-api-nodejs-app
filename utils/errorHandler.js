class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
