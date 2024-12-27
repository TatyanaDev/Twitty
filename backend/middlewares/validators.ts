import { body } from "express-validator";

export const validateEmail = body("email").isString().withMessage("Email must be a string").notEmpty().withMessage("Email is required").isEmail().withMessage("Must be a valid email address");

export const validateUserRegistration = [body("firstName").isString().withMessage("First name must be a string").notEmpty().withMessage("First name is required"), body("lastName").isString().withMessage("Last name must be a string").notEmpty().withMessage("Last name is required"), body("userName").isString().withMessage("User name must be a string").notEmpty().withMessage("User name is required"), body("email").isString().withMessage("Email must be a string").notEmpty().withMessage("Email is required").isEmail().withMessage("Email must be a valid email address"), body("password").isString().withMessage("Password must be a string").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")];

export const validateUserLogin = [body("email").isString().withMessage("Email must be a string").notEmpty().withMessage("Email is required").isEmail().withMessage("Email must be a valid email address"), body("password").isString().withMessage("Password must be a string").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")];

export const validateContent = body("content").isString().withMessage("Content must be a string").notEmpty().withMessage("Content is required");
