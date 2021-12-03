module.exports = class ApiError extends Error {
  status: number;
  errors: any;

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static checkEmailError() {
    return new ApiError(400, "The specified mail is already registered");
  }

  static checkUserNameError() {
    return new ApiError(409, "The specified username is already taken");
  }

  static createdUserError() {
    return new ApiError(400, "Error when creating a user");
  }

  static checkUserError() {
    return new ApiError(404, "User with this email address was not found");
  }

  static invalidPasswordError() {
    return new ApiError(401, "Invalid password");
  }

  static UnauthorizedError() {
    return new ApiError(401, "Unauthorized");
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }
};
