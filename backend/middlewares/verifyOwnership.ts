const ApiError = require("../exceptions/apiError");
const { Post, Comment } = require("../models");

module.exports = (resourceType) => async (req, res, next) => {
  if (!req.userData) {
    return next(ApiError.unauthorizedError());
  }

  const resourceId = req.params[`${resourceType}Id`];
  const Model = resourceType === "post" ? Post : Comment;

  try {
    const resource = await Model.findOne({ where: { id: resourceId } });

    if (!resource) {
      const capitalizedResourceType = resourceType.charAt(0).toUpperCase() + resourceType.slice(1);

      return next(ApiError.notFoundError(`${capitalizedResourceType}`));
    }

    if (resource.userId !== req.userData.id) {
      return next(ApiError.unauthorizedError(`You don't have permission to access this ${resourceType}`));
    }

    next();
  } catch (err) {
    next(ApiError.badRequest("Error validating resource ownership"));
  }
};
