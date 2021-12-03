export {};
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/apiError");
const { User } = require("../models");
interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

module.exports.createUser = async (req: any, res: any, next: any) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    const { body } = req;

    const checkEmail = await User.findOne({ where: { email: body.email } });

    if (checkEmail) {
      throw ApiError.checkEmailError();
    }

    const checkUserName = await User.findOne({ where: { userName: body.userName } });

    if (checkUserName) {
      throw ApiError.checkUserNameError();
    }

    body.password = bcrypt.hashSync(body.password, 10);

    const createdUser: User = await User.create(body);

    const { id } = createdUser;

    if (!id) {
      throw ApiError.createUserError();
    }

    const accessToken = jwt.sign({ data: id }, "secretAccessToken", { expiresIn: "1h" });
    const refreshToken = jwt.sign({ data: id }, "secretRefreshToken", { expiresIn: "30d" });

    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // 30 days

    return res.status(201).send({ data: { accessToken, refreshToken } });
  } catch (err: any) {
    next(err);
  }
};

module.exports.checkUser = async (req: any, res: any, next: any) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    const { body } = req;

    const checkUser: User = await User.findOne({ where: { email: body.email } });

    if (!checkUser) {
      throw ApiError.checkUserError();
    }

    const { id } = checkUser;

    const checkPassword = await bcrypt.compare(body.password, checkUser.password);

    if (!checkPassword) {
      throw ApiError.invalidPasswordError();
    }

    const accessToken = jwt.sign({ data: id }, "secretAccessToken", { expiresIn: "1h" });
    const refreshToken = jwt.sign({ data: id }, "secretRefreshToken", { expiresIn: "30d" });

    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // 30 days

    return res.status(201).send({ data: { accessToken, refreshToken } });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserInfo = async (req: any, res: any, next: any) => {
  try {
    const { userData } = req;

    const data: User = await User.findOne({ where: { id: userData.data }, attributes: { exclude: ["password", "createdAt", "updatedAt"] } });

    if (!data) {
      throw ApiError.UnauthorizedError();
    }

    return res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};
