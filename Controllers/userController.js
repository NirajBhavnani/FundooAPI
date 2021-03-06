const User = require("../Models/user"); //Accessing our created model
const logger = require("../Utils/logger");
const bcrypt = require("bcrypt");
const user = require("../Models/user");
const authMiddleware = require("../Middlewares/authentication");

let userController = {
  //FETCHING ALL THE REGISTERED USERS
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      logger.verbose(
        `Status: ${res.statusCode}: Successfully fetched all users`
      );
      return res.status(200).json(users);
    } catch (error) {
      logger.error(`Status: ${res.statusCode}: ${error.message}`);
      return res.status(500).json({ message: error });
    }
  },

  //REGISTERS A USER
  async registerUser(req, res) {
    // Hashing is a one way communication
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //Salt===Cost factor and higher the cost factor, more will be the hashing rounds
    const newUser = new User({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: hashedPassword,
    });

    console.log(newUser);
    console.log(res.newUser);

    if (res.newUser) {
      logger.error("USER ALREADY EXISTS");
      res.status(422).json({ message: "User Data already exists" }); //422 means Unprocessable
    } else {
      try {
        const regUser = await newUser.save(); //save returns a promise
        logger.verbose(
          `Status: ${res.statusCode}: User registered successfully`
        );
        res.status(201).json(regUser); //201 means successfully created an object
      } catch (error) {
        logger.error(`Status: 400: ${error.message}`);
        res.status(400).json({ message: error }); //400 means something wrong with user-input not server
      }
    }
  },

  // SPECIFIC USER FETCH or LOGIN
  async loginUser(req, res) {
    // return res.json(res.user);
    try {
      if (res.user) {
        logger.verbose(
          `Status: ${res.statusCode}: User logged in successfully`
        );
        res
          .status(200)
          .json({ ...res.user["_doc"], accessToken: req.accessToken });
      } else {
        logger.error(`Status: 404: User not found`);
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      logger.error(`Status: ${res.statusCode}: ${error.message}`);
      return res.status(500).json({ message: error.messages });
    }
  },

  // DELETE USER
  async deleteUser(req, res) {
    try {
      await res.user.remove();
      logger.verbose(`Status: ${res.statusCode}: User deleted`);
      res.json({ message: "User deleted" });
    } catch (error) {
      logger.error(`Status: ${res.statusCode}: ${error.message}`);
      res.status(500).json({ message: error });
    }
  },

  // UPDATE USER
  async updateUser(req, res) {
    if (req.body.fName != null) {
      res.user.fName = req.body.fName;
    }
    if (req.body.lName != null) {
      res.user.lName = req.body.lName;
    }
    if (req.body.email != null) {
      res.user.email = req.body.email;
    }
    if (req.body.password != null) {
      const hashedUpdatedPassword = await bcrypt.hash(req.body.password, 10);
      res.user.password = hashedUpdatedPassword;
    }
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
      logger.verbose(`Status: ${res.statusCode}: User details updated`);
    } catch (error) {
      logger.error(`Status: 400: ${error.message}`);
      res.status(400).json({ message: error });
    }
  },

  // FORGOT PASSWORD
  async forgotPassword(req, res, next) {
    try {
      if (res.user) {
        let _token = req.accessToken;
        let url = `http://localhost:2000/users/reset/${req.accessToken}`;
        res.url = url;
        res._token = _token;
        res
          .status(200)
          .json({ email: res.user, message: "Link Sent to the mail" });
        next();
      } else {
        logger.error(`Status: 404: Email not found`);
        return res.status(404).json({ message: "Email not found" });
      }
    } catch (error) {
      logger.error(`Status: ${res.statusCode}: ${error.message}`);
      return res.status(500).json({ message: error.messages });
    }
  },

  // RESET PASSWORD
  async resetPassword(req, res, next) {
    if (req.body.password != null) {
      const hashedUpdatedPassword = await bcrypt.hash(req.body.password, 10);
      res.user.password = hashedUpdatedPassword;
    }
    try {
      const updatedUserPwd = await res.user.save();
      res.json(updatedUserPwd);
      logger.verbose(`Status: ${res.statusCode}: Password Changed`);
    } catch (error) {
      logger.error(`Status: 400: ${error.message}`);
      res.status(400).json({ message: error });
    }
  },
};

module.exports = userController;
