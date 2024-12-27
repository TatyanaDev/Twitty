module.exports = class ApiError extends Error {
  status: number;
  errors: string[];

  constructor(status: number, message: string, errors: string[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static existingEmailError(): ApiError {
    return new ApiError(400, "The specified email is already registered");
  }

  static BadRequest(message: string, errors: string[] = []): ApiError {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError(message: string | undefined): ApiError {
    return new ApiError(401, message || "Unauthorized");
  }

  static invalidPasswordError(): ApiError {
    return new ApiError(401, "Invalid password");
  }

  static notFoundError(resource: string): ApiError {
    return new ApiError(404, `${resource} not found`);
  }

  static existingUserNameError(): ApiError {
    return new ApiError(409, "The specified username is already taken");
  }

  static jwtSecretsNotDefined() {
    return new ApiError(500, "JWT secret keys are not defined in .env file");
  }

  static createResourceError(resource: string): ApiError {
    return new ApiError(500, `Failed to create a ${resource}. Please check the provided data and try again`);
  }

  static updateResourceError(resource: string): ApiError {
    return new ApiError(500, `Failed to update a ${resource}. Please check the provided data and try again`);
  }
};
