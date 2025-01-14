import * as Yup from "yup";

export const USER_REGISTRATION_VALIDATION_SCHEMA = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  userName: Yup.string().trim().required("User name is required").matches(/^\S*$/, "User name must not contain spaces"),
  email: Yup.string().trim().email('Must contain @ and "."').required("Email is required"),
  password: Yup.string().trim().min(6, "Password must be longer than 6 characters!").required("Password is required!"),
  passwordConfirmation: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords do not match!")
    .required("Password confirmation is required!"),
});

export const USER_LOGIN_VALIDATION_SCHEMA = Yup.object({
  login: Yup.string()
    .trim()
    .required("Login is required")
    .test("is-valid-email-or-username", "Login must be a valid email or a non-empty username", (value) => {
      if (!value) {
        return false;
      }

      const isEmail = Yup.string().email().isValidSync(value);
      const isUserName = value.trim().length > 0;

      return isEmail || isUserName;
    })
    .matches(/^\S*$/, "Login must not contain spaces"),
  password: Yup.string().trim().min(6, "Password must be longer than 6 characters!").required("Password is required!"),
});

export const POST_CONTENT_VALIDATION_SCHEMA = Yup.object({
  content: Yup.string().trim().max(1000, "Content must be at most 1000 characters").required("Content is required"),
});

export const COMMENT_CONTENT_VALIDATION_SCHEMA = Yup.object({
  content: Yup.string().trim().max(500, "Content must be at most 500 characters").required("Content is required"),
});
