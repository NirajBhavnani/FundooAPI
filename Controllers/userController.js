const User = require("../Models/user"); //Accessing our created model

let userController = {
  //FETCHING ALL THE REGISTERED USERS
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  //REGISTERS A USER
  async registerUser(req, res) {
    const user = new User({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const regUser = await user.save(); //save returns a promise
      res.status(201).json(regUser); //201 means successfully created an object
    } catch (error) {
      res.status(400).json({ message: error }); //400 means something wrong with user-input not server
    }
  },

  // SPECIFIC USER FETCH or LOGIN
  async loginUser(req, res) {
    return res.json(res.user);
  },

  // DELETE USER
  async deleteUser(req, res) {
    try {
      await res.user.remove();
      res.json({ message: "User deleted" });
    } catch (error) {
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
      res.user.password = req.body.password;
    }
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};

module.exports = userController;
