const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userController');
const userMiddleware = require('../Middlewares/userMiddleware');
const authMiddleware = require('../Middlewares/authentication');
const nodemailerFunctions = require('../Utils/nodemailer');

// FETCH ALL
router.get('/', userController.getAllUsers);

// REGISTER
router.post('/register', userMiddleware.validationRules(), userMiddleware.validateUser, userMiddleware.getUserByEmail, userController.registerUser);

// LOGIN
// router.get('/login', userMiddleware.loginUser, userController.loginUser); semantically(CRUD) incorrect for browsers
router.post('/login', userMiddleware.loginUser, userController.loginUser); //semantically correct: since we are creating login session so POST

// DELETE
router.delete('/delete/:userId', userMiddleware.getUser, userController.deleteUser);

// UPDATE
router.patch('/update/:userId', userMiddleware.getUser, userController.updateUser);

// FORGOT PASSWORD
router.post('/forgot', userMiddleware.forgotPassword, userController.forgotPassword, nodemailerFunctions.sendMail);

// // RESET PASSWORD
// router.patch('/reset/', userMiddleware.getUserByEmail);

// RESET VERIFY
router.patch('/reset/:resetToken', userMiddleware.resetPassword, userController.resetPassword);
module.exports = router;