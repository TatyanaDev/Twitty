const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/apiError");

export const verifyToken = (token: string, isAccessToken = true) => {
  try {
    const secret = isAccessToken ? process.env.JWT_SECRET_ACCESS_TOKEN : process.env.JWT_SECRET_REFRESH_TOKEN;

    if (!secret) {
      throw ApiError.jwtSecretsNotDefined();
    }

    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};