const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userController');
const userMiddleware = require('../Middlewares/userMiddleware');

router.get('/', userController.getAllUsers);

router.post('/register', userController.registerUser);

router.get('/login/:userId', userMiddleware.getUser, userController.loginUser);

router.delete('/delete/:userId', userMiddleware.getUser, userController.deleteUser);

router.patch('/update/:userId', userMiddleware.getUser, userController.updateUser);

module.exports = router;