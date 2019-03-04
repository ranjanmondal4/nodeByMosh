const express = require('express');
const router = express.Router();
const blogService = require('../service/blog/blog')
const authorization = require('../middleware/authorization');

/**
 * Add blogs
 */
router.post('/blog',function(req, res) {
    blogService.addBlog(req, res);
});

/**
 * Get blogs
 */
router.get('/blog', authorization, function (req, res) {
    blogService.getBlogs(req, res);
});


/**
 * Add author
 */
router.post('/author', function (req, res) {
   blogService.addAuthor(req, res);
});

module.exports = router;