const express = require('express');
const router = express.Router();
const userService = require('../service/user/user')
const {authorization, admin} = require('../middleware/authorization');

/**
 * Register new user
 */
router.post('/', function (req, res) {
    userService.addUser(req, res);
});

/**
 * User login
 */
router.post('/login', function (req, res) {
    userService.userLogin(req, res);
});

/**
 * Get user details
 */
router.get('/', function (req, res) {
    userService.getUser(req, res);
});

module.exports = router;