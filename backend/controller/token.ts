const { validationResult } = require("express-validator");
const { generateTokens } = require("../services/generateTokens");
const { verifyToken } = require("../services/verifyToken");
const ApiError = require("../exceptions/apiError");

module.exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = await verifyToken(refreshToken, false);

    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    if (!process.env.JWT_SECRET_ACCESS_TOKEN || !process.env.JWT_SECRET_REFRESH_TOKEN) {
      throw ApiError.jwtSecretsNotDefined();
    }

    const tokens = generateTokens(userData.id);

    res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // 30 days

    return res.status(200).send({ data: tokens });
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).send({ data: { message: "Successfully logged out" } });
  } catch (err) {
    next(err);
  }
};
