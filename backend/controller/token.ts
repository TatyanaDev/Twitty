export {};
const jwt = require("jsonwebtoken");
const { verifyRefreshToken } = require("../service/token");
const ApiError = require("../exceptions/apiError");

module.exports.refresh = async (req: any, res: any, next: any) => {
  try {
    const { refreshToken: oldRefreshToken } = req.cookies;

    if (!oldRefreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = await verifyRefreshToken(oldRefreshToken);

    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    const { data } = userData;

    const accessToken = jwt.sign({ data }, "secretAccessToken", { expiresIn: "1h" });
    const refreshToken = jwt.sign({ data }, "secretRefreshToken", { expiresIn: "30d" });

    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // 30 days

    return res.status(201).send({ data: { accessToken, refreshToken } });
  } catch (err) {
    next(err);
  }
};

module.exports.logout = async (req: any, res: any, next: any) => {
  try {
    const { refreshToken } = req.cookies;
    res.clearCookie(refreshToken);
    return res.status(200).json({ data: { message: "Refresh token has been removed" } });
  } catch (err) {
    next(err);
  }
};
