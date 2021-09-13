const User = require("../Models/user");
const { check, validationResult } = require("express-validator");
const logger = require("../Utils/logger");
const authMiddleware = require("./authentication");

let userMiddleware = {
  // MIDDLEWARE FUNCTION: To reuse the same code for user-fetch
  async getUser(req, res, next) {
    //next: if we call this move on to the next section of code
    let user;
    try {
      user = await User.findById(req.params.userId);
      if (user == null) {
        logger.error(`Status: 404: User not found`);
        return res.status(404).json({ message: "Could not find user" }); //404: Could not find anything
      }
    } catch (error) {
      logger.error(`Status: ${res.statusCode}: ${error.message}`);
      return res.status(500).json({ message: error }); //500: Something wrong with server
    }
    res.user = user;
    next();
  },

  async getUserByEmail(req, res, next) {
    let user;
    try {
      user = await User.find({ email: req.body.email });
    } catch (error) {
      logger.error(`Status: ${res.statusCode}: ${error.message}`);
      return res.status(500).json({ message: error.message });
    }

    res.user = user;
    next();
  },

  async loginUser(req, res, next) {
    let user;
    try {
      user = await User.find({
        email: req.body.email,
        password: req.body.password,
      });

      // Calling this middleware function to avoid the usage of jwt in this file
      authMiddleware.createToken(req, res, user);
      next();
    } catch (error) {
      logger.error(`Status: ${res.statusCode}: ${error.message}`);
      return res.status(500).json({ message: error.message });
    }
  },

  validationRules() {
    return [
      check("fName")
        .not()
        .isEmpty()
        .withMessage("First Name is required")
        .isAlpha()
        .withMessage("First Name should only contain alphabetical characters")
        .isLength({ min: 3 })
        .withMessage("First Name should atleast have 3 characters"),

      check("lName")
        .not()
        .isEmpty()
        .withMessage("Last Name is required")
        .isAlpha()
        .withMessage("Last Name should only contain alphabetical characters")
        .isLength({ min: 3 })
        .withMessage("Last Name should atleast have 3 characters"),

      check("email").isEmail().withMessage("Please enter a valid Email-ID"),

      check("password")
        .isLength({ min: 3 })
        .withMessage("Password must have atleast 3 characters"),
    ];
  },

  validateUser(req, res, next) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      logger.verbose(`Status: ${res.statusCode}: Entered data is valid`);
      next();
    } else {
      const extractedErrors = [];
      errors
        .array()
        .map((err) => extractedErrors.push({ [err.param]: err.msg }));
      // console.log(errors);
      logger.error(
        `Status: 422: ${JSON.stringify({ errors: extractedErrors })}`
      );
      return res.status(422).json({ message: extractedErrors });
    }
  },
};

module.exports = userMiddleware;
