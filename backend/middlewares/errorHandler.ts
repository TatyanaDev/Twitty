const ApiError = require("../exceptions/apiError");

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    const errorResponse = {
      error: {
        message: err.message,
        ...(err.errors.length > 0 && { errors: err.errors }),
      },
    };

    return res.status(err.status).send(errorResponse);
  }

  return res.status(500).send({ error: { message: "Unexpected error" } });
};
