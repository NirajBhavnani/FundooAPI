const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userController');
const userMiddleware = require('../Middlewares/userMiddleware');

router.get('/', userController.getAllUsers);

router.post('/register', userMiddleware.validationRules(), userMiddleware.validateUser, userMiddleware.getUserByEmail, userController.registerUser);

// router.get('/login', userMiddleware.loginUser, userController.loginUser); semantically(CRUD) incorrect for browsers
router.post('/login', userMiddleware.loginUser, userController.loginUser); //semantically correct: since we are creating login session so POST

router.delete('/delete/:userId', userMiddleware.getUser, userController.deleteUser);

router.patch('/update/:userId', userMiddleware.getUser, userController.updateUser);

module.exports = router;