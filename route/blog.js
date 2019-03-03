const express = require('express');
const router = express.Router();

/**
 * get blogs
 */
router.get('/', function (req, res) {
    //course.getCourses(req, res);
    res.status(200).send('Reached here');
});

// get balance by account
router.post('/', function (req, res) {
   // course.addCourse(req, res);
});

module.exports = router;
