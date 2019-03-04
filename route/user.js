const express = require('express');
const router = express.Router();
const userService = require('../service/user/user')


/**
 * Register new user
 */
router.post('/', function (req, res) {
    userService.addUser(req, res);
});

// /**
//  * Add blogs
//  */
// router.get('/blog', function (req, res) {
//     blogService.getBlogs(req, res);
// });


// /**
//  * Add author
//  */
// router.post('/author', function (req, res) {
//     blogService.addAuthor(req, res);
// });

module.exports = router;