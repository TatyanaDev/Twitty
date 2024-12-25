const ApiError = require("../exceptions/apiError");

module.exports = function (err: any, req: any, res: any, next: any) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: { message: err.message, errors: err.errors } });
  }

  return res.status(500).json({ error: { message: "Unexpected error" } });
};
