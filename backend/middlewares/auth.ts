const { verifyToken } = require("../service/verifyToken");
const ApiError = require("../exceptions/apiError");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(ApiError.UnauthorizedError());
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = verifyToken(token);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.userData = userData;

    next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};
