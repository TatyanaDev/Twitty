const { verifyToken } = require("../services/verifyToken");
const ApiError = require("../exceptions/apiError");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(ApiError.unauthorizedError());
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return next(ApiError.unauthorizedError());
    }

    const userData = verifyToken(token);

    if (!userData) {
      return next(ApiError.unauthorizedError());
    }

    req.userData = userData;

    next();
  } catch (err) {
    return next(ApiError.unauthorizedError());
  }
};
