const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../service/verifyToken");
const ApiError = require("../exceptions/apiError");

module.exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: oldRefreshToken } = req.cookies;

    if (!oldRefreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = await verifyToken(oldRefreshToken, false);

    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    const userId = userData.id;

    if (!process.env.JWT_SECRET_ACCESS_TOKEN || !process.env.JWT_SECRET_REFRESH_TOKEN) {
      throw ApiError.jwtSecretsNotDefined();
    }

    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: "30d" });

    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // 30 days

    return res.status(200).send({ data: { accessToken, refreshToken } });
  } catch (err) {
    next(err);
  }
};

module.exports.logoutToken = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
    });

    return res.status(200).send({ data: { message: "Successfully logged out" } });
  } catch (err) {
    next(err);
  }
};
