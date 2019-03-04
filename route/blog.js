const express = require('express');
const router = express.Router();
const blogService = require('../service/blog/blog')


/**
 * Add blogs
 */
router.post('/blog', function (req, res) {
    blogService.addBlog(req, res);
});

/**
 * Add blogs
 */
router.get('/blog', function (req, res) {
    blogService.getBlogs(req, res);
});


/**
 * Add author
 */
router.post('/author', function (req, res) {
   blogService.addAuthor(req, res);
});

module.exports = router;