const express = require('express');
const router = express.Router();
const userController = require('../controller/controller');

router.post('/', userController.insertUser);

router.get('/', userController.getAllUsers);

router.delete('/:id', userController.deleteUser);

router.put('/:id', userController.updateUser);

router.get('/search', userController.searchUsers);

router.get('/page/:page', userController.paginateUsers);

router.post('/delete', userController.deleteMultipleUsers);

module.exports = router;
