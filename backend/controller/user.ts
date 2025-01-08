const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/apiError");
const { User } = require("../models");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    const { userName, email, password } = req.body;

    const existingEmail = await User.findOne({ where: { email } });

    if (existingEmail) {
      throw ApiError.existingEmailError();
    }

    const existingUserName = await User.findOne({ where: { userName } });

    if (existingUserName) {
      throw ApiError.existingUserNameError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({ ...req.body, password: hashedPassword });

    if (!createdUser) {
      throw ApiError.createResourceError("user");
    }

    if (!process.env.JWT_SECRET_ACCESS_TOKEN || !process.env.JWT_SECRET_REFRESH_TOKEN) {
      throw ApiError.jwtSecretsNotDefined();
    }

    const accessToken = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: "30d" });

    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // 30 days

    return res.status(201).send({ data: { accessToken, refreshToken } });
  } catch (err) {
    next(err);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw ApiError.notFoundError("User");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw ApiError.invalidPasswordError();
    }

    if (!process.env.JWT_SECRET_ACCESS_TOKEN || !process.env.JWT_SECRET_REFRESH_TOKEN) {
      throw ApiError.jwtSecretsNotDefined();
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: "30d" });

    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // 30 days

    return res.status(200).send({ data: { accessToken, refreshToken } });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.userData;

    const { dataValues } = await User.findOne({ where: { id }, attributes: { exclude: ["password", "createdAt", "updatedAt"] } });

    if (!dataValues) {
      throw ApiError.notFoundError("User");
    }

    return res.status(200).send({ data: { ...dataValues } });
  } catch (err) {
    next(err);
  }
};
