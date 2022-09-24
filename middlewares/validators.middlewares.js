const { body, validationResult } = require("express-validator");

// Utils
const { AppError } = require("../utils/appError.util");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

const createGameValidators = [
  body("title")
    .isString()
    .withMessage("title must be a string")
    .notEmpty()
    .withMessage("title cannot be empty")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters"),
  body("genre")
    .isString()
    .withMessage("genre must be a string")
    .notEmpty()
    .withMessage("genre cannot be empty")
    .isLength({ min: 3 })
    .withMessage("genre must be at least 3 characters"),
  checkValidations,
];

const createCommentValidators = [
  body("comment")
    .isString()
    .withMessage("comment must be a string")
    .notEmpty()
    .withMessage("comment cannot be empty")
    .isLength({ min: 3 })
    .withMessage("comment must be at least 3 characters"),

  checkValidations,
];

const createConsoleValidators = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters"),
  body("company")
    .isString()
    .withMessage("company must be a string")
    .notEmpty()
    .withMessage("company cannot be empty")
    .isLength({ min: 3 })
    .withMessage("company must be at least 3 characters"),

  checkValidations,
];

module.exports = {
  createUserValidators,
  createGameValidators,
  createCommentValidators,
  createConsoleValidators,
};
