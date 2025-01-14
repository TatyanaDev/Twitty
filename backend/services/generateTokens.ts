const jwt = require("jsonwebtoken");

export const generateTokens = (userId: number) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: "30d" });

  return { accessToken, refreshToken };
};
