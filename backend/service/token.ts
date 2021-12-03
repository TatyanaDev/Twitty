const jwt = require("jsonwebtoken");

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, "secretAccessToken");
  } catch (err) {
    return null;
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, "secretRefreshToken");
  } catch (err) {
    return null;
  }
}
