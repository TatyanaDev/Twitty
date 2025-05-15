const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateTokens } = require("../services/generateTokens");
const ApiError = require("../exceptions/apiError");
const { User } = require("../models");

const isProduction = process.env.NODE_ENV === "production";

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

    const tokens = generateTokens(createdUser.id);

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      partitioned: true,
    });

    return res.status(201).send({ data: { accessToken: tokens.accessToken } });
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

    const { login, password } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: login }, { userName: login }],
      },
    });

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

    const tokens = generateTokens(user.id);

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      partitioned: true,
    });

    return res.status(200).send({ data: { accessToken: tokens.accessToken } });
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
